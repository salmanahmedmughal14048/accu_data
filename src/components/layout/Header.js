import { useState, useEffect } from "react";
import { ReactComponent as NotificationIcon } from '../../assets/images/icons/ICON Notifications.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/icons/ICON Settings.svg';
import { ReactComponent as UserIcon } from '../../assets/images/icons/ICON User.svg';

import { ReactComponent as FolderIcon } from '../../assets/images/icons/ICON Hospital.svg';

// No longer needed - using imported SVG

function Header({ 
  placement = "right", 
  name, 
  subName, 
  onPress, 
  handleSidenavColor, 
  handleSidenavType, 
  handleFixedNavbar,
  hospitalIconSize = "18px" // New parameter for hospital icon size
}) {
  // Key layout variables
  const headerHeight = "65px";
  const headerPadding = "24px";
  const headerBackgroundColor = "#080404";
  const sectionGap = "16px";        // Gap within sections
  const centerSectionGap = "100px";  // Gap between center info groups
  const iconSize = "22px";
  const drawerWidth = "360px";
  const logoTextGap = "80px";       // Increased gap between hospital logo and ACU Load text
  
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);
  const toggleNotification = () => setNotificationOpen(!notificationOpen);

  const styles = {
    headerContainer: {
      backgroundColor: headerBackgroundColor,
      padding: `0px ${headerPadding} 0 ${headerPadding}`,
      borderBottom: `1px solid #34495e`,
      height: headerHeight,
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: logoTextGap // Increased gap between hospital logo and text
    },
    appTitle: {
      color: '#ffffff',
      fontSize: '18px',
      fontWeight: '600',
      margin: '0'
    },
    documentInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: sectionGap
    },
    documentCode: {
      color: '#bdc3c7',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      whiteSpace: 'nowrap' // Prevent text wrapping
    },
    hospitalIcon: {
      width: hospitalIconSize,
      height: hospitalIconSize,
      flexShrink: 0 // Prevent icon from shrinking
    },
    headerCenter: {
      display: 'flex',
      alignItems: 'center',
      gap: centerSectionGap,
      flex: '1',
      justifyContent: 'center'
    },
    infoGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: sectionGap
    },
    infoLabel: {
      color: '#bdc3c7',
      fontSize: '13px'
    },
    infoValue: {
      color: '#ffffff',
      fontSize: '13px',
      fontWeight: '500'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: sectionGap,
      paddingRight: headerPadding
    },
    headerIcon: {
      color: '#ffffff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: iconSize,
      height: iconSize,
      borderRadius: '4px',
      transition: 'all 0.2s',
      position: 'relative'
    },
    notificationContainer: {
      position: 'relative',
      zIndex: notificationOpen ? 1001 : 'auto' // Higher z-index when open
    },
    notificationDropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: '8px',
      width: '320px',
      backgroundColor: '#ffffff',
      border: '1px solid #e8e8e8',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 1002,
      display: notificationOpen ? 'block' : 'none',
      color: '#000000'
    },
    notificationHeader: {
      padding: '16px',
      borderBottom: '1px solid #f0f0f0',
      fontWeight: '600',
      fontSize: '14px'
    },
    notificationItem: {
      padding: '12px 16px',
      borderBottom: '1px solid #f5f5f5',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    notificationOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      display: notificationOpen ? 'block' : 'none'
    },
    notificationBadge: {
      position: 'absolute',
      top: '-2px',
      right: '-2px',
      backgroundColor: '#ff4d4f',
      color: 'white',
      borderRadius: '50%',
      minWidth: '16px',
      height: '16px',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    drawer: {
      position: 'fixed',
      top: 0,
      right: placement === 'right' ? 0 : 'auto',
      left: placement === 'left' ? 0 : 'auto',
      width: drawerWidth,
      height: '100vh',
      backgroundColor: '#1a1a1a',
      transform: visible ? 'translateX(0)' : `translateX(${placement === 'right' ? '100%' : '-100%'})`,
      transition: 'transform 0.3s ease',
      zIndex: 1003, // Higher than notifications to appear on top
      boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
      padding: '24px',
      color: '#ffffff'
    },
    drawerOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.45)',
      zIndex: 999,
      display: visible ? 'block' : 'none'
    },
    drawerTitle: {
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: '600',
      margin: '0 0 8px 0'
    },
    drawerSubtitle: {
      color: '#cccccc',
      fontSize: '14px',
      margin: '0 0 24px 0'
    },
    section: {
      marginBottom: '24px'
    },
    sectionTitle: {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '600',
      margin: '0 0 8px 0'
    },
    sectionText: {
      color: '#cccccc',
      fontSize: '12px',
      margin: '0 0 12px 0'
    },
    buttonGroup: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px'
    },
    button: {
      padding: '6px 16px',
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      color: '#000000',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '400',
      transition: 'all 0.2s'
    },
    primaryButton: {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
      color: '#ffffff'
    },
    blackButton: {
      backgroundColor: '#262626',
      borderColor: '#262626',
      color: '#ffffff'
    },
    switch: {
      position: 'relative',
      display: 'inline-block',
      width: '44px',
      height: '22px'
    },
    switchInput: {
      opacity: 0,
      width: 0,
      height: 0
    },
    switchSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ccc',
      transition: '0.4s',
      borderRadius: '22px'
    },
    switchSliderBefore: {
      position: 'absolute',
      content: '""',
      height: '18px',
      width: '18px',
      left: '2px',
      bottom: '2px',
      backgroundColor: 'white',
      transition: '0.4s',
      borderRadius: '50%'
    }
  };

  return (
    <>
      <div style={styles.headerContainer}>
        <div style={styles.headerRow}>
          {/* Left Section */}
          <div style={styles.headerLeft}>
            <h1 style={styles.appTitle}>ACU Load</h1>
            <div style={styles.documentInfo}>
              <div style={styles.documentCode}>
                <FolderIcon style={styles.hospitalIcon} />
                <span>BAY-0444</span>
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div style={styles.headerCenter}>
            <div style={styles.infoGroup}>
              <span style={styles.infoLabel}>Patient Name:</span>
              <span style={styles.infoValue}>John Americana</span>
            </div>
            <div style={styles.infoGroup}>
              <span style={styles.infoLabel}>CT Scan Number:</span>
              <span style={styles.infoValue}>CT Vert3 Slice #4</span>
            </div>
          </div>

          {/* Right Section */}
          <div style={styles.headerRight}>
            {/* Notification Bell */}
            <div style={styles.notificationContainer}>
              <div 
                style={styles.headerIcon}
                onClick={toggleNotification}
                onMouseEnter={(e) => {
                  e.target.closest('.header-icon').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.closest('.header-icon').style.transform = 'scale(1.1)';
                  e.target.closest('.header-icon').style.filter = 'brightness(1.3) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))';
                }}
                onMouseLeave={(e) => {
                  e.target.closest('.header-icon').style.backgroundColor = 'transparent';
                  e.target.closest('.header-icon').style.transform = 'scale(1)';
                  e.target.closest('.header-icon').style.filter = 'none';
                }}
                className="header-icon"
              >
                <NotificationIcon />
                <div style={styles.notificationBadge}>4</div>
              </div>
              
              {/* Notification Dropdown */}
              <div style={styles.notificationDropdown}>
                <div style={styles.notificationHeader}>
                  Notifications (4)
                </div>
                <div 
                  style={styles.notificationItem}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Patient scan completed - BAY-0444
                </div>
                <div 
                  style={styles.notificationItem}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  New CT scan uploaded
                </div>
                <div 
                  style={styles.notificationItem}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  System maintenance scheduled
                </div>
                <div 
                  style={{...styles.notificationItem, borderBottom: 'none'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Memory usage alert resolved
                </div>
              </div>
            </div>

            {/* Settings Gear */}
            <div 
              style={styles.headerIcon}
              onClick={showDrawer}
              onMouseEnter={(e) => {
                e.target.closest('.header-icon').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.closest('.header-icon').style.transform = 'scale(1.1) rotate(15deg)';
                e.target.closest('.header-icon').style.filter = 'brightness(1.3) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))';
              }}
              onMouseLeave={(e) => {
                e.target.closest('.header-icon').style.backgroundColor = 'transparent';
                e.target.closest('.header-icon').style.transform = 'scale(1) rotate(0deg)';
                e.target.closest('.header-icon').style.filter = 'none';
              }}
              className="header-icon"
            >
              <SettingsIcon />
            </div>

            {/* User Icon */}
            <div 
              style={styles.headerIcon}
              onMouseEnter={(e) => {
                e.target.closest('.header-icon').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.closest('.header-icon').style.backgroundColor = 'transparent';
              }}
              className="header-icon"
            >
              <UserIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Overlay */}
      <div style={styles.notificationOverlay} onClick={() => setNotificationOpen(false)}></div>

      {/* Drawer Overlay */}
      <div style={styles.drawerOverlay} onClick={hideDrawer}></div>

      {/* Drawer */}
      <div style={styles.drawer}>
        <div>
          <h4 style={styles.drawerTitle}>Configurator</h4>
          <p style={styles.drawerSubtitle}>See our dashboard options.</p>
        </div>

        <div style={styles.section}>
          <h5 style={styles.sectionTitle}>Sidebar Color</h5>
          <div style={styles.buttonGroup}>
            <button 
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => handleSidenavColor && handleSidenavColor("#1890ff")}
            >
              1
            </button>
            <button 
              style={{...styles.button, ...styles.blackButton}}
              onClick={() => handleSidenavColor && handleSidenavColor("black")}
            >
              1
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <h5 style={styles.sectionTitle}>Sidenav Type</h5>
          <p style={styles.sectionText}>Choose between 2 types.</p>
          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.button,
                ...(sidenavType === "transparent" ? styles.primaryButton : {})
              }}
              onClick={() => {
                handleSidenavType && handleSidenavType("transparent");
                setSidenavType("transparent");
              }}
            >
              TRANSPARENT
            </button>
            <button
              style={{
                ...styles.button,
                ...(sidenavType === "white" ? styles.primaryButton : {})
              }}
              onClick={() => {
                handleSidenavType && handleSidenavType("#fff");
                setSidenavType("white");
              }}
            >
              WHITE
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <h5 style={styles.sectionTitle}>Navbar Fixed</h5>
          <label style={styles.switch}>
            <input 
              type="checkbox" 
              style={styles.switchInput}
              onChange={(e) => handleFixedNavbar && handleFixedNavbar(e.target.checked)}
            />
            <span 
              style={{
                ...styles.switchSlider,
                backgroundColor: '#181c44'
              }}
            ></span>
          </label>
        </div>
      </div>
    </>
  );
}

export default Header;
