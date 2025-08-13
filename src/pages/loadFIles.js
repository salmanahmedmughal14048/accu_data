import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { setFiles } from "../redux/reducer/modelSlice";
import { setCurrentPath, setActiveTabKey } from "../redux/reducer/tabRouteSlice";
import CustomTab from "../components/customTabs";
import LoadModel from "../components/LoadModel";

const LoadFiles = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    // Page prefix for this component
    const PAGE_PREFIX = 'loadFiles';
    const DEFAULT_TAB = '1'; // Default to Questionnaire

    const modelFiles = useSelector((state) => state.model.files);
    
    // Get tab state specific to this page with safe fallback
    const activeTabKey = useSelector((state) => {
        return state.route?.activeTabKeys?.[PAGE_PREFIX] || DEFAULT_TAB;
    });

    // Debug the state
    useEffect(() => {
        console.log(`[${PAGE_PREFIX}] Component mounted`);
        console.log(`[${PAGE_PREFIX}] Active tab key:`, activeTabKey);
        console.log(`[${PAGE_PREFIX}] Default tab:`, DEFAULT_TAB);
    }, [activeTabKey]);

    // Example metrics data - you can customize this or get from Redux state
    const metrics = [
        { label: 'Files Loaded', value: modelFiles?.length || '0' },
        { label: 'Model Status', value: 'Ready', highlight: true },
        { label: 'Processing Time', value: '2.3s' },
        { label: 'Memory Usage', value: '45MB', alert: true },
        { label: 'Cache Size', value: '128KB' },
        { label: 'Validation', value: 'Passed' },
        { label: 'Last Updated', value: new Date().toLocaleTimeString().slice(0, 5) },
        { label: 'Version', value: '1.2.3' }
    ];

    const handleTabChange = (key) => {
        console.log(`[${PAGE_PREFIX}] Tab changed to:`, key);
        // Dispatch with prefix and tab key
        dispatch(setActiveTabKey({ 
            prefix: PAGE_PREFIX, 
            tabKey: key 
        }));
    };

    const items = [
        {
            key: '1',
            label: 'Load Model',
            children: <div style={{ flex: 'none' }}><LoadModel /></div>,
        }
    ];

    return (
        <CustomTab 
            items={items} 
            activeKey={activeTabKey} 
            onChange={handleTabChange}
            showScores={false}
            metrics={metrics}
            pagePrefix={PAGE_PREFIX}
            defaultActiveKey={DEFAULT_TAB}  // LoadFiles defaults to Questionnaire tab
        />
    );
};

export default LoadFiles;