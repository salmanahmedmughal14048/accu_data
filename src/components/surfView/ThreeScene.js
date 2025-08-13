import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader, GLTFLoader, TrackballControls } from 'three-stdlib';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuData } from '../../redux/reducer/menuDataSlice';
import { VisibilityManager } from './visibilityManager';
import { ScalarFieldManager } from './ScalarFieldManager';

const useThreeScene = (containerRef, surfFiles, showUI) => {
  // ✅ COLORING MODE FLAG - Change this to switch between coloring modes
  const USE_SCALAR_FIELD_COLORING = true; // Set to false to use original GLB colors
  
  const NON_SURFACE_OPACITY = 0.95;
  const BOUNDARY_OPACITY = 0.8; // Opacity for boundary meshes

  const dispatch = useDispatch();
  const { cameraPosition, controlsPosition } = useSelector(state => state.model);
  const { menuData, opacity } = useSelector(state => state.menuData);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const groupRef = useRef(null);
  const modelBoundsRef = useRef({ size: null });
  const visibilityManagerRef = useRef(new VisibilityManager());
  const scalarFieldManagerRef = useRef(new ScalarFieldManager());

  const [meshesName, setMeshesName] = useState([]);

  const isSurfaceFile = (fileName) => {
    return menuData?.some(section =>
      section.Vertebrae && Object.values(section.Vertebrae).some(vertebrae =>
        vertebrae.topSurface === fileName || vertebrae.bottomSurface === fileName
      )
    );
  };

  // ✅ Check if file is a boundary file
  const isBoundaryFile = (fileName) => {
    return menuData?.some(section =>
      section.Vertebrae && Object.values(section.Vertebrae).some(vertebrae =>
        vertebrae.boundary === fileName
      )
    );
  };

  // ✅ Material creation with clean separation of concerns
  const createMaterial = (isVertexColors = false, isSurface = true, isBoundary = false, useReduxOpacity = false) => {
    let currentOpacity;
    
    if (isBoundary) {
      currentOpacity = BOUNDARY_OPACITY;
    } else if (isSurface) {
      currentOpacity = 1.0;
    } else {
      currentOpacity = useReduxOpacity ? opacity : NON_SURFACE_OPACITY;
    }
    
    const isFullyOpaque = currentOpacity >= 0.9;
    
    // Z-fighting mitigation
    let polygonOffsetFactor;
    if (isBoundary) {
      polygonOffsetFactor = -2; // Render boundaries in front
    } else if (isSurface) {
      polygonOffsetFactor = -1;
    } else {
      polygonOffsetFactor = 2;
    }
    
    const baseConfig = {
      side: THREE.DoubleSide,
      transparent: !isFullyOpaque,
      opacity: currentOpacity,
      depthWrite: isFullyOpaque,
      polygonOffset: true,
      polygonOffsetFactor,
      polygonOffsetUnits: 1,
      castShadow: !isBoundary, // Boundaries don't cast shadows
      receiveShadow: !isBoundary // Boundaries don't receive shadows
    };

    if (isVertexColors) {
      return new THREE.MeshBasicMaterial({
        ...baseConfig,
        vertexColors: true
      });
    }

    // Special styling for boundary materials
    if (isBoundary) {
      return new THREE.MeshBasicMaterial({
        ...baseConfig,
        color: 0x404040, // Red color for boundaries
        wireframe: false
      });
    }

    return new THREE.MeshStandardMaterial({
      ...baseConfig,
      color: 0xdedede,
      metalness: 0.0,
      roughness: 0.8,
      flatShading: false
    });
  };

  // ✅ Clean STL processing with boundary support
  const processSTLMesh = async (geometry, file, isFileSurface, isFileBoundary) => {
    let processedGeometry = geometry;
    let hasVertexColors = false;

    // Branch 1: Apply scalar field coloring for surface files (not boundaries)
    if (USE_SCALAR_FIELD_COLORING && isFileSurface && !isFileBoundary) {
      console.log(`🎨 [DEBUG] Applying scalar field coloring to STL: ${file.name}`);
      processedGeometry = await scalarFieldManagerRef.current.applyScalarColoring(
        geometry, 
        file.name, 
        menuData, 
        surfFiles
      );
      hasVertexColors = !!processedGeometry.attributes.color;
    }

    // Create material based on file type
    const material = createMaterial(hasVertexColors, isFileSurface, isFileBoundary, !isFileSurface && !isFileBoundary);
    const mesh = new THREE.Mesh(processedGeometry, material);
    
    // Set render order: boundaries (highest) -> surfaces -> other meshes
    if (isFileBoundary) {
      mesh.renderOrder = 2;
      mesh.userData.isBoundary = true;
    } else if (isFileSurface) {
      mesh.renderOrder = 0;
    } else {
      mesh.renderOrder = 1;
      mesh.userData.useReduxOpacity = true;
    }

    return mesh;
  };

  // ✅ Clean GLB processing with boundary support
  const processGLBMesh = async (glbScene, file, isFileSurface, isFileBoundary) => {
    await Promise.all(glbScene.children.map(async (child) => {
      if (child.isMesh) {
        await processGLBChildMesh(child, file, isFileSurface, isFileBoundary);
      }
    }));

    // Traverse any nested children
    glbScene.traverse(async (child) => {
      if (child.isMesh && !glbScene.children.includes(child)) {
        await processGLBChildMesh(child, file, isFileSurface, isFileBoundary);
      }
    });

    return glbScene;
  };

  // ✅ Process individual GLB child mesh with boundary support
  const processGLBChildMesh = async (child, file, isFileSurface, isFileBoundary) => {
    let hasVertexColors = false;

    if (USE_SCALAR_FIELD_COLORING && isFileSurface && !isFileBoundary) {
      // Branch 1: Apply scalar field coloring (overrides original GLB colors) - not for boundaries
      console.log(`🎨 [DEBUG] Applying scalar field coloring to GLB mesh: ${file.name}`);
      child.geometry = await scalarFieldManagerRef.current.applyScalarColoring(
        child.geometry,
        file.name,
        menuData,
        surfFiles
      );
      hasVertexColors = !!child.geometry.attributes.color;
      
      // Create new material for scalar field
      child.material = createMaterial(hasVertexColors, isFileSurface, isFileBoundary, !isFileSurface && !isFileBoundary);
    } else {
      // Branch 2: Preserve original GLB colors and materials or use boundary styling
      if (isFileBoundary) {
        console.log(`🔲 [DEBUG] Creating boundary material for: ${file.name}`);
        child.material = createMaterial(false, isFileSurface, isFileBoundary, false);
      } else {
        console.log(`🎭 [DEBUG] Preserving original GLB colors for: ${file.name}`);
        
        // Check if geometry already has vertex colors
        hasVertexColors = !!child.geometry?.attributes?.color;
        
        if (hasVertexColors) {
          // Use vertex colors from GLB
          child.material = createMaterial(true, isFileSurface, isFileBoundary, !isFileSurface);
        } else {
          // Create standard material and preserve original color if it exists
          const originalColor = child.material?.color?.clone() || new THREE.Color(0xffffff);
          child.material = createMaterial(false, isFileSurface, isFileBoundary, !isFileSurface);
          child.material.color.copy(originalColor);
        }
      }
    }

    // Common settings for all branches
    if (isFileBoundary) {
      child.renderOrder = 2;
      child.userData.isBoundary = true;
      child.castShadow = child.receiveShadow = false; // Boundaries don't interact with shadows
    } else if (isFileSurface) {
      child.renderOrder = 0;
      child.castShadow = child.receiveShadow = true;
    } else {
      child.renderOrder = 1;
      child.castShadow = child.receiveShadow = true;
      child.userData.useReduxOpacity = true;
    }
  };

  const setCameraPosition = (obj, centerObject) => {
    obj.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    obj.position.sub(center);

    if (centerObject && cameraRef.current && controlsRef.current) {
      const distance = sphere.radius * 3.5;
      cameraRef.current.position.set(0, 0, distance);
      controlsRef.current.target.set(0, 0, 0);
      cameraRef.current.near = distance / 100;
      cameraRef.current.far = distance * 10;
      cameraRef.current.updateProjectionMatrix();
    }

    modelBoundsRef.current.size = box.getSize(new THREE.Vector3());
    visibilityManagerRef.current.setModelBounds(modelBoundsRef.current);
  };

  const setCameraView = (view) => {
    if (!cameraRef.current || !controlsRef.current || !modelBoundsRef.current.size) return;

    const { size } = modelBoundsRef.current;
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim * 1.5;

    if (view === 'top') {
      cameraRef.current.position.set(0, distance, 0);
      cameraRef.current.up.set(0, 0, -1);
    } else if (view === 'front') {
      cameraRef.current.position.set(0, 0, distance);
      cameraRef.current.up.set(0, 1, 0);
    }

    cameraRef.current.lookAt(0, 0, 0);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  useEffect(() => {
    if (surfFiles.length === 0 || !containerRef.current) return;

    const containerEl = containerRef.current;
    const width = containerEl.clientWidth;
    const height = containerEl.clientHeight;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(width, height);
    containerEl.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const controls = new TrackballControls(camera, renderer.domElement);
    Object.assign(controls, {
      rotateSpeed: 2.0,
      zoomSpeed: 1.2,
      panSpeed: 0.8,
      dynamicDampingFactor: 0.8
    });

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.0));

    const axesHelper = new THREE.AxesHelper(50);
    axesHelper.name = "axes-helper";
    scene.add(axesHelper);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    controlsRef.current = controls;

    const group = new THREE.Group();
    group.name = "entity-grp";
    let loadedCount = 0;
    const fileNames = [];

    console.log(`🎯 [DEBUG] Color mode: ${USE_SCALAR_FIELD_COLORING ? 'Scalar Field' : 'Original GLB Colors'}`);

    surfFiles.forEach((file) => {
      const isFileSurface = isSurfaceFile(file.name);
      const isFileBoundary = isBoundaryFile(file.name);
      const reader = new FileReader();

      reader.onload = async (event) => {
        const extension = file.name.split('.').pop().toLowerCase();
        let mesh = null;

        try {
          if (extension === 'stl') {
            // ✅ Clean STL processing with boundary support
            const loader = new STLLoader();
            const geometry = loader.parse(event.target.result);
            mesh = await processSTLMesh(geometry, file, isFileSurface, isFileBoundary);
            
            console.log(`📐 [DEBUG] Loaded STL ${isFileBoundary ? '(boundary)' : isFileSurface ? '(surface)' : ''}: ${file.name}`);
          } else if (extension === 'glb') {
            // ✅ Clean GLB processing with boundary support
            const gltfLoader = new GLTFLoader();
            const glb = await new Promise((resolve, reject) =>
              gltfLoader.parse(event.target.result, '', resolve, reject)
            );
            mesh = await processGLBMesh(glb.scene, file, isFileSurface, isFileBoundary);
            
            console.log(`📦 [DEBUG] Loaded GLB ${isFileBoundary ? '(boundary)' : isFileSurface ? '(surface)' : ''}: ${file.name}`);
          }

          if (mesh) {
            mesh.name = file.name;
            mesh.visible = true;
            fileNames.push(file.name);
            group.add(mesh);
          }
        } catch (error) {
          console.error(`❌ [DEBUG] Error processing file ${file.name}:`, error);
        }

        loadedCount++;
        if (loadedCount === surfFiles.length) {
          scene.add(group);
          setCameraPosition(group, true);
          controls.update();
          setMeshesName([...fileNames]);

          if (menuData?.length) {
            visibilityManagerRef.current.updateVisibilityFromMenuData(
              scene, menuData, dispatch, setMenuData,
              cameraRef, controlsRef, modelBoundsRef.current
            );
            visibilityManagerRef.current.initializeSurfaceVisibility(menuData);
          }
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
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const entityGroup = scene.getObjectByName('entity-grp');
      const axesHelper = scene.getObjectByName('axes-helper');

      if (entityGroup) {
        const scaleFactor = Math.max(0.1, Math.min(width, height) / 1000);
        entityGroup.traverse(child => {
          if (child.isMesh) child.scale.set(scaleFactor, scaleFactor, scaleFactor);
        });
        axesHelper.scale.set(scaleFactor, scaleFactor, scaleFactor);
        setCameraPosition(entityGroup, false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerEl.contains(renderer.domElement)) {
        containerEl.removeChild(renderer.domElement);
      }
    };
  }, [surfFiles, USE_SCALAR_FIELD_COLORING]); // Added USE_SCALAR_FIELD_COLORING to dependencies

  useEffect(() => {
    if (sceneRef.current && opacity !== undefined) {
      visibilityManagerRef.current.updateOpacityForReduxParts(sceneRef.current, opacity);

      sceneRef.current.traverse((child) => {
        if (child.isMesh && child.userData.useReduxOpacity) {
          const hasVertexColors = !!child.geometry?.attributes?.color;
          const newMaterial = createMaterial(hasVertexColors, false, false, true);

          if (child.material) child.material.dispose();
          child.material = newMaterial;
        }
      });
    }
  }, [opacity]);

  useEffect(() => {
    if (menuData?.length && sceneRef.current && surfFiles.length) {
      visibilityManagerRef.current.updateVisibilityFromMenuData(
        sceneRef.current,
        menuData,
        dispatch,
        setMenuData,
        cameraRef,
        controlsRef,
        modelBoundsRef.current
      );
    }
  }, [menuData]);

  return {
    meshesName,
    setCameraView,
    scene: sceneRef.current,
    camera: cameraRef.current,
    controls: controlsRef.current,
    renderer: rendererRef.current
  };
};

export default useThreeScene;