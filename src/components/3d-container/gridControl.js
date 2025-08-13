import React from "react";
import { Row, Col } from "antd";

const style = {
    textAlign: "center",
    background: "#1890ff",
    padding: "8px 0",
    minWidth: 50,
    cursor: "pointer",
    color: 'white',
    borderRadius: '6px'
};

const rowStyle = {
    // marginBottom: 8,
};

const GridControl = ({ setCameraView }) => (
        <Row
            gutter={[8, 8]}
            style={rowStyle}
            wrap
            justify="end" // ✅ was "start" or default
>


        <Col xs={6} sm={6} md={6} lg={6} xl={6} onClick={() => setCameraView("top")}>
            <div style={style}>Top</div>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} onClick={() => setCameraView("front")}>
            <div style={style}>Front</div>
        </Col>
    </Row>
);

export default GridControl;