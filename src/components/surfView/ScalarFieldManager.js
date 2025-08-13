import * as THREE from 'three';

export class ScalarFieldManager {
  constructor() {
    this.defaultColorMap = [
      [200, 275, '#930c01'],
      [275, 350, 'rgb(235, 227, 14) '],
      [350, 12000, 'rgb(48, 113, 5)'],
    ];
    this.scalarFieldCache = new Map();
    this.currentScalarRange = null;
  }

  setColorMap(colorMap) {
    this.defaultColorMap = colorMap;
    this.triggerColorScaleUpdate();
  }

  // Trigger UI update using global callback
  triggerColorScaleUpdate(colorMap = null) {
    console.log('🎯 Triggering color scale update...');
    if (window.updateColorScaleLegend && typeof window.updateColorScaleLegend === 'function') {
      window.updateColorScaleLegend(
        colorMap || this.defaultColorMap, 
        this.currentScalarRange
      );
      console.log('✅ Color scale update sent to UI');
    } else {
      console.log('⚠️ No color scale update callback available');
    }
  }

  async loadScalarFieldFile(fileOrPath) {
    const fileName = typeof fileOrPath === 'string' ? fileOrPath : fileOrPath.name;
    if (this.scalarFieldCache.has(fileName)) {
      return this.scalarFieldCache.get(fileName);
    }
    try {
      let text;
      if (typeof fileOrPath === 'string') {
        const response = await fetch(`/${fileOrPath}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        text = await response.text();
      } else {
        text = await this.readFileAsText(fileOrPath);
      }
      const values = this.parseScalarValues(text);
      this.scalarFieldCache.set(fileName, values);
      return values;
    } catch (error) {
      console.error(`Error loading scalar field file ${fileName}:`, error);
      return null;
    }
  }

  readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  parseScalarValues(text) {
    const lines = text
      .split('\n')
      .filter(line => !line.trim().startsWith('#') && line.trim() !== '');

    if (lines.length === 0) return [];

    const firstLineTokens = lines[0].split(/[,\s]+/).filter(token => token !== '');
    const hasTextHeaders = firstLineTokens.some(token => isNaN(parseFloat(token)));
    const dataLines = hasTextHeaders ? lines.slice(1) : lines;

    const allTokens = dataLines.join('\n').split(/[,\s\n]+/).filter(val => val.trim() !== '');
    const values = allTokens.map(val => parseFloat(val)).filter(num => !isNaN(num));
    return values;
  }

  async applyScalarFieldToGeometry(geometry, scalarValues, colorMap = null, surfaceFileName = 'unknown', showValidation = true) {
    const rangeColorMap = colorMap || this.defaultColorMap;
    const index = geometry.index ? geometry.index.array : null;
    const position = geometry.attributes.position.array;
    const triangleCount = index ? index.length / 3 : position.length / 9;

    const isMatch = triangleCount === scalarValues.length;
    if (showValidation && !isMatch) {
      const message = `Scalar Application Error for: ${surfaceFileName}\n\nTriangles: ${triangleCount}\nScalars: ${scalarValues.length}\n\n⚠️ Mismatch: Scalars and triangles differ.`;
      const shouldContinue = await this.showPopup(message, 'Scalar Field Warning', true);
      if (!shouldContinue) return geometry;
    }

    // Calculate actual data range for the legend
    if (scalarValues.length > 0) {
      const minVal = Math.min(...scalarValues);
      const maxVal = Math.max(...scalarValues);
      this.currentScalarRange = { min: minVal, max: maxVal };
      console.log('📊 Calculated scalar range:', this.currentScalarRange);
      this.triggerColorScaleUpdate(rangeColorMap);
    }

    const colors = new Float32Array(position.length);
    for (let i = 0; i < triangleCount; i++) {
      const scalarValue = i < scalarValues.length ? scalarValues[i] : 0;
      const color = this.mapScalarToColor(scalarValue, rangeColorMap);
      const colorRGB = [color.r, color.g, color.b];
      let indices = index ? [index[i * 3], index[i * 3 + 1], index[i * 3 + 2]] : [i * 3, i * 3 + 1, i * 3 + 2];
      for (const vertexIndex of indices) {
        const posIndex = vertexIndex * 3;
        colors[posIndex] = colorRGB[0];
        colors[posIndex + 1] = colorRGB[1];
        colors[posIndex + 2] = colorRGB[2];
      }
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }

  computeTriangleScalarColors(geometry, colorMap = null) {
    const rangeColorMap = colorMap || this.defaultColorMap;
    const positions = geometry.attributes.position.array;
    const triangleCount = positions.length / 9;
    const colors = new Float32Array(positions.length);

    // Calculate centroid-based scalar values for the legend
    const centroidScalars = [];
    for (let i = 0; i < triangleCount; i++) {
      const baseIndex = i * 9;
      const v1 = new THREE.Vector3(...positions.slice(baseIndex, baseIndex + 3));
      const v2 = new THREE.Vector3(...positions.slice(baseIndex + 3, baseIndex + 6));
      const v3 = new THREE.Vector3(...positions.slice(baseIndex + 6, baseIndex + 9));
      const centroid = new THREE.Vector3().addVectors(v1, v2).add(v3).divideScalar(3);
      const scalarValue = centroid.length();
      centroidScalars.push(scalarValue);
      
      const color = this.mapScalarToColor(scalarValue, rangeColorMap);
      for (let j = 0; j < 3; j++) {
        const vertexColorIndex = baseIndex + j * 3;
        colors[vertexColorIndex] = color.r;
        colors[vertexColorIndex + 1] = color.g;
        colors[vertexColorIndex + 2] = color.b;
      }
    }

    // Update scalar range for legend
    if (centroidScalars.length > 0) {
      const minVal = Math.min(...centroidScalars);
      const maxVal = Math.max(...centroidScalars);
      this.currentScalarRange = { min: minVal, max: maxVal };
      console.log('📊 Calculated centroid scalar range:', this.currentScalarRange);
      this.triggerColorScaleUpdate(rangeColorMap);
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }

  mapScalarToColor(scalarValue, rangeColorMap) {
    for (const [minVal, maxVal, hexColor] of rangeColorMap) {
      if (scalarValue >= minVal && scalarValue < maxVal) {
        return new THREE.Color(hexColor);
      }
    }
    return new THREE.Color('#800000');
  }

  async showPopup(message, title, showCancel = true) {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;z-index:10000;font-family:monospace;';
      const popup = document.createElement('div');
      popup.style.cssText = 'background:white;padding:20px;border-radius:8px;max-width:500px;white-space:pre-line;line-height:1.4;';
      const titleDiv = document.createElement('div');
      titleDiv.textContent = title;
      titleDiv.style.cssText = 'font-size:18px;font-weight:bold;margin-bottom:15px;color:#333;border-bottom:2px solid #eee;padding-bottom:10px;';
      const messageDiv = document.createElement('div');
      messageDiv.textContent = message;
      messageDiv.style.cssText = 'margin-bottom:20px;font-size:14px;color:#333;';
      const buttonContainer = document.createElement('div');
      buttonContainer.style.cssText = 'display:flex;gap:10px;justify-content:flex-end;';
      const continueButton = document.createElement('button');
      continueButton.textContent = 'Continue';
      continueButton.style.cssText = 'background:#4CAF50;color:white;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;font-size:14px;';

      const cleanup = () => overlay.remove();
      continueButton.onclick = () => { cleanup(); resolve(true); };
      buttonContainer.appendChild(continueButton);

      if (showCancel) {
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.cssText = 'background:#f44336;color:white;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;font-size:14px;';
        cancelButton.onclick = () => { cleanup(); resolve(false); };
        buttonContainer.appendChild(cancelButton);
      }

      popup.appendChild(titleDiv);
      popup.appendChild(messageDiv);
      popup.appendChild(buttonContainer);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);
      continueButton.focus();
    });
  }

  async applyScalarColoring(geometry, surfaceFileName, menuData, surfFiles = [], customColorMap = null) {
    console.log('🎨 Applying scalar coloring to:', surfaceFileName);
    if (geometry.attributes.color) {
      geometry.deleteAttribute('color');
    }
    const scalarFileOrPath = this.findScalarFieldFile(surfaceFileName, menuData, surfFiles);
    if (scalarFileOrPath) {
      console.log('📁 Found scalar file:', scalarFileOrPath);
      const scalarValues = await this.loadScalarFieldFile(scalarFileOrPath);
      if (scalarValues && scalarValues.length > 0) {
        console.log('📊 Applying scalar values, count:', scalarValues.length);
        return this.applyScalarFieldToGeometry(geometry, scalarValues, customColorMap, surfaceFileName, true);
      }
    }
    console.log('🔄 Computing triangle scalar colors');
    return this.computeTriangleScalarColors(geometry, customColorMap);
  }

  findScalarFieldFile(surfaceFileName, menuData, surfFiles = []) {
    for (const section of menuData || []) {
      if (section.Vertebrae) {
        for (const vertebrae of Object.values(section.Vertebrae)) {
          if (vertebrae.topSurface === surfaceFileName && vertebrae.topSurfaceValues) {
            return this.findFileInList(vertebrae.topSurfaceValues, surfFiles);
          }
          if (vertebrae.bottomSurface === surfaceFileName && vertebrae.bottomSurfaceValues) {
            return this.findFileInList(vertebrae.bottomSurfaceValues, surfFiles);
          }
        }
      }
    }
    return null;
  }

  findFileInList(name, surfFiles) {
    return surfFiles.find(file => (file.name || file) === name) || name;
  }

  applyScalarFieldToGeometryDirect(geometry, scalarValues, colorMap = null) {
    console.log('🎯 Applying scalar field directly');
    return this.applyScalarFieldToGeometry(geometry, scalarValues, colorMap, 'direct', false);
  }

  clearCache() {
    this.scalarFieldCache.clear();
  }

  createMaterial(options = {}) {
    const {
      color = 0x808080,
      transparent = false,
      opacity = 1.0,
      wireframe = false,
      vertexColors = false,
      materialType = 'standard'
    } = options;

    const baseProps = { color, transparent, opacity, wireframe, vertexColors };

    switch (materialType) {
      case 'basic':
        return new THREE.MeshBasicMaterial(baseProps);
      case 'lambert':
        return new THREE.MeshLambertMaterial(baseProps);
      case 'standard':
      default:
        return new THREE.MeshStandardMaterial({ ...baseProps, roughness: 0.7, metalness: 0.1 });
    }
  }
}