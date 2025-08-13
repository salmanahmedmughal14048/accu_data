// visibilityManager.js
import * as THREE from 'three';

export class VisibilityManager {
    constructor() {
        this.previousSurfaceVisibilityRef = {};
        this.modelBoundsRef = { size: null };
    }

    // Helper function to extract surface visibility state from menuData
    extractSurfaceVisibility(menuData) {
        const surfaceVisibility = {};
        
        if (!menuData || menuData.length === 0) return surfaceVisibility;
        
        menuData.forEach(categoryObj => {
            Object.keys(categoryObj).forEach(categoryName => {
                if (categoryName === "Vertebrae") {
                    const category = categoryObj[categoryName];
                    
                    Object.keys(category).forEach(vertebraeName => {
                        const vertebraeData = category[vertebraeName];
                        
                        if (vertebraeData.topSurface) {
                            surfaceVisibility[vertebraeData.topSurface] = vertebraeData.topSurfaceVisible || false;
                        }
                        if (vertebraeData.bottomSurface) {
                            surfaceVisibility[vertebraeData.bottomSurface] = vertebraeData.bottomSurfaceVisible || false;
                        }
                    });
                }
            });
        });
        
        return surfaceVisibility;
    }

    // Helper function to extract boundary visibility state from menuData
    extractBoundaryVisibility(menuData) {
        const boundaryVisibility = {};
        
        if (!menuData || menuData.length === 0) return boundaryVisibility;
        
        menuData.forEach(categoryObj => {
            Object.keys(categoryObj).forEach(categoryName => {
                if (categoryName === "Vertebrae") {
                    const category = categoryObj[categoryName];
                    
                    Object.keys(category).forEach(vertebraeName => {
                        const vertebraeData = category[vertebraeName];
                        
                        if (vertebraeData.boundary) {
                            boundaryVisibility[vertebraeData.boundary] = vertebraeData.boundaryVisible || false;
                        }
                    });
                }
            });
        });
        
        return boundaryVisibility;
    }

    // Helper function to check if any surface file changed from false to true
    checkSurfaceVisibilityChange(currentVisibility, previousVisibility) {
        for (const [surfaceFile, currentVisible] of Object.entries(currentVisibility)) {
            const previousVisible = previousVisibility[surfaceFile] || false;
            
            if (!previousVisible && currentVisible) {
                console.log(`🎯 Surface file ${surfaceFile} changed from false to true - should reset camera`);
                return true;
            }
        }
        return false;
    }

    // Camera view management based on surface type
    setCameraViewForSurface(activeSurfaceType, cameraRef, controlsRef, modelBounds) {
        if (!activeSurfaceType || activeSurfaceType === 'baseplate' || 
            !cameraRef.current || !controlsRef.current || !modelBounds.size) {
            return;
        }
        
        const SURFACE_VIEW_DIRECTIONS = {
            upper: { 
                position: { x: 0, y: 0, z: 1 },
                up: { x: 0, y: 1, z: 0 }
            },
            lower: { 
                position: { x: 0, y: 0, z: -1 },
                up: { x: 0, y: 1, z: 0 }
            }
        };
        
        const viewConfig = SURFACE_VIEW_DIRECTIONS[activeSurfaceType];
        console.log(`📹 RESETTING camera view for ${activeSurfaceType} surface:`, viewConfig);
        
        const { size } = modelBounds;
        const maxDim = Math.max(size.x, size.y, size.z);
        const distance = maxDim * 2;
        
        const direction = { ...viewConfig.position };
        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z);
        const normalizedDirection = {
            x: (direction.x / magnitude) * distance,
            y: (direction.y / magnitude) * distance,
            z: (direction.z / magnitude) * distance
        };
        
        cameraRef.current.position.set(normalizedDirection.x, normalizedDirection.y, normalizedDirection.z);
        cameraRef.current.up.set(viewConfig.up.x, viewConfig.up.y, viewConfig.up.z);
        cameraRef.current.lookAt(0, 0, 0);
        
        cameraRef.current.near = distance / 100;
        cameraRef.current.far = distance * 10;
        cameraRef.current.updateProjectionMatrix();
        
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
        
        console.log(`✅ Camera RESET for ${activeSurfaceType} surface view at distance: ${distance}`);
    }

    // Helper function to update opacity only for parts that should use Redux opacity
    updateOpacityForReduxParts(scene, newOpacity) {
        if (!scene) return;
        
        console.log(`🎨 Updating Redux opacity parts to: ${newOpacity}`);
        
        const entityGroup = scene.getObjectByName('entity-grp');
        if (!entityGroup) {
            console.log('❌ No entity group found for opacity update');
            return;
        }
        
        entityGroup.traverse((child) => {
            if (child.isMesh && child.material && child.userData?.useReduxOpacity) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => {
                        if (material.transparent) {
                            material.opacity = newOpacity;
                            material.needsUpdate = true;
                        }
                    });
                } else {
                    if (child.material.transparent) {
                        child.material.opacity = newOpacity;
                        child.material.needsUpdate = true;
                    }
                }
                console.log(`✅ Updated Redux opacity for mesh: ${child.name} to ${newOpacity}`);
            }
        });
    }

    // Main visibility update function
    updateVisibilityFromMenuData(scene, menuData, dispatch, setMenuData, cameraRef, controlsRef, modelBounds) {
        if (!scene || !menuData || menuData.length === 0) {
            console.log('❌ No scene, menuData, or empty menuData');
            return;
        }
        
        const entityGroup = scene.getObjectByName('entity-grp');
        if (!entityGroup) {
            console.log('❌ No entity group found');
            return;
        }
        
        console.log('🔍 Processing menuData - following as-is:', JSON.stringify(menuData, null, 2));
        
        // Extract current surface visibility state
        const currentSurfaceVisibility = this.extractSurfaceVisibility(menuData);
        console.log('📊 Current surface visibility:', currentSurfaceVisibility);
        console.log('📊 Previous surface visibility:', this.previousSurfaceVisibilityRef);
        
        // Check if any surface file changed from false to true
        const shouldResetCamera = this.checkSurfaceVisibilityChange(currentSurfaceVisibility, this.previousSurfaceVisibilityRef);
        const surfaceVisibilityChanged = Object.keys(currentSurfaceVisibility).some(surfaceFile => {
            const currentVisible = currentSurfaceVisibility[surfaceFile];
            const previousVisible = this.previousSurfaceVisibilityRef[surfaceFile] || false;
            return currentVisible !== previousVisible;
        });
        
        console.log(`🔄 Surface visibility changed: ${surfaceVisibilityChanged}`);
        
        // Find active surface type and associated vertebrae
        let activeSurfaceType = null;
        let associatedVertebrae = new Set();
        
        menuData.forEach(categoryObj => {
            Object.keys(categoryObj).forEach(categoryName => {
                console.log(`📂 Processing category: ${categoryName}`);
                if (categoryName === "Vertebrae") {
                    const category = categoryObj[categoryName];
                    
                    Object.keys(category).forEach(vertebraeName => {
                        const vertebraeData = category[vertebraeName];
                        console.log(`🦴 Checking vertebrae: ${vertebraeName}`, {
                            topSurface: vertebraeData.topSurface,
                            topSurfaceVisible: vertebraeData.topSurfaceVisible,
                            bottomSurface: vertebraeData.bottomSurface,
                            bottomSurfaceVisible: vertebraeData.bottomSurfaceVisible,
                            baseplateVisible: vertebraeData.baseplateVisible,
                            boundary: vertebraeData.boundary,
                            boundaryVisible: vertebraeData.boundaryVisible
                        });
                        
                        if (vertebraeData.topSurface && vertebraeData.topSurfaceVisible && !vertebraeData.baseplateVisible) {
                            activeSurfaceType = 'upper';
                            associatedVertebrae.add(vertebraeName);
                            console.log(`🎯 Active UPPER surface found for vertebrae: ${vertebraeName}`);
                        } else if (vertebraeData.bottomSurface && vertebraeData.bottomSurfaceVisible && !vertebraeData.baseplateVisible) {
                            activeSurfaceType = 'lower';
                            associatedVertebrae.add(vertebraeName);
                            console.log(`🎯 Active LOWER surface found for vertebrae: ${vertebraeName}`);
                        } else if (vertebraeData.baseplateVisible) {
                            activeSurfaceType = 'baseplate';
                            console.log(`🎯 Baseplate active for vertebrae: ${vertebraeName} - no vertebrae will be shown`);
                        }
                    });
                }
            });
        });
        
        console.log(`🏆 Final activeSurfaceType: ${activeSurfaceType}`);
        console.log(`🦴 Associated vertebrae to show:`, Array.from(associatedVertebrae));
        
        // Update menuData vertebrae visibility if surface visibility changed
        if (surfaceVisibilityChanged) {
            console.log(`🔄 Surface visibility changed - updating menuData vertebrae visibility`);
            const updated = JSON.parse(JSON.stringify(menuData));
            
            updated.forEach(categoryObj => {
                Object.keys(categoryObj).forEach(categoryName => {
                    if (categoryName === "Vertebrae") {
                        const category = categoryObj[categoryName];
                        
                        Object.keys(category).forEach(vertebraeName => {
                            const vertebraeData = category[vertebraeName];
                            let newVisibility = false;
                            
                            if (activeSurfaceType === 'upper' || activeSurfaceType === 'lower') {
                                newVisibility = associatedVertebrae.has(vertebraeName);
                            } else if (activeSurfaceType === 'baseplate') {
                                newVisibility = false;
                            } else {
                                newVisibility = vertebraeData.isVisible || false;
                            }
                            
                            if (vertebraeData.isVisible !== newVisibility) {
                                console.log(`🔄 Updating ${vertebraeName} visibility: ${vertebraeData.isVisible} → ${newVisibility}`);
                                vertebraeData.isVisible = newVisibility;
                            }
                        });
                    }
                });
            });
            
            dispatch(setMenuData(updated));
        }
        
        // Set camera view based on surface type
        if (shouldResetCamera) {
            this.setCameraViewForSurface(activeSurfaceType, cameraRef, controlsRef, modelBounds);
        }
        
        // Update previous surface visibility state
        this.previousSurfaceVisibilityRef = { ...currentSurfaceVisibility };
        
        // Apply visibility settings from menuData
        this.applyVisibilitySettings(entityGroup, menuData, surfaceVisibilityChanged, activeSurfaceType, associatedVertebrae);
    }

    // Apply visibility settings to meshes
    applyVisibilitySettings(entityGroup, menuData, surfaceVisibilityChanged, activeSurfaceType, associatedVertebrae) {
        menuData.forEach(categoryObj => {
            Object.keys(categoryObj).forEach(categoryName => {
                const category = categoryObj[categoryName];
                
                Object.keys(category).forEach(partName => {
                    const partData = category[partName];
                    console.log(`🔧 Processing part: ${categoryName}/${partName}`, partData);
                    
                    // Handle fileName visibility
                    if (categoryName === "Vertebrae") {
                        const fileName = partData.fileName;
                        if (fileName) {
                            const mesh = entityGroup.getObjectByName(fileName);
                            if (mesh) {
                                let shouldShowVertebrae = partData.isVisible || false;
                                
                                if (surfaceVisibilityChanged) {
                                    console.log(`🔒 Surface visibility changed - using surface-based filtering for ${partName}`);
                                    
                                    if (activeSurfaceType === 'upper' || activeSurfaceType === 'lower') {
                                        shouldShowVertebrae = shouldShowVertebrae && associatedVertebrae.has(partName);
                                        console.log(`🔍 Surface active: ${activeSurfaceType}, vertebrae ${partName} associated: ${associatedVertebrae.has(partName)}, final visibility: ${shouldShowVertebrae}`);
                                    } else if (activeSurfaceType === 'baseplate') {
                                        shouldShowVertebrae = false;
                                        console.log(`🔍 Baseplate active: hiding vertebrae ${partName}`);
                                    }
                                } else {
                                    console.log(`🔓 Surface visibility unchanged - following menuData as-is for ${partName}: ${shouldShowVertebrae}`);
                                }
                                
                                mesh.visible = shouldShowVertebrae;
                                console.log(`✅ Updated ${fileName} visibility to ${mesh.visible}`);
                            }
                        }
                    } else {
                        // Other categories
                        const fileNames = Array.isArray(partData.fileName) ? partData.fileName : [partData.fileName];
                        const visibilities = Array.isArray(partData.isVisible) ? partData.isVisible : [partData.isVisible];
                        
                        fileNames.forEach((fileName, index) => {
                            if (!fileName) return;
                            
                            const mesh = entityGroup.getObjectByName(fileName);
                            if (mesh) {
                                const shouldBeVisible = visibilities[index] || false;
                                mesh.visible = shouldBeVisible;
                                console.log(`✅ Updated ${fileName} visibility to ${shouldBeVisible}`);
                            }
                        });
                    }
                    
                    // Handle surface files visibility
                    const surfaceFiles = [
                        { file: partData.topSurface, visible: partData.topSurfaceVisible },
                        { file: partData.bottomSurface, visible: partData.bottomSurfaceVisible }
                    ];
                    
                    surfaceFiles.forEach(({ file, visible }) => {
                        if (file) {
                            const mesh = entityGroup.getObjectByName(file);
                            if (mesh) {
                                mesh.visible = visible || false;
                                console.log(`✅ Updated surface ${file} visibility to ${visible || false}`);
                            }
                        }
                    });

                    // 🔲 Handle boundary files visibility
                    if (partData.boundary) {
                        console.log(`🔲 Processing boundary for ${partName}: ${partData.boundary}, boundaryVisible: ${partData.boundaryVisible}`);
                        
                        const boundaryMesh = entityGroup.getObjectByName(partData.boundary);
                        if (boundaryMesh) {
                            const shouldShowBoundary = partData.boundaryVisible || false;
                            boundaryMesh.visible = shouldShowBoundary;
                            console.log(`🔲 Updated boundary ${partData.boundary} visibility to ${shouldShowBoundary}`);
                            
                            // Additional debug info for boundary meshes
                            if (boundaryMesh.userData?.isBoundary) {
                                console.log(`🔲 Confirmed boundary mesh: ${partData.boundary} with userData.isBoundary = true`);
                            } else {
                                console.log(`⚠️ Boundary mesh found but userData.isBoundary is missing: ${partData.boundary}`);
                            }
                            
                            // Debug material and render order
                            console.log(`🔲 Boundary mesh details:`, {
                                name: boundaryMesh.name,
                                visible: boundaryMesh.visible,
                                renderOrder: boundaryMesh.renderOrder,
                                material: boundaryMesh.material?.type,
                                opacity: boundaryMesh.material?.opacity,
                                transparent: boundaryMesh.material?.transparent
                            });
                        } else {
                            console.log(`❌ Boundary mesh not found: ${partData.boundary}`);
                            
                            // Debug: List all available meshes to see what's actually loaded
                            console.log(`🔍 Available meshes in entityGroup:`);
                            entityGroup.traverse((child) => {
                                if (child.isMesh) {
                                    console.log(`  - ${child.name} (${child.userData?.isBoundary ? 'boundary' : 'regular'})`);
                                }
                            });
                        }
                    } else {
                        console.log(`🔲 No boundary file specified for ${partName}`);
                    }
                });
            });
        });
    }

    // Initialize surface visibility state
    initializeSurfaceVisibility(menuData) {
        const initialSurfaceVisibility = this.extractSurfaceVisibility(menuData);
        this.previousSurfaceVisibilityRef = initialSurfaceVisibility;
        console.log('📊 Initial surface visibility state:', initialSurfaceVisibility);
        
        // 🔲 Initialize boundary visibility state
        const initialBoundaryVisibility = this.extractBoundaryVisibility(menuData);
        console.log('🔲 Initial boundary visibility state:', initialBoundaryVisibility);
    }

    // Update model bounds reference
    setModelBounds(bounds) {
        this.modelBoundsRef = bounds;
    }
}