// src/components/LoadModel.js
import {
    menuData as inputMenuData,
    modelFilenames,
    surfFilenames
} from "../data/input_map";
import uploadedImage from "../assets/scan.png"; // Replace with your actual image name

import React, { useRef, useEffect, useState } from "react";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    setFiles,
    resetPositions,
    setSurfFiles
} from "../redux/reducer/modelSlice";
import { setMenuData } from "../redux/reducer/menuDataSlice";
import { setCurrentPath } from "../redux/reducer/tabRouteSlice";

const LoadModel = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const fileInputRef = useRef(null);
    const modelFiles = useSelector((state) => state.model.files);
    const surfFiles = useSelector((state) => state.model.surfFiles);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    
    // Color variables
    const uploadAreaColor = "rgb(48, 47, 47)"; //rgb(124, 119, 119) 

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            // Store uploaded files for display purposes
            setUploadedFiles(Array.from(files));
            // Do nothing else on uploaded files as requested
        }
    };

    // Helper function to extract all boundary files from menuData
    const extractBoundaryFiles = (menuData) => {
        const boundaryFiles = [];
        
        menuData.forEach(section => {
            if (section.Vertebrae) {
                Object.values(section.Vertebrae).forEach(vertebrae => {
                    if (vertebrae.boundary && vertebrae.boundary.trim() !== "") {
                        boundaryFiles.push(vertebrae.boundary);
                    }
                });
            }
        });
        
        return boundaryFiles;
    };

    useEffect(() => {
        const loadDefaultModels = async () => {
            if (modelFiles.length > 0) return;

            try {
                const modelFilesArray = [];

                // Load regular model files
                for (const { name, type } of modelFilenames) {
                    const response = await fetch(`/${name}`);
                    const blob = await response.blob();
                    const file = new File([blob], name, { type });
                    modelFilesArray.push(file);
                }

                // Extract and load boundary files from menuData
                const boundaryFileNames = extractBoundaryFiles(inputMenuData);
                console.log("Loading boundary files to model files:", boundaryFileNames);

                for (const boundaryFileName of boundaryFileNames) {
                    try {
                        const response = await fetch(`/${boundaryFileName}`);
                        const blob = await response.blob();
                        // Determine file type based on extension
                        const extension = boundaryFileName.split('.').pop().toLowerCase();
                        const mimeType = extension === 'stl' ? 'application/octet-stream' : 
                                        extension === 'glb' ? 'model/gltf-binary' : 'application/octet-stream';
                        const file = new File([blob], boundaryFileName, { type: mimeType });
                        modelFilesArray.push(file);
                        console.log(`✅ Loaded boundary file to model files: ${boundaryFileName}`);
                    } catch (error) {
                        console.error(`❌ Error loading boundary file ${boundaryFileName}:`, error);
                    }
                }

                dispatch(setFiles(modelFilesArray));
                dispatch(setMenuData(inputMenuData));
                dispatch(setCurrentPath("/view-model"));
                // history.push("/view-model");
            } catch (error) {
                console.error("Error loading default models:", error);
            }
        };
        loadDefaultModels();
    }, [dispatch, history, modelFiles]);

    useEffect(() => {
        const loadSurfViewModels = async () => {
            if (surfFiles.length > 0) return;

            try {
                const surfFilesArray = [];

                // Load regular surf files
                for (const surfFile of surfFilenames) {
                    const response = await fetch(surfFile.name);
                    const blob = await response.blob();
                    const file = new File([blob], surfFile.name, { type: surfFile.type });
                    surfFilesArray.push(file);
                }

                // Extract and load boundary files from menuData (ALSO add to surf files)
                const boundaryFileNames = extractBoundaryFiles(inputMenuData);
                console.log("Loading boundary files to surf files:", boundaryFileNames);

                for (const boundaryFileName of boundaryFileNames) {
                    try {
                        const response = await fetch(`/${boundaryFileName}`);
                        const blob = await response.blob();
                        // Determine file type based on extension
                        const extension = boundaryFileName.split('.').pop().toLowerCase();
                        const mimeType = extension === 'stl' ? 'application/octet-stream' : 
                                        extension === 'glb' ? 'model/gltf-binary' : 'application/octet-stream';
                        const file = new File([blob], boundaryFileName, { type: mimeType });
                        surfFilesArray.push(file);
                        console.log(`✅ Loaded boundary file to surf files: ${boundaryFileName}`);
                    } catch (error) {
                        console.error(`❌ Error loading boundary file ${boundaryFileName}:`, error);
                    }
                }

                dispatch(setSurfFiles(surfFilesArray));
            } catch (error) {
                console.error("Error loading SurfView models:", error);
            }
        };

        loadSurfViewModels();
    }, [dispatch, surfFiles]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                height: "80vh",
                width: "100%",
            }}
        >
            <div
                style={{
                    width: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    type="primary"
                    style={{ width: "150px", height: "40px" }}
                    onClick={handleClick}
                    icon={<UploadOutlined />}
                >
                    Upload CT Scans
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    webkitdirectory=""
                    directory=""
                    multiple
                />
            </div>
            
            <div
                style={{
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: uploadedFiles.length > 0 ? "20px" : "20px 100px 20px 20px",
                }}
            >
                {uploadedFiles.length > 0 ? (
                    <img
                        src={uploadedImage}
                        alt="CT Scans uploaded"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            border: "2px solid #4CAF50",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "80%",
                            border: "2px dashed #1890ff",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: uploadAreaColor,
                            color: "#1890ff",
                            fontSize: "16px",
                            fontWeight: "500",
                            gap: "12px",
                        }}
                    >
                        <UploadOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
                        Upload CT Scans
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoadModel;