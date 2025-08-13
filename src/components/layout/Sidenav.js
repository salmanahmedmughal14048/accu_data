import { useLocation, NavLink } from "react-router-dom";
import logo from "../../assets/images/LOGO_ACU_Load.svg";
import { ReactComponent as LoadFilesIcon } from '../../assets/images/ICON_OpenFolder.svg';
import { ReactComponent as ViewModelIcon } from '../../assets/images/ICON_3DViewer.svg';
import { ReactComponent as MoreIcon } from '../../assets/images/ICONMore.svg';

import { ReactComponent as AcuData } from '../../assets/images/icons/ICON ACUdata.svg';
import { ReactComponent as Select } from '../../assets/images/icons/ICON Select.svg';
import { ReactComponent as Measure } from '../../assets/images/icons/ICON Measure.svg';
import { ReactComponent as Wand } from '../../assets/images/icons/ICON Wand.svg';

function Sidenav({ color = "#1890ff" }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  // Row height variables
  const brandRowHeight = "65px";  // Logo region height (brand section)
  const moreIconRowHeight = "35px";  // More icon section row height

  // Navigation item styling variables (not applied to "More" section)
  const navItemPadding = "8px";  // Top/bottom padding for navigation items
  const navIconSize = "25px";     // Width/height for navigation icons
  const navItemGap = "2px";       // Gap between icon and label

  // Simple temporary icon - same for all
  const TempIcon = () => (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );

  return (
    <>
      <style>{`
        .sidenav .nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          gap: 4px;
          padding: 12px 0;
          color: #ffffff;
          transition: background-color 0.2s;
        }

        .active .nav-link {
          background-color: #585c64;
        }

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background-color: transparent;
          transition: color 0.2s;
        }

        .icon svg {
          transition: fill 0.2s, stroke 0.2s;
        }

        .active .icon {
          color: #1890ff;
        }

        .active .icon svg {
          fill: #1890ff;
          stroke: #1890ff;
        }

        .sidenav .icon-svg {
          display: block;
          width: 20px;
          height: 20px;
        }

        .sidenav .label {
          font-size: 12px;
          color: #ffffff;
        }

        .brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 0;
          gap: 4px;
          height: ${brandRowHeight};
          justify-content: center;
        }

        .brand-text {
          font-size: 12px;
          font-weight: 500;
          color: #ffffff;
          text-align: center;
          white-space: nowrap;
        }

        .temp-menu-item {
          opacity: 0.6;
        }

        .temp-menu-item .nav-link {
          cursor: not-allowed;
        }

        .sidenav hr {
          margin: 0;
          width: 100%;
          border: none;
          border-top: 1px solid #404040;
        }

        .more-icon-section {
          height: ${moreIconRowHeight};
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }

        .more-icon-section .nav-link {
          padding: 0;
          gap: 1px;
        }

        .more-icon-section .icon {
          width: 24px;
          height: 8px;
        }

        .more-icon-section .icon-svg {
          width: 16px;
          height: 16px;
        }

        .more-icon-section .label {
          font-size: 10px;
        }

        .more-dots {
          display: flex;
          flex-direction: row;
          gap: 2px; /* Customizable spacing between dots */
          align-items: center;
          justify-content: center;
        }

        .dot {
          width: 3px; /* Customizable dot width */
          height: 3px; /* Customizable dot height */
          background-color: #ffffff; /* Customizable dot color */
          border-radius: 50%;
          display: inline-block;
        }

        .divider-after-more {
          margin: 0;
          width: 100%;
          border: none;
          border-top: 1px solid #404040;
        }

      `}</style>

      <div className="sidenav">

        <div className="brand">
          <img src={logo} alt="Logo" height={42} />
        </div>

        <hr />

        {/* Custom Logo Section with specific row height */}
        <div className="custom-menu-item more-icon-section">
          <div className="nav-link">
            <div className="icon">
              <div className="more-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
            <div className="label">More</div>
          </div>
        </div>

        {/* Dividing line after More */}
        <hr className="divider-after-more" />

        <div className={`custom-menu-item ${page === "acu-data" ? "active" : ""}`}>
          <NavLink className="nav-link" to="/acu-data">
            <div className="icon">
              <AcuData />
            </div>
            <div className="label">ACU Data</div>
          </NavLink>
        </div>

        {/* Temporary icon 2 - Above Load Files */}

        <div className={`custom-menu-item ${page === "select" ? "active" : ""}`}>
          <NavLink className="nav-link" to="/select">
            <div className="icon">
              <Select />
            </div>
            <div className="label">ACU Scan</div>
          </NavLink>
        </div>


        <div className={`custom-menu-item ${page === "load-files" ? "active" : ""}`}>
          <NavLink className="nav-link" to="/load-files">
            <div className="icon">
              <LoadFilesIcon />
            </div>
            <div className="label">ACU Load</div>
          </NavLink>
        </div>

        <div className={`custom-menu-item ${page === "view-model" ? "active" : ""}`}>
          <NavLink className="nav-link" to="/view-model">
            <div className="icon">
              <ViewModelIcon  />
            </div>
            <div className="label">View Model</div>
          </NavLink>
        </div>


        <div className={`custom-menu-item ${page === "measure" ? "active" : ""}`}>
          <NavLink className="nav-link" to="/measure">
            <div className="icon">
              <Measure />
            </div>
            <div className="label">Measure</div>
          </NavLink>
        </div>


        <div className={`custom-menu-item ${page === "wand" ? "active" : ""}`}>
          <NavLink className="nav-link" to="/wand">
            <div className="icon">
              <Wand />
            </div>
            <div className="label">Wand</div>
          </NavLink>
        </div>

      </div>



    </>
  );
}

export default Sidenav;