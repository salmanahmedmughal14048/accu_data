/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";

const { Sider } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <Layout
      className={`${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
      style={{ paddingLeft: 0, paddingRight: 0, margin: 0, background: "#000000" }}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === "right" ? "left" : "right"}
        width={80}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
        bodyStyle={{ padding: 0, background: "#000000" }}
      >
        <Layout
          className={`layout-dashboard-compact ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
          style={{ padding: 0, background: "#000000" }}
        >
          <Sider
            trigger={null}
            width={80}
            theme="dark"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: "#000000" }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={80}
        theme="dark"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: "#000000" }}
      >
        <Sidenav color={sidenavColor} />
      </Sider>
      <Layout style={{ padding: 0, background: "#000000" }}>
        {fixed ? (
          <Affix>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </Affix>
        ) : (
          <Header
            onPress={openDrawer}
            name={pathname}
            subName={pathname}
            handleSidenavColor={handleSidenavColor}
            handleSidenavType={handleSidenavType}
            handleFixedNavbar={handleFixedNavbar}
          />
        )}
        {children}
      </Layout>
    </Layout>
  );
}

export default Main;