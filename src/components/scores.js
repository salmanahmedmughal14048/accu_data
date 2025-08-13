import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const MenuBar = ({ showScores = true }) => {
    const [activeTab, setActiveTab] = useState('viewer');
    const [currentMetrics, setCurrentMetrics] = useState([]);
    const [shouldShowScores, setShouldShowScores] = useState(false);

    // Get menuData from Redux store
    const menuData = useSelector(state => state.menuData?.menuData || []);

    // Function to find visible implants across all types
    const findVisibleImplants = useMemo(() => {
        const visibleImplants = [];
        
        // Find the Implants object in menuData
        const implantsData = menuData.find(item => item.Implants);
        
        if (!implantsData) return visibleImplants;
        
        const implants = implantsData.Implants;
        
        // Loop through all implant types
        Object.keys(implants).forEach(implantType => {
            const implantData = implants[implantType];
            const positions = implantData.positions || [];
            const isVisible = implantData.isVisible || [];
            
            // Check each position for visibility
            positions.forEach((position, index) => {
                if (isVisible[index]) {
                    visibleImplants.push({
                        type: implantType,
                        position: position,
                        index: index
                    });
                }
            });
        });
        
        return visibleImplants;
    }, [menuData]);

    // Function to get metrics for a specific implant from menuData
    const getImplantMetrics = (implantType, position) => {
        // Look for metrics in menuData structure
        const implantsData = menuData.find(item => item.Implants);
        if (!implantsData) return null;
        
        const implantData = implantsData.Implants[implantType];
        if (!implantData || !implantData.metrics) return null;
        
        // Return metrics for this specific position
        return implantData.metrics[position] || null;
    };

    // Effect to update metrics when menuData changes
    useEffect(() => {
        const visibleImplants = findVisibleImplants;
        
        // Show scores only if exactly one implant is visible
        if (visibleImplants.length === 1) {
            const { type, position } = visibleImplants[0];
            
            // Get metrics for this specific implant from menuData
            const implantMetrics = getImplantMetrics(type, position);
            
            if (implantMetrics && implantMetrics.length > 0) {
                setCurrentMetrics(implantMetrics);
                setShouldShowScores(true);
            } else {
                // No metrics available for this implant - don't show scores
                setCurrentMetrics([]);
                setShouldShowScores(false);
            }
        } else {
            // Multiple or no implants visible - hide scores
            setCurrentMetrics([]);
            setShouldShowScores(false);
        }
    }, [menuData, findVisibleImplants]);

    const handleTabClick = (tabId, path) => {
        setActiveTab(tabId);
        console.log(`Navigate to: ${path}`);
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            backgroundColor: '#1F2A37',
            height: '41px',
            fontFamily: 'Segoe UI, sans-serif'
        }}>
            {/* Left Menu */}
            <div style={{
                display: 'flex',
                height: '37px',
                flexShrink: 0
            }}>
                <div
                    onClick={() => handleTabClick('setup', '/setup')}
                    style={{
                        width: '90px',
                        padding: '0 15px',
                        height: '37px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        backgroundColor: activeTab === 'setup' ? '#0A84FF' : '#2B313D',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        boxSizing: 'content-box'
                    }}
                >
                    Setup
                </div>

                <div
                    onClick={() => handleTabClick('viewer', '/viewer')}
                    style={{
                        width: '75px',
                        padding: '0 15px',
                        height: '37px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        backgroundColor: activeTab === 'viewer' ? '#0A84FF' : '#2B313D',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        boxSizing: 'content-box'
                    }}
                >
                    Viewer
                </div>
            </div>

            {/* Metrics Panel - Only show if exactly one implant is visible AND has metrics */}
            {showScores && shouldShowScores && currentMetrics.length > 0 && (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '0 20px',
                    minWidth: 0
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        fontSize: '12px',
                        lineHeight: '12px',
                        paddingTop: '1px',
                        height: '45px',
                        gap: '10px 10px',
                        rowGap: '0px',
                        overflow: 'hidden',
                        alignContent: 'start',
                        color: '#FFFFFF',
                        width: '100%',
                        maxWidth: '600px'
                    }}>
                        {currentMetrics.map((metric, index) => (
                            <span
                                key={index}
                                style={{
                                    whiteSpace: 'nowrap',
                                    margin: 0,
                                    padding: 0,
                                    color: metric.highlight ? '#F68C2D' : metric.alert ? '#FF0000' : '#FFFFFF'
                                }}
                            >
                                {metric.label}: <strong>{metric.value}</strong>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuBar;