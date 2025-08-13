import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader, GLTFLoader, TrackballControls } from 'three-stdlib';

import { useSelector, useDispatch } from 'react-redux';
import GridControl from './3d-container/gridControl';
import './3d-container/gridControl.css';
import { Select } from 'antd';
import { setCameraState, setControlsPosition, setSelectedMeshName } from '../redux/reducer/modelSlice';

const { Option } = Select;

let raycaster, mouse, camera, controls, scene, renderer;

const StlViewerComponent = ({ showUI }) => {
    const dispatch = useDispatch()
    const { files } = useSelector((state) => state.model);
    const menuData = useSelector((state) => state.menuData.menuData);
    const selectedMeshName = useSelector((state) => state.model.selectedMeshName);
    const containerRef = useRef(null);
    const groupRef = useRef(null);
    const selectedObjectRef = useRef(null);
    const modelBoundsRef = useRef({ size: null });
    const [meshesName, setMeshesName] = useState([])
    const { cameraPosition, controlsPosition } = useSelector(state => state.model)
    
    // Updated menuData effect - directly apply visibility to meshes
    useEffect(() => {
        console.log('**** MENUDATA CHANGE EFFECT TRIGGERED ****');
        console.log('**** menuData exists:', !!menuData);
        console.log('**** menuData length:', menuData ? menuData.length : 'undefined');
        console.log('**** scene exists:', !!scene);
        
        if (menuData && menuData.length > 0 && scene) {
            console.log('**** MENUDATA CHANGED - APPLYING VISIBILITY DIRECTLY ****');
            
            const entityGroup = scene.getObjectByName('entity-grp');
            if (entityGroup) {
                // First, collect all visibility states from menuData
                const visibilityMap = {};
                
                menuData.forEach(section => {
                    Object.keys(section).forEach(sectionKey => {
                        Object.keys(section[sectionKey]).forEach(itemKey => {
                            const item = section[sectionKey][itemKey];
                            
                            // Handle both array and single fileName formats
                            if (item.fileName && item.isVisible !== undefined) {
                                // Normalize to arrays for consistent processing
                                const fileNames = Array.isArray(item.fileName) ? item.fileName : [item.fileName];
                                const visibilities = Array.isArray(item.isVisible) ? item.isVisible : [item.isVisible];
                                
                                fileNames.forEach((fileName, index) => {
                                    if (fileName && fileName.trim()) {
                                        const visibility = visibilities[index] || false;
                                        visibilityMap[fileName] = visibility;
                                        console.log(`****     Collected ${fileName} visibility: ${visibility} ****`);
                                    }
                                });
                            }
                        });
                    });
                });
                
                // Apply visibility directly to meshes
                console.log('**** APPLYING VISIBILITY TO MESHES ****');
                entityGroup.children.forEach(mesh => {
                    if (visibilityMap.hasOwnProperty(mesh.name)) {
                        const oldVisibility = mesh.visible;
                        const newVisibility = visibilityMap[mesh.name];
                        mesh.visible = newVisibility;
                        console.log(`**** ${mesh.name}: ${oldVisibility} → ${newVisibility} ${oldVisibility !== newVisibility ? '(CHANGED)' : '(same)'} ****`);
                    } else {
                        console.log(`**** WARNING: No visibility data for mesh "${mesh.name}" ****`);
                    }
                });
                
                console.log('**** VISIBILITY UPDATE COMPLETE ****');
            } else {
                console.log('**** ERROR: entityGroup not found in scene ****');
            }
        } else {
            console.log('**** CONDITIONS NOT MET for updating visibility from menuData ****');
            console.log('****   menuData valid:', !!(menuData && menuData.length > 0));
            console.log('****   scene exists:', !!scene);
        }
    }, [menuData, scene]);
    
    // Restore visual highlight when UI shows and there's a selected mesh
    useEffect(() => {
        if (showUI && selectedMeshName && scene) {
            const entityGroup = scene.getObjectByName('entity-grp');
            if (entityGroup) {
                const mesh = entityGroup.getObjectByName(selectedMeshName);
                if (mesh && mesh.material?.color) {
                    // Clear previous selection
                    if (selectedObjectRef.current && selectedObjectRef.current.material?.color) {
                        selectedObjectRef.current.material.color.set(0xdedede);
                    }
                    // Set new selection
                    selectedObjectRef.current = mesh;
                    mesh.material.color.set(0xff0000);
                }
            }
        } else if (!showUI && selectedObjectRef.current && selectedObjectRef.current.material?.color) {
            // Remove visual highlight when UI is hidden
            selectedObjectRef.current.material.color.set(0xdedede);
        }
    }, [showUI, selectedMeshName]);

    // Camera View Button Logic
    const setCameraView = (view) => {
        if (!camera || !controls || !modelBoundsRef.current.size) return;

        const { size } = modelBoundsRef.current;
        const maxDim = Math.max(size.x, size.y, size.z);
        const distance = maxDim * 1.5;

        if (view === 'top') {
            camera.position.set(0, -distance, 0);
            camera.up.set(0, 0, 1);
        } else if (view === 'front') {
            camera.position.set(0, 0, distance);
            camera.up.set(0, 1, 0);
        }

        camera.lookAt(0, 0, 0);
        controls.target.set(0, 0, 0);
        controls.update();
    };

    const setCameraPosition = (obj, centerObject) => {
        obj.position.set(0, 0, 0);
        const box = new THREE.Box3().setFromObject(obj);
        const center = box.getCenter(new THREE.Vector3());
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        obj.position.sub(center);

        if (centerObject) {
            const distance = sphere.radius * 3.5;
            if (Object.keys(cameraPosition).length) {
                camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
            } else {
                camera.position.set(0, 0, distance);
            }

            if (Object.keys(controlsPosition).length) {
                controls.target.set(controlsPosition.x, controlsPosition.y, controlsPosition.z)
            }

            camera.near = distance / 100;
            camera.far = distance * 10;
            camera.updateProjectionMatrix();
        }

        modelBoundsRef.current.size = box.getSize(new THREE.Vector3());
    }

    const reColorMesh = (mesh) => {
        if (selectedObjectRef.current && selectedObjectRef.current.material?.color) {
            selectedObjectRef.current.material.color.set(0xdedede);
        }

        selectedObjectRef.current = mesh;
        dispatch(setSelectedMeshName(mesh.name));

        if (mesh.material?.color) {
            mesh.material.color.set(0xff0000);
        } else {
            console.warn(`Selected mesh "${mesh.name}" does not have a color property.`);
        }
    };

    // ORIGINAL file loading logic - ONLY runs when files change
    useEffect(() => {
        console.log('**** FILES EFFECT triggered ****');
        console.log('**** files.length:', files.length);
        
        if (files.length === 0 || !containerRef.current) return;

        console.log('**** LOADING FILES (original logic) ****');

        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.setClearColor(0x000000, 1);

        const containerEl = containerRef.current;
        const width = containerEl.clientWidth;
        const height = containerEl.clientHeight;
        renderer.setSize(width, height);
        containerEl.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);

        controls = new TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 2.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.dynamicDampingFactor = 0.8;

        scene.add(new THREE.AmbientLight(0xffffff, 1));

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(1, 1, 2);
        scene.add(directionalLight);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.0));

        const axesHelper = new THREE.AxesHelper(50)
        axesHelper.name = "axes-helper"
        scene.add(axesHelper);

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        let mouseDownPos = null;

        const onMouseDown = (event) => {
            mouseDownPos = { x: event.clientX, y: event.clientY };
        };

        const onMouseUp = (event) => {
            if (!mouseDownPos) return;
            const dx = event.clientX - mouseDownPos.x;
            const dy = event.clientY - mouseDownPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 4) handleClick(event);
            mouseDownPos = null;
        };

        const handleClick = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            if (!groupRef.current) return;

            const intersects = raycaster.intersectObjects(groupRef.current.children, true);

            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;

                if (selectedObjectRef.current === clickedObject) {
                    clickedObject.material.color.set(0xdedede);
                    selectedObjectRef.current = null;
                    dispatch(setSelectedMeshName(''));
                } else {
                    reColorMesh(clickedObject);
                }
            }
        };

        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mouseup', onMouseUp);

        const group = new THREE.Group();
        group.name = "entity-grp"
        const loader = new STLLoader();
        let loadedCount = 0;
        const fileNames = []
        
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const extension = file.name.split('.').pop().toLowerCase();

                let mesh = null;
                if (extension === 'stl') {
                    const loader = new STLLoader();
                    const geometry = loader.parse(event.target.result);
                    
                    const material = new THREE.MeshStandardMaterial({
                    color: 0xdedede,
                    metalness: 0.0,
                    roughness: 0.8,
                    flatShading: false,
                    side: THREE.DoubleSide,
                    });
                    
                    mesh = new THREE.Mesh(geometry, material);
                }
                else if (extension === 'glb') {
                    const gltfLoader = new GLTFLoader();
                    const glb = await new Promise((resolve) =>
                        gltfLoader.parse(event.target.result, '', resolve, console.error)
                    );
                    console.log(`✅ Parsed GLB file: ${file.name}`);
                    console.log('🎯 GLB scene object:', glb.scene);

                    glb.scene.traverse((child) => {
                        if (child.isMesh) {
                            console.log(`🧱 Mesh found in GLB: "${child.name}"`);
                            const geometry = child.geometry;

                            if (geometry.attributes.color) {
                                console.log('✅ Vertex colors exist in geometry.');
                                console.log('First color value:', geometry.attributes.color.array.slice(0, 4));
                                
                                child.material = new THREE.MeshBasicMaterial({
                                    vertexColors: true,
                                    side: THREE.DoubleSide,
                                    transparent: true,
                                    opacity: 1.0
                                });
                                
                                child.material.wireframe = false;
                                
                                if (child.material.color) {
                                    child.material.color.set(0xffffff);
                                }
                                
                                console.log('✓ Applied vertex color material to mesh');
                            } else {
                                console.warn('❌ No vertex color attribute found in geometry for', child.name);
                                child.material = new THREE.MeshStandardMaterial({
                                    color: 0xdedede,
                                    metalness: 0.0,
                                    roughness: 0.8,
                                    flatShading: false,
                                    side: THREE.DoubleSide,
                                });
                            }
                            
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    mesh = glb.scene;
                }

                mesh.name = file.name;
                mesh.visible = true; // Start with all meshes visible - menuData will control this
                fileNames.push(file.name)
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                group.add(mesh);

                loadedCount++;
                if (loadedCount === files.length) {
                    scene.add(group);
                    setCameraPosition(group, true)

                    controls.update();
                    setMeshesName([...fileNames])
                    
                    // Apply initial visibility based on current menuData
                    if (menuData && menuData.length > 0) {
                        console.log('**** Applying initial visibility from menuData ****');
                        
                        const entityGroup = scene.getObjectByName('entity-grp');
                        if (entityGroup) {
                            const visibilityMap = {};
                            
                            menuData.forEach(section => {
                                Object.keys(section).forEach(sectionKey => {
                                    Object.keys(section[sectionKey]).forEach(itemKey => {
                                        const item = section[sectionKey][itemKey];
                                        
                                        if (item.fileName && item.isVisible !== undefined) {
                                            const fileNames = Array.isArray(item.fileName) ? item.fileName : [item.fileName];
                                            const visibilities = Array.isArray(item.isVisible) ? item.isVisible : [item.isVisible];
                                            
                                            fileNames.forEach((fileName, index) => {
                                                if (fileName && fileName.trim()) {
                                                    const visibility = visibilities[index] || false;
                                                    visibilityMap[fileName] = visibility;
                                                }
                                            });
                                        }
                                    });
                                });
                            });
                            
                            entityGroup.children.forEach(mesh => {
                                if (visibilityMap.hasOwnProperty(mesh.name)) {
                                    mesh.visible = visibilityMap[mesh.name];
                                    console.log(`**** Initial visibility: ${mesh.name} = ${mesh.visible} ****`);
                                }
                            });
                        }
                    }
                    
                    console.log('**** FILES LOADED - initial visibility applied ****');
                }
            };
            reader.readAsArrayBuffer(file);
        });

        groupRef.current = group;

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const width = containerEl.clientWidth;
            const height = containerEl.clientHeight;

            renderer.setSize(width, height);
            const entityGroup = scene.getObjectByName('entity-grp')
            const axesH = scene.getObjectByName('axes-helper')
            
            if (entityGroup) {
                const baseSize = 1000;
                const scaleFactor = Math.max(0.1, Math.min(width, height) / baseSize);
                entityGroup.traverse((child) => {
                    if (child.isMesh) {
                        child.scale.set(scaleFactor, scaleFactor, scaleFactor)
                        child.updateMatrixWorld(true);
                    }
                });

                axesH.scale.set(scaleFactor, scaleFactor, scaleFactor)
                axesH.updateMatrixWorld(true);
                entityGroup.updateMatrixWorld(true)
                setCameraPosition(entityGroup, false)
            }
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            console.log('**** FILES CLEANUP ****');
            dispatch(setCameraState({ x: camera.position.x, y: camera.position.y, z: camera.position.z }))
            if (controls && controls.target)
                dispatch(setControlsPosition({ x: controls.target.x, y: controls.target.y, z: controls.target.z }))
            window.removeEventListener('resize', handleResize);
            renderer.domElement.removeEventListener('mousedown', onMouseDown);
            renderer.domElement.removeEventListener('mouseup', onMouseUp);
            renderer.dispose();
            if (containerEl) {
                while (containerEl.firstChild) {
                    containerEl.removeChild(containerEl.firstChild);
                }
            }
        };
    }, [files]); // ONLY runs when files change

    const handleSelect = (mName) => {
        const entityGroup = scene.getObjectByName('entity-grp')
        if (entityGroup && entityGroup.getObjectByName(mName)) {
            reColorMesh(entityGroup.getObjectByName(mName))
        }
    }

    const handleClear = () => {
        if (selectedObjectRef.current && selectedObjectRef.current.material?.color) {
            selectedObjectRef.current.material.color.set(0xdedede);
        }
        selectedObjectRef.current = null;
        dispatch(setSelectedMeshName(''));
    }

    return (
        <>
            <style>{`
                .select-mesh-dropdown-container {
                    position: absolute !important;
                    top: 20px !important;
                    left: 20px !important;
                    z-index: 1000 !important;
                    width: fit-content !important;
                    height: fit-content !important;
                    pointer-events: none !important;
                }
                
                .select-mesh-dropdown-container > * {
                    pointer-events: auto !important;
                }
                
                .select-mesh-dropdown .ant-select-selector {
                    background-color: #2a2a2a !important;
                    border: 1px solid #404040 !important;
                    color: #ffffff !important;
                }
                
                .select-mesh-dropdown .ant-select-selection-placeholder {
                    color: #cccccc !important;
                }
                
                .select-mesh-dropdown .ant-select-selection-item {
                    color: #ffffff !important;
                }
                
                .select-mesh-dropdown .ant-select-arrow {
                    color: #ffffff !important;
                }
                
                .select-mesh-dropdown:hover .ant-select-selector {
                    border-color: #1890ff !important;
                }
                
                .select-mesh-dropdown.ant-select-focused .ant-select-selector {
                    border-color: #1890ff !important;
                    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
                }
                
                .ant-select-dropdown {
                    background-color: #2a2a2a !important;
                    border: 1px solid #404040 !important;
                }
                
                .ant-select-item {
                    background-color: #2a2a2a !important;
                    color: #ffffff !important;
                }
                
                .ant-select-item:hover {
                    background-color: #404040 !important;
                }
                
                .ant-select-item-option-selected {
                    background-color: #1890ff !important;
                    color: #ffffff !important;
                }
                
                .grid-control-wrapper {
                    position: absolute !important;
                    top: 20px !important;
                    right: 20px !important;
                    z-index: 10 !important;
                    pointer-events: none !important;
                }
                
                .grid-control-wrapper > * {
                    pointer-events: auto !important;
                }
                
                .clear-selection-btn {
                    background-color: #404040 !important;
                    border: 1px solid #666666 !important;
                    color: #ffffff !important;
                    border-radius: 4px !important;
                    padding: 4px 8px !important;
                    font-size: 12px !important;
                    cursor: pointer !important;
                    margin-left: 8px !important;
                }
                
                .clear-selection-btn:hover {
                    background-color: #666666 !important;
                    border-color: #888888 !important;
                }
            `}</style>
            
            <div style={{ 
                height: '100%', 
                width: '100%', 
                overflow: 'hidden', 
                position: 'relative',
                backgroundColor: '#000000'
            }}>
                {showUI && (
                    <>  
                        <div className="grid-control-wrapper">
                            <GridControl setCameraView={setCameraView} />
                        </div>
                    </>
                )}
                
                <div
                    style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1 }}
                    ref={containerRef}
                ></div>
            </div>
        </>
    );
};

export default StlViewerComponent;