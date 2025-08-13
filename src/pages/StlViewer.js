import React from 'react';
import SurfViewComponent from '../components/surfView/SurfViewer';
import Scores from '../components/scores';

const SplitViewContainer = ({ 
    showUI = true, 
    imageUrl = null, 
    imageTitle = "Image Panel",
    splitRatio = 50 // Percentage for left panel (3D viewer)
}) => {
    return (
        <>
            <style>{`
                .split-view-container {
                    display: flex;
                    height: calc(100vh - 90px);
                    width: 100%;
                    background-color: #000000;
                    overflow: hidden;
                }

                .left-panel {
                    position: relative;
                    border-right: 2px solid #333333;
                    overflow: hidden;
                }

                .right-panel {
                    position: relative;
                    overflow: hidden;
                }

                /* Responsive design */
                @media (max-width: 768px) {
                    .split-view-container {
                        flex-direction: column;
                    }
                    
                    .left-panel {
                        border-right: none;
                        border-bottom: 2px solid #333333;
                    }
                }
            `}</style>
            
            {/* Menu Bar */}
            <Scores />
            
            <div className="split-view-container">
                {/* Left Panel - 3D STL Viewer */}
                <div 
                    className="left-panel" 
                    style={{ 
                        flex: `0 0 ${splitRatio}%`,
                        minWidth: '300px' // Minimum width for usability
                    }}
                >
                </div>

                {/* Right Panel - Image Display */}
                <div 
                    className="right-panel" 
                    style={{ 
                        flex: `0 0 ${100 - splitRatio}%`,
                        minWidth: '200px' // Minimum width for image panel
                    }}
                >
                </div>
            </div>
        </>
    );
};

export default SplitViewContainer