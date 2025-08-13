import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useThreeScene from './ThreeScene';
import PartsMenuComponent from '../partsMenu/PartsMenuComponent';
import ColorScaleLegend from './ColorScaleLegend';
import { ScalarFieldManager } from './ScalarFieldManager'; // Import the ScalarFieldManager
import './SurfViewComponent.css';

const SurfViewComponent = ({ showUI }) => {
    const containerRef = useRef(null);
    const { surfFiles } = useSelector((state) => state.model);
    
    // Create a ScalarFieldManager instance
    const scalarFieldManagerRef = useRef(new ScalarFieldManager());
    
    // State for color scale legend
    const [colorScaleData, setColorScaleData] = useState({
        isVisible: false,
        colorMap: null,
        scalarRange: null
    });
    
    // Use our custom hook for all Three.js logic
    const { 
        meshesName, 
        setCameraView,
        scene,
        camera,
        controls,
        renderer
    } = useThreeScene(containerRef, surfFiles, showUI);

    // Set up global callback for scalar field updates
    useEffect(() => {
        // Create a global callback that any ScalarFieldManager can use
        window.updateColorScaleLegend = (colorMap, scalarRange) => {
            console.log('🎨 Color scale update received:', { colorMap, scalarRange });
            setColorScaleData({
                isVisible: false,
                colorMap: colorMap,
                scalarRange: scalarRange
            });
        };

        // Cleanup function
        return () => {
            delete window.updateColorScaleLegend;
        };
    }, []);

    // Initialize with ScalarFieldManager's default color map on mount
    useEffect(() => {
        // Get the default color map from ScalarFieldManager
        const defaultColorMap = scalarFieldManagerRef.current.defaultColorMap;
        
        setColorScaleData(prev => ({
            ...prev,
            colorMap: defaultColorMap
        }));
        
        // Trigger the initial color scale update
        scalarFieldManagerRef.current.triggerColorScaleUpdate();
    }, []);

    const handleCloseLegend = () => {
        setColorScaleData(prev => ({
            ...prev,
            isVisible: false
        }));
    };

    const toggleColorScaleLegend = () => {
        setColorScaleData(prev => ({
            ...prev,
            isVisible: !prev.isVisible
        }));
    };

    return (
        <div className="surf-view-container">
            {showUI && (
                <div className="parts-menu-wrapper">
                    <PartsMenuComponent />
                </div>
            )}
            
            <div
                className="three-js-container"
                ref={containerRef}
            />
            
            {/* Color Scale Legend */}
            <ColorScaleLegend
                colorMap={colorScaleData.colorMap}
                scalarRange={colorScaleData.scalarRange}
                isVisible={colorScaleData.isVisible}
                onClose={handleCloseLegend}
                position="bottom-right"
            />
            
            {/* Always show toggle button when UI is visible and we have a color map */}
            {showUI && colorScaleData.colorMap && (
                <button 
                    className="color-scale-toggle-btn"
                    onClick={toggleColorScaleLegend}
                    title="Toggle Color Scale Legend"
                >
                    🎨
                </button>
            )}
            
   
        </div>
    );
};

export default SurfViewComponent;