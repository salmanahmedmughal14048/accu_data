import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Each page has its own tab state with prefix
    activeTabKeys: {
        loadFiles: '1',      // LoadFiles page starts with tab 1 (Questionnaire)
        splitView: '2',      // SplitView page starts with tab 2 (Viewer)
        settings: '1',       // Settings page starts with tab 1  
        dashboard: '1',      // Dashboard page starts with tab 1
        // Add more pages as needed
    },
    currentPath: '/',
    // Add other route-related state here
};

const tabRouteSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
        setActiveTabKey: (state, action) => {
            const { prefix, tabKey } = action.payload;
            console.log(`Redux setActiveTabKey called for ${prefix} with:`, tabKey);
            state.activeTabKeys[prefix] = tabKey;
        },
        setCurrentPath: (state, action) => {
            console.log('Redux setCurrentPath called with:', action.payload);
            state.currentPath = action.payload;
        },
        // Helper action to set tab for specific pages
        setLoadFilesTab: (state, action) => {
            console.log('Redux setLoadFilesTab called with:', action.payload);
            state.activeTabKeys.loadFiles = action.payload;
        },
        setSplitViewTab: (state, action) => {
            console.log('Redux setSplitViewTab called with:', action.payload);
            state.activeTabKeys.splitView = action.payload;
        },
        setSettingsTab: (state, action) => {
            console.log('Redux setSettingsTab called with:', action.payload);
            state.activeTabKeys.settings = action.payload;
        },
        setDashboardTab: (state, action) => {
            console.log('Redux setDashboardTab called with:', action.payload);
            state.activeTabKeys.dashboard = action.payload;
        },
        // Reset all tabs to default
        resetAllTabs: (state) => {
            console.log('Redux resetAllTabs called');
            state.activeTabKeys = {
                loadFiles: '1',
                splitView: '2',  // Reset to Viewer tab for SplitView
                settings: '1',
                dashboard: '1',
            };
        },
        // Reset specific page tabs to their defaults
        resetPageTabs: (state, action) => {
            const prefix = action.payload;
            console.log(`Redux resetPageTabs called for:`, prefix);
            
            // Define default tabs for each page
            const defaults = {
                loadFiles: '1',   // Questionnaire
                splitView: '2',   // Viewer
                settings: '1',    // General
                dashboard: '1',   // Overview
            };
            
            state.activeTabKeys[prefix] = defaults[prefix] || '1';
        },
        // Batch update multiple tab states
        setMultipleTabKeys: (state, action) => {
            const updates = action.payload; // { loadFiles: '2', splitView: '1' }
            console.log('Redux setMultipleTabKeys called with:', updates);
            
            Object.keys(updates).forEach(prefix => {
                state.activeTabKeys[prefix] = updates[prefix];
            });
        },
        // Initialize a new page's tab state
        initializePageTabs: (state, action) => {
            const { prefix, defaultTab } = action.payload;
            console.log(`Redux initializePageTabs called for ${prefix} with default:`, defaultTab);
            
            // Only set if doesn't exist
            if (!state.activeTabKeys[prefix]) {
                state.activeTabKeys[prefix] = defaultTab || '1';
            }
        },
    },
});

export const { 
    setActiveTabKey, 
    setCurrentPath, 
    setLoadFilesTab,
    setSplitViewTab,
    setSettingsTab,
    setDashboardTab,
    resetAllTabs,
    resetPageTabs,
    setMultipleTabKeys,
    initializePageTabs
} = tabRouteSlice.actions;

export default tabRouteSlice.reducer;