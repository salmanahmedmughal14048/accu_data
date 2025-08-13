// hooks/useMenuData.js
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuData, setOpacity } from '../../redux/reducer/menuDataSlice';

// Main hook for menu data management
export const useMenuData = () => {
  const menuData = useSelector(state => state.menuData.menuData);
  const opacity = useSelector(state => state.menuData.opacity || 1);
  const dispatch = useDispatch();

  const updateMenuData = (updatedData) => {
    dispatch(setMenuData(updatedData));
  };

  const updateOpacity = (newOpacity) => {
    dispatch(setOpacity(newOpacity));
  };

  return {
    menuData,
    opacity,
    updateMenuData,
    updateOpacity
  };
};

// Hook for managing selection state
export const useSelectionState = (menuData) => {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (menuData?.length) {
      const state = {};
      menuData.forEach(section =>
        Object.values(section).forEach(group =>
          Object.entries(group).forEach(([key, item]) => {
            // Handle array format for implants
            if (Array.isArray(item.isVisible)) {
              item.positions?.forEach((pos, i) =>
                item.isVisible[i] && (state[`${key}::${pos}`] = true)
              );
            }
          })
        )
      );
      setSelected(state);
    }
  }, [menuData]);

  const updateSelection = (groupTitle, position, isSelected) => {
    setSelected(prev => {
      const newState = { ...prev };
      const key = `${groupTitle}::${position}`;
      
      if (isSelected) {
        // Remove other selections in this group
        Object.keys(newState).forEach(k => {
          if (k.startsWith(groupTitle + '::')) delete newState[k];
        });
        newState[key] = true;
      } else {
        delete newState[key];
      }
      
      return newState;
    });
  };

  const clearGroupSelection = (groupTitle) => {
    setSelected(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        if (key.startsWith(groupTitle + '::')) {
          delete newState[key];
        }
      });
      return newState;
    });
  };

  return {
    selected,
    updateSelection,
    clearGroupSelection
  };
};

// Hook for vertebrae operations
export const useVertebraeOperations = (menuData, updateMenuData) => {
  const toggleVertebrae = (vertebraeName, makeVisible) => {
    const updated = JSON.parse(JSON.stringify(menuData));
    
    updated.forEach(section => {
      if (section["Vertebrae"]) {
        Object.entries(section["Vertebrae"]).forEach(([key, item]) => {
          if (key === vertebraeName) {
            item.isVisible = makeVisible;
          }
        });
      }
    });
    
    updateMenuData(updated);
  };

  return { toggleVertebrae };
};

// Hook for surface operations - Updated with Boundary support
export const useSurfaceOperations = (menuData, updateMenuData) => {
  // Track boundary master toggle state
  const [boundaryMasterEnabled, setBoundaryMasterEnabled] = useState(true);

  const toggleSurface = (surfaceType, makeVisible) => {
    const updated = JSON.parse(JSON.stringify(menuData));
    
    if (surfaceType === "Boundary") {
      // Handle boundary master toggle
      if (makeVisible) {
        // Turn on boundary master toggle and show boundaries where surfaces are visible
        setBoundaryMasterEnabled(true);
        updated.forEach(section => {
          if (section["Vertebrae"]) {
            Object.entries(section["Vertebrae"]).forEach(([key, item]) => {
              item.boundaryVisible = item.topSurfaceVisible || item.bottomSurfaceVisible || item.baseplateVisible;
            });
          }
        });
      } else {
        // Turn off boundary master toggle and hide all boundaries
        setBoundaryMasterEnabled(false);
        updated.forEach(section => {
          if (section["Vertebrae"]) {
            Object.entries(section["Vertebrae"]).forEach(([key, item]) => {
              item.boundaryVisible = false;
            });
          }
        });
      }
    } else {
      // Handle surface toggles
      updated.forEach(section => {
        if (section["Vertebrae"]) {
          Object.entries(section["Vertebrae"]).forEach(([key, item]) => {
            if (surfaceType === "Upper Surface") {
              item.topSurfaceVisible = makeVisible;
              if (makeVisible) {
                item.bottomSurfaceVisible = false;
                item.baseplateVisible = false;
              }
            } else if (surfaceType === "Lower Surface") {
              item.bottomSurfaceVisible = makeVisible;
              if (makeVisible) {
                item.topSurfaceVisible = false;
                item.baseplateVisible = false;
              }
            } else if (surfaceType === "Baseplate") {
              item.baseplateVisible = makeVisible;
              if (makeVisible) {
                item.topSurfaceVisible = true;
                item.bottomSurfaceVisible = true;
              } else {
                item.topSurfaceVisible = false;
                item.bottomSurfaceVisible = false;
              }
            }
            
            // Update boundary visibility only if master toggle is enabled
            if (boundaryMasterEnabled) {
              const anySurfaceVisible = item.topSurfaceVisible || item.bottomSurfaceVisible || item.baseplateVisible;
              item.boundaryVisible = anySurfaceVisible;
            }
          });
        }
      });
    }
    
    updateMenuData(updated);
  };

  // Helper functions to check surface visibility
  const isUpperSurfaceVisible = () => {
    if (!menuData?.length) return false;
    return menuData.some(section => 
      section["Vertebrae"] && Object.values(section["Vertebrae"]).some(item => 
        item.topSurfaceVisible && !item.baseplateVisible
      )
    );
  };

  const isLowerSurfaceVisible = () => {
    if (!menuData?.length) return false;
    return menuData.some(section => 
      section["Vertebrae"] && Object.values(section["Vertebrae"]).some(item => 
        item.bottomSurfaceVisible && !item.baseplateVisible
      )
    );
  };

  const isBaseplateVisible = () => {
    if (!menuData?.length) return false;
    return menuData.some(section => 
      section["Vertebrae"] && Object.values(section["Vertebrae"]).some(item => item.baseplateVisible)
    );
  };

  // New helper function for boundary visibility
  const isBoundaryVisible = () => {
    if (!menuData?.length) return false;
    return menuData.some(section => 
      section["Vertebrae"] && Object.values(section["Vertebrae"]).some(item => item.boundaryVisible)
    );
  };

  return {
    toggleSurface,
    isUpperSurfaceVisible,
    isLowerSurfaceVisible,
    isBaseplateVisible,
    isBoundaryVisible // Added boundary visibility function
  };
};

// Hook for implant operations
export const useImplantOperations = (menuData, updateMenuData, updateSelection, clearGroupSelection) => {
  const toggleImplantGroup = (groupTitle, eyeOpen) => {
    if (!eyeOpen) {
      const updated = JSON.parse(JSON.stringify(menuData));
      updated.forEach(section =>
        Object.values(section).forEach(group =>
          Object.entries(group).forEach(([key, item]) => {
            if (key === groupTitle) {
              if (Array.isArray(item.isVisible)) {
                item.isVisible = item.isVisible.map(() => false);
              }
            }
          })
        )
      );
      clearGroupSelection(groupTitle);
      updateMenuData(updated);
    }
  };

  const selectDefaultImplant = (groupTitle) => {
    const updated = JSON.parse(JSON.stringify(menuData));
    let defaultPos = '';

    updated.forEach(section =>
      Object.values(section).forEach(group =>
        Object.entries(group).forEach(([key, item]) => {
          if (key === groupTitle && item.positions?.length) {
            defaultPos = item.positions[0];
            if (Array.isArray(item.isVisible)) {
              item.isVisible = item.isVisible.map((_, i) => i === 0);
            }
          }
        })
      )
    );

    updateSelection(groupTitle, defaultPos, true);
    updateMenuData(updated);
  };

  const toggleImplantPosition = (group, position) => {
    const updated = JSON.parse(JSON.stringify(menuData));
    
    updated.forEach(section =>
      Object.values(section).forEach(groupItems =>
        Object.entries(groupItems).forEach(([key, item]) => {
          if (key === group) {
            const idx = item.positions.indexOf(position);
            
            if (idx >= 0 && Array.isArray(item.isVisible)) {
              item.isVisible = item.isVisible.map((_, i) => i === idx);
            }
          }
        })
      )
    );

    updateSelection(group, position, true);
    updateMenuData(updated);
  };

  const togglePositionVisibility = (groupTitle, position, makeVisible) => {
    const updated = JSON.parse(JSON.stringify(menuData));
    
    updated.forEach(section => {
      if (section["Implants"] && section["Implants"][groupTitle]) {
        const item = section["Implants"][groupTitle];
        const posIndex = item.positions.indexOf(position);
        
        if (posIndex >= 0 && Array.isArray(item.isVisible)) {
          item.isVisible[posIndex] = makeVisible;
        }
      }
    });

    if (makeVisible) {
      updateSelection(groupTitle, position, true);
    } else {
      updateSelection(groupTitle, position, false);
    }
    
    updateMenuData(updated);
  };

  // Helper function to check if any position is visible for a group
  const isAnyPositionVisible = (groupTitle) => {
    if (!menuData?.length) return false;
    
    for (const section of menuData) {
      if (section["Implants"] && section["Implants"][groupTitle]) {
        const item = section["Implants"][groupTitle];
        if (Array.isArray(item.isVisible)) {
          return item.isVisible.some(visible => visible === true);
        }
      }
    }
    return false;
  };

  return {
    toggleImplantGroup,
    selectDefaultImplant,
    toggleImplantPosition,
    togglePositionVisibility,
    isAnyPositionVisible
  };
};

// Main business logic hook that combines all operations - Updated with Boundary
export const usePartsMenuLogic = () => {
  const { menuData, opacity, updateMenuData, updateOpacity } = useMenuData();
  const { selected, updateSelection, clearGroupSelection } = useSelectionState(menuData);
  
  const vertebraeOps = useVertebraeOperations(menuData, updateMenuData);
  const surfaceOps = useSurfaceOperations(menuData, updateMenuData);
  const implantOps = useImplantOperations(menuData, updateMenuData, updateSelection, clearGroupSelection);

  return {
    // Data
    menuData,
    opacity,
    selected,
    
    // General operations
    updateOpacity,
    
    // Vertebrae operations
    toggleVertebrae: vertebraeOps.toggleVertebrae,
    
    // Surface operations
    toggleSurface: surfaceOps.toggleSurface,
    isUpperSurfaceVisible: surfaceOps.isUpperSurfaceVisible,
    isLowerSurfaceVisible: surfaceOps.isLowerSurfaceVisible,
    isBaseplateVisible: surfaceOps.isBaseplateVisible,
    isBoundaryVisible: surfaceOps.isBoundaryVisible, // Added boundary support
    
    // Implant operations
    toggleImplantGroup: implantOps.toggleImplantGroup,
    selectDefaultImplant: implantOps.selectDefaultImplant,
    toggleImplantPosition: implantOps.toggleImplantPosition,
    togglePositionVisibility: implantOps.togglePositionVisibility,
    isAnyPositionVisible: implantOps.isAnyPositionVisible
  };
};