import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import StlViewer from "./pages/StlViewer";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import LoadFiles from "./pages/loadFIles";
import ACULoad from "./pages/ACULoad";
import PlaceholderComp from "./components/PlaceholderComp";

import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const location = useLocation();
  const [viewerState, setViewerState] = useState({});
  const viewerContainerRef = useRef(null);
  const [showViewerUI, setShowViewerUI] = useState(false);

  // Route checks
  const isViewerRoute = location.pathname === "/view-model";
  const isSelectRoute = location.pathname === "/select";
  const isMeasureRoute = location.pathname === "/measure";
  const isWandRoute = location.pathname === "/wand";

  useEffect(() => {
    if (isViewerRoute) {
      setShowViewerUI(true);
    } else {
      setShowViewerUI(false);
    }
  }, [isViewerRoute]);

  useEffect(() => {
    if (viewerContainerRef.current) {
      viewerContainerRef.current.style.display = isViewerRoute ? "block" : "none";
    }
  }, [isViewerRoute]);

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />

        <Main>
          {/* LoadFiles route */}
          <Route exact path="/load-files">
            <LoadFiles viewerState={viewerState} />
          </Route>

          <Route exact path="/acu-data">
            <ACULoad viewerState={viewerState} />
          </Route>

          {/* Select tool - using same pattern as STL Viewer */}
          <div
            style={{
              visibility: isSelectRoute ? "visible" : "hidden",
              width: "100%",
              height: isSelectRoute ? "calc(100vh - 60px)" : "9%",
              position: isSelectRoute ? "relative" : "absolute",
              zIndex: isSelectRoute ? "auto" : 0,
              top: isSelectRoute ? "auto" : 0,
              left: isSelectRoute ? "auto" : 0,
              overflow: "hidden",
            }}
          >
            <PlaceholderComp imagePath="select.png" alt="Select tool" />
          </div>

          {/* Measure tool - using same pattern as STL Viewer */}
          <div
            style={{
              visibility: isMeasureRoute ? "visible" : "hidden",
              width: "100%",
              height: isMeasureRoute ? "calc(100vh - 60px)" : "9%",
              position: isMeasureRoute ? "relative" : "absolute",
              zIndex: isMeasureRoute ? "auto" : 0,
              top: isMeasureRoute ? "auto" : 0,
              left: isMeasureRoute ? "auto" : 0,
              overflow: "hidden",
            }}
          >
            <PlaceholderComp 
              imagePath="../assets/select.png" 
              alt="Measure tool"
              title="Measure Tool"
              description="Advanced measurement capabilities for precise analysis."
            />
          </div>

          {/* Wand tool - using same pattern as STL Viewer */}
          <div
            style={{
              visibility: isWandRoute ? "visible" : "hidden",
              width: "100%",
              height: isWandRoute ? "calc(100vh - 60px)" : "9%",
              position: isWandRoute ? "relative" : "absolute",
              zIndex: isWandRoute ? "auto" : 0,
              top: isWandRoute ? "auto" : 0,
              left: isWandRoute ? "auto" : 0,
              overflow: "hidden",
            }}
          >
            <PlaceholderComp 
              imagePath="../assets/select.png" 
              alt="Wand tool"
              title="Magic Wand"
              description="Smart selection and manipulation tools."
            />
          </div>

          {/* STL Viewer persistently mounted, display toggled via JS */}
          <div
            style={{
              visibility: isViewerRoute ? "visible" : "hidden",
              width: "100%",
              height: isViewerRoute ? "calc(100vh - 60px)" : "9%",
              position: isViewerRoute ? "relative" : "absolute",
              zIndex: isViewerRoute ? "auto" : 0,
              top: isViewerRoute ? "auto" : 0,
              left: isViewerRoute ? "auto" : 0,
              overflow: "hidden",
            }}
          >
            <StlViewer state={viewerState} setState={setViewerState} showUI={showViewerUI} />
          </div>

          <Redirect from="*" to="/acu-data" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;