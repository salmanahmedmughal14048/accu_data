import React from 'react';

const CustomTab = ({ 
    items, 
    activeKey, 
    onChange, 
    showScores = true, 
    metrics = [], 
    defaultActiveKey = '1', 
    pagePrefix = 'unknown' 
}) => {
    const handleTabClick = (key) => {
        console.log(`[${pagePrefix}] Tab clicked:`, key);
        console.log(`[${pagePrefix}] Current activeKey:`, activeKey);
        console.log(`[${pagePrefix}] Default activeKey:`, defaultActiveKey);
        
        if (onChange) {
            console.log(`[${pagePrefix}] Calling onChange with key:`, key);
            onChange(key);
        } else {
            console.log(`[${pagePrefix}] No onChange function provided`);
        }
    };

    const activeItem = items.find(item => item.key === activeKey);
    console.log(`[${pagePrefix}] Active item:`, activeItem?.label || 'None');
    console.log(`[${pagePrefix}] Available items:`, items.map(item => `${item.key}:${item.label}`));

    return (
        <>
            <style>{`
                .custom-tab-container {
                    display: flex;
                    flex-direction: column;
                    
                }

                .tab-header {
                    display: flex;
                    align-items: flex-start;
                    background-color: #1F2A37;
                    height: 37px;
                    font-family: 'Segoe UI', sans-serif;
                    flex-shrink: 0;
                }

                .tab-left {
                    display: flex;
                    height: 37px;
                }

                .tab-item {
                    min-width: 100px;
                    height: 37px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    background-color: #2B313D;
                    color: #FFFFFF;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                    padding: 0 15px;
                    border: none;
                    outline: none;
                    white-space: nowrap;
                }

                .tab-item:hover {
                    background-color: #374151;
                }

                .tab-item.active {
                    background-color: #0A84FF;
                }

                .metric-container {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 0 20px;
                }

                .metric-panel {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-template-rows: repeat(2, 1fr);
                    font-size: 12px;
                    line-height: 12px;
                    padding-top: 1px;
                    height:36px;
                    gap: 10px 10px;
                    row-gap: 0px;
                    overflow: hidden;
                    align-content: start;
                    color: #FFFFFF;  
                }

                .metric-panel span {
                    white-space: nowrap;
                    margin: 0;
                    padding: 0;
                }

                .highlight {
                    color: #F68C2D; /* orange */
                }

                .alert {
                    color: #FF0000; /* red */
                }

                .tab-content {
                    flex: 1;
                    
                    background-color: #000000;
                    padding: 0;
                }

                .tab-pane {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                /* Loading state for when no active item */
                .no-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FFFFFF;
                    font-size: 16px;
                    height: 100%;
                }
            `}</style>

            <div className="custom-tab-container">
                <div className="tab-header">
                    <div className="tab-left">
                        {items.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => handleTabClick(item.key)}
                                className={`tab-item ${activeKey === item.key ? 'active' : ''}`}
                                title={`Switch to ${item.label} tab`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    {showScores && metrics.length > 0 && (
                        <div className="metric-container">
                            <div className="metric-panel">
                                {metrics.map((metric, index) => (
                                    <span
                                        key={index}
                                        className={metric.highlight ? 'highlight' : metric.alert ? 'alert' : ''}
                                        title={`${metric.label}: ${metric.value}`}
                                    >
                                        {metric.label}: <strong>{metric.value}</strong>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="tab-content">
                    {activeItem ? (
                        <div className="tab-pane">
                            {activeItem.children}
                        </div>
                    ) : (
                        <div className="no-content">
                            <div>
                                <h3>No content available</h3>
                                <p>Active key: {activeKey}</p>
                                <p>Available tabs: {items.map(item => item.key).join(', ')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CustomTab;