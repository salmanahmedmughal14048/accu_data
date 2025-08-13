// redux/reducer/modelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Main STL Viewer files and state
    files: [],

    meshVisibility: {
        "v1/Patient_001_placed+implant_option_1.stl": true,
        "v1/Patient_001_placed+implant_option_2.stl": false,
        "v1/Patient_001_placed+implant_option_3.stl": false,
    },
    selectedMeshName: '',
    
    // Surf Viewer files and state
    surfFiles: [],
    surfMeshVisibility: {},
    selectedSurfMeshName: '',
    
    // Camera and controls positions (shared or separate as needed)
    cameraPosition: {},
    controlsPosition: {},
    
    // Any other existing state you might have
    // Add your existing state properties here
};

const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        // Main STL Viewer reducers
        setFiles: (state, action) => {
            state.files = action.payload;
        },
        setMeshVisibility: (state, action) => {
            state.meshVisibility = action.payload;
        },
        setSelectedMeshName: (state, action) => {
            state.selectedMeshName = action.payload;
        },
        
        // Surf Viewer reducers
        setSurfFiles: (state, action) => {
            state.surfFiles = action.payload;
        },
        setSurfMeshVisibility: (state, action) => {
            state.surfMeshVisibility = action.payload;
        },
        setSelectedSurfMeshName: (state, action) => {
            state.selectedSurfMeshName = action.payload;
        },
        
        // Camera and controls
        setCameraState: (state, action) => {
            state.cameraPosition = action.payload;
        },
        setControlsPosition: (state, action) => {
            state.controlsPosition = action.payload;
        },
        
        // Reset positions
        resetPositions: (state) => {
            state.cameraPosition = {};
            state.controlsPosition = {};
        },
        
        // Clear all data
        clearAllFiles: (state) => {
            state.files = [];
            state.surfFiles = [];
            state.meshVisibility = {};
            state.surfMeshVisibility = {};
            state.selectedMeshName = '';
            state.selectedSurfMeshName = '';
        },
        
        // Individual mesh visibility toggles
        toggleMeshVisibility: (state, action) => {
            const meshName = action.payload;
            if (state.meshVisibility.hasOwnProperty(meshName)) {
                state.meshVisibility[meshName] = !state.meshVisibility[meshName];
            }
        },
        
        toggleSurfMeshVisibility: (state, action) => {
            const meshName = action.payload;
            if (state.surfMeshVisibility.hasOwnProperty(meshName)) {
                state.surfMeshVisibility[meshName] = !state.surfMeshVisibility[meshName];
            }
        },
        
        // Batch visibility updates
        setAllMeshesVisible: (state, action) => {
            const visible = action.payload; // true or false
            Object.keys(state.meshVisibility).forEach(meshName => {
                state.meshVisibility[meshName] = visible;
            });
        },
        
        setAllSurfMeshesVisible: (state, action) => {
            const visible = action.payload; // true or false
            Object.keys(state.surfMeshVisibility).forEach(meshName => {
                state.surfMeshVisibility[meshName] = visible;
            });
        }
    }
});

// Export actions
export const {
    // Main STL Viewer actions
    setFiles,
    setMeshVisibility,
    setSelectedMeshName,
    
    // Surf Viewer actions
    setSurfFiles,
    setSurfMeshVisibility,
    setSelectedSurfMeshName,
    
    // Camera and controls actions
    setCameraState,
    setControlsPosition,
    resetPositions,
    
    // Utility actions
    clearAllFiles,
    toggleMeshVisibility,
    toggleSurfMeshVisibility,
    setAllMeshesVisible,
    setAllSurfMeshesVisible
} = modelSlice.actions;

// Export reducer
export default modelSlice.reducer;

// Selectors (optional but recommended)
export const selectMainFiles = (state) => state.model.files;
export const selectSurfFiles = (state) => state.model.surfFiles;
export const selectMeshVisibility = (state) => state.model.meshVisibility;
export const selectSurfMeshVisibility = (state) => state.model.surfMeshVisibility;
export const selectSelectedMeshName = (state) => state.model.selectedMeshName;
export const selectSelectedSurfMeshName = (state) => state.model.selectedSurfMeshName;
export const selectCameraPosition = (state) => state.model.cameraPosition;
export const selectControlsPosition = (state) => state.model.controlsPosition;