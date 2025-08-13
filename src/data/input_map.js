// src/data.js

// Flag to choose between v1 and p4 versions
export const USE_P4_VERSION = true; // Set to true to use p4 version

// V1 Menu Data (Patient_001) - with metrics
const menuDataV1 = [
    {
        "Vertebrae": {
            "L1": {
                positions: ["Default", "Upper Contact", "Lower Contact"],
                isVisible: true,
                fileName: "Patient_001_L1+oriented.stl",
                topSurface: "",
                topSurfaceVisible: false,
                bottomSurface: "v1/L1_surface.glb",
                bottomSurfaceValues:"v1/L1_surface_colored_face_scalars.csv",
                bottomSurfaceVisible: true,
                boundary: "",
                boundaryVisible : false
            },
            "L2": {
                positions: ["Default", "Upper Contact", "Lower Contact"],
                isVisible: true,
                fileName: "colored_output.glb",
                topSurface: "v1/L2_surface.glb",
                topSurfaceVisible: false,
                topSurfaceValues:"v1/L2_surface_colored_face_scalars.csv",
                bottomSurface: "",
                bottomSurfaceVisible: false,
                boundary: "v1/Patient_001_L2+border.stl",
                boundaryVisible : false
            }
        }
    },
    {
        "Implants": {
            "Type 32x24": {
                "positions": [
                    "S1-B", "S1-D", "S1-F",
                    "S2-B", "S2-D", "S2-F",
                    "S3-B", "S3-D", "S3-F"
                ],
                "isVisible": [
                    true, false, false,
                    false, false, false,
                    false, false, false
                ],
                "fileName": [
                    "v1/Patient_001_L2_32x24.S1.B.stl",
                    "v1/Patient_001_L2_32x24.S1.D.stl",
                    "v1/Patient_001_L2_32x24.S1.F.stl",
                    "v1/Patient_001_L2_32x24.S2.B.stl",
                    "v1/Patient_001_L2_32x24.S2.D.stl",
                    "v1/Patient_001_L2_32x24.S2.F.stl",
                    "v1/Patient_001_L2_32x24.S3.B.stl",
                    "v1/Patient_001_L2_32x24.S3.D.stl",
                    "v1/Patient_001_L2_32x24.S3.F.stl"
                ],
                "metrics": {
                    "S1-B": [
                        { label: 'HP', value: '36', highlight: true },
                        { label: 'Contact HU', value: '280.2' },
                        { label: 'Contact SA', value: '497.07' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S1-D": [
                        { label: 'HP', value: '36.8', highlight: true },
                        { label: 'Contact HU', value: '282.32' },
                        { label: 'Contact SA', value: '603.58' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S1-F": [
                        { label: 'HP', value: '36.85', highlight: true },
                        { label: 'Contact HU', value: '282.32' },
                        { label: 'Contact SA', value: '690.09' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-B": [
                        { label: 'HP', value: '36.35', highlight: true },
                        { label: 'Contact HU', value: '286.27' },
                        { label: 'Contact SA', value: '499.318' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-D": [
                        { label: 'HP', value: '36.6', highlight: true },
                        { label: 'Contact HU', value: '284.92' },
                        { label: 'Contact SA', value: '607.29' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-F": [
                        { label: 'HP', value: '37', highlight: true },
                        { label: 'Contact HU', value: '283.97' },
                        { label: 'Contact SA', value: '690.37' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-B": [
                        { label: 'HP', value: '36.7', highlight: true },
                        { label: 'Contact HU', value: '288.979' },
                        { label: 'Contact SA', value: '497.63' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-D": [
                        { label: 'HP', value: '36.65', highlight: true },
                        { label: 'Contact HU', value: '285.41' },
                        { label: 'Contact SA', value: '610.01' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-F": [
                        { label: 'HP', value: '36.95', highlight: true },
                        { label: 'Contact HU', value: '284.04' },
                        { label: 'Contact SA', value: '689.2' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ]
                }
            },
            "Type 36x26": {
                "positions": [
                    "S1-B", "S1-D", "S1-F",
                    "S2-B", "S2-D", "S2-F",
                    "S3-B", "S3-D", "S3-F"
                ],
                "isVisible": [
                    false, false, false,
                    false, false, false,
                    false, false, false
                ],
                "fileName": [
                    "v1/Patient_001_L2_36x26.S1.B.stl",
                    "v1/Patient_001_L2_36x26.S1.D.stl",
                    "v1/Patient_001_L2_36x26.S1.F.stl",
                    "v1/Patient_001_L2_36x26.S2.B.stl",
                    "v1/Patient_001_L2_36x26.S2.D.stl",
                    "v1/Patient_001_L2_36x26.S2.F.stl",
                    "v1/Patient_001_L2_36x26.S3.B.stl",
                    "v1/Patient_001_L2_36x26.S3.D.stl",
                    "v1/Patient_001_L2_36x26.S3.F.stl"
                ],
                "metrics": {
                    "S1-B": [
                        { label: 'HP', value: '37.9', highlight: true },
                        { label: 'Contact HU', value: '289.576' },
                        { label: 'Contact SA', value: '576.97' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S1-D": [
                        { label: 'HP', value: '38.3', highlight: true },
                        { label: 'Contact HU', value: '290.143' },
                        { label: 'Contact SA', value: '700.504' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S1-F": [
                        { label: 'HP', value: '38.6', highlight: true },
                        { label: 'Contact HU', value: '289.1801' },
                        { label: 'Contact SA', value: '794.9573' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-B": [
                        { label: 'HP', value: '38.2', highlight: true },
                        { label: 'Contact HU', value: '290.6987' },
                        { label: 'Contact SA', value: '579.25' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-D": [
                        { label: 'HP', value: '38.5', highlight: true },
                        { label: 'Contact HU', value: '291.1342' },
                        { label: 'Contact SA', value: '702.5713' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-F": [
                        { label: 'HP', value: '38.75', highlight: true },
                        { label: 'Contact HU', value: '290.3727' },
                        { label: 'Contact SA', value: '797.0787' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-B": [
                        { label: 'HP', value: '38.65', highlight: true },
                        { label: 'Contact HU', value: '296.668' },
                        { label: 'Contact SA', value: '581.475' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-D": [
                        { label: 'HP', value: '38.6', highlight: true },
                        { label: 'Contact HU', value: '293.8449' },
                        { label: 'Contact SA', value: '703.4142' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-F": [
                        { label: 'HP', value: '39.1', highlight: true },
                        { label: 'Contact HU', value: '294.9379' },
                        { label: 'Contact SA', value: '792.9842' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ]
                }
            }
        }
    }
];

// P4 Menu Data (Patient_004) - with metrics
const menuDataP4 = [
    {
        "Vertebrae": {
            "L1": {
                positions: ["Default", "Upper Contact", "Lower Contact"],
                isVisible: true,
                fileName: "p4/L1_colored_output.glb",
                topSurface: "",
                topSurfaceVisible: false,
                bottomSurface: "p4/L1_surface.glb",
                bottomSurfaceValues:"p4/L1_surface_colored_face_scalars.csv",
                bottomSurfaceVisible: true,
                boundary: "",
                boundaryVisible : false
            },
            "L2": {
                positions: ["Default", "Upper Contact", "Lower Contact"],
                isVisible: true,
                fileName: "p4/L2_colored_output.glb",
                topSurface: "p4/L2_surface.glb",
                topSurfaceVisible: false,
                topSurfaceValues:"p4/L2_surface_colored_face_scalars.csv",
                bottomSurface: "",
                bottomSurfaceVisible: false,
                boundary: "",
                boundaryVisible : false
            }
        }
    },
    {
        "Implants": {
            "Type 32x24": {
                "positions": [
                    "S1-B", "S1-D", "S1-F",
                    "S2-B", "S2-D", "S2-F",
                    "S3-B", "S3-D", "S3-F"
                ],
                "isVisible": [
                    false, false, false,
                    false, false, false,
                    false, false, false
                ],
                "fileName": [
                    "p4/Patient_004_L2_32x24.S1.B.stl",
                    "p4/Patient_004_L2_32x24.S1.D.stl",
                    "p4/Patient_004_L2_32x24.S1.F.stl",
                    "p4/Patient_004_L2_32x24.S2.B.stl",
                    "p4/Patient_004_L2_32x24.S2.D.stl",
                    "p4/Patient_004_L2_32x24.S2.F.stl",
                    "p4/Patient_004_L2_32x24.S3.B.stl",
                    "p4/Patient_004_L2_32x24.S3.D.stl",
                    "p4/Patient_004_L2_32x24.S3.F.stl"
                ],
                "metrics": {
                    "S1-B": [
                        { label: 'HP', value: '31.9', highlight: true },
                        { label: 'Contact HU', value: '240.879' },
                        { label: 'Contact SA', value: '506.1538' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S1-D": [
                        { label: 'HP', value: '32.05', highlight: true },
                        { label: 'Contact HU', value: '239.004' },
                        { label: 'Contact SA', value: '619.085' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S1-F": [
                        { label: 'HP', value: '32.35', highlight: true },
                        { label: 'Contact HU', value: '237.4269' },
                        { label: 'Contact SA', value: '702.7098' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-B": [
                        { label: 'HP', value: '33.05', highlight: true },
                        { label: 'Contact HU', value: '259.46' },
                        { label: 'Contact SA', value: '500.3721' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-D": [
                        { label: 'HP', value: '32.2', highlight: true },
                        { label: 'Contact HU', value: '240.1' },
                        { label: 'Contact SA', value: '617.5035' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-F": [
                        { label: 'HP', value: '32.55', highlight: true },
                        { label: 'Contact HU', value: '241.5794' },
                        { label: 'Contact SA', value: '695.2475' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-B": [
                        { label: 'HP', value: '33.1', highlight: true },
                        { label: 'Contact HU', value: '260.021' },
                        { label: 'Contact SA', value: '499.145' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-D": [
                        { label: 'HP', value: '32.25', highlight: true },
                        { label: 'Contact HU', value: '240.1142' },
                        { label: 'Contact SA', value: '619.9215' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-F": [
                        { label: 'HP', value: '32.45', highlight: true },
                        { label: 'Contact HU', value: '238.5512' },
                        { label: 'Contact SA', value: '702.8592' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ]
                }
            },
            "Type 36x26": {
                "positions": [
                    "S1-B", "S1-D", "S1-F",
                    "S2-B", "S2-D", "S2-F",
                    "S3-B", "S3-D", "S3-F"
                ],
                "isVisible": [
                    false, false, false,
                    false, false, false,
                    false, false, false
                ],
                "fileName": [
                    "p4/Patient_004_L2_36x26.S1.B.stl",
                    "p4/Patient_004_L2_36x26.S1.D.stl",
                    "p4/Patient_004_L2_36x26.S1.F.stl",
                    "p4/Patient_004_L2_36x26.S2.B.stl",
                    "p4/Patient_004_L2_36x26.S2.D.stl",
                    "p4/Patient_004_L2_36x26.S2.F.stl",
                    "p4/Patient_004_L2_36x26.S3.B.stl",
                    "p4/Patient_004_L2_36x26.S3.D.stl",
                    "p4/Patient_004_L2_36x26.S3.F.stl"
                ],
                "metrics": {
                    "S1-B": [
                        { label: 'HP', value: '34.2', highlight: true },
                        { label: 'Contact HU', value: '255.8065' },
                        { label: 'Contact SA', value: '585.349' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S1-D": [
                        { label: 'HP', value: '34', highlight: true },
                        { label: 'Contact HU', value: '250.3971' },
                        { label: 'Contact SA', value: '713.4827' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S1-F": [
                        { label: 'HP', value: '34.1', highlight: true },
                        { label: 'Contact HU', value: '248.05' },
                        { label: 'Contact SA', value: '809.58' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-B": [
                        { label: 'HP', value: '34.05', highlight: true },
                        { label: 'Contact HU', value: '256.5818' },
                        { label: 'Contact SA', value: '587.3908' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-D": [
                        { label: 'HP', value: '34', highlight: true },
                        { label: 'Contact HU', value: '252.1222' },
                        { label: 'Contact SA', value: '710.0402' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S2-F": [
                        { label: 'HP', value: '34.05', highlight: true },
                        { label: 'Contact HU', value: '249.05055' },
                        { label: 'Contact SA', value: '806.1806' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-B": [
                        { label: 'HP', value: '34.2', highlight: true },
                        { label: 'Contact HU', value: '260.5939' },
                        { label: 'Contact SA', value: '586.0302' },
                        { label: 'Endplate', value: 'B' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-D": [
                        { label: 'HP', value: '34.05', highlight: true },
                        { label: 'Contact HU', value: '250.8044' },
                        { label: 'Contact SA', value: '715.444' },
                        { label: 'Endplate', value: 'D' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ],
                    "S3-F": [
                        { label: 'HP', value: '34.1', highlight: true },
                        { label: 'Contact HU', value: '249.171' },
                        { label: 'Contact SA', value: '807.2866' },
                        { label: 'Endplate', value: 'F' },
                        { label: 'Segment Width', value: '0' },
                        { label: 'Interbody Height', value: '0' },
                        { label: 'Segment Depth', value: '0' },
                        { label: 'Average HU Score', value: '0' }
                    ]
                }
            }
        }
    }
];

// Export the selected menu data based on the flag
export const menuData = USE_P4_VERSION ? menuDataP4 : menuDataV1;

// File type lookup
const extensions = {
    "stl": "model/stl",
    "glb": "model/gltf-binary"
};

// Reusable extractor
function extractFilenamesFromMenu(menu, includeSurfaces = false) {
    const fileMap = new Map();

    for (const category of menu) {
        for (const sectionKey in category) {
            const section = category[sectionKey];
            for (const itemKey in section) {
                const item = section[itemKey];

                // Normalize fileNames and visibility to arrays
                const fileNames = Array.isArray(item.fileName) ? item.fileName : [item.fileName];
                const visibilities = Array.isArray(item.isVisible) ? item.isVisible : [item.isVisible];

                fileNames.forEach((file, index) => {
                    if (file) {
                        const ext = file.split('.').pop();
                        if (extensions[ext]) {
                            if (!fileMap.has(file)) {
                                fileMap.set(file, {
                                    name: file,
                                    type: extensions[ext],
                                    visibility: { topSurface: false, bottomSurface: false }
                                });
                            }
                            // Optional: Could attach a 'baseVisible' flag here if needed
                            // fileMap.get(file).baseVisible = visibilities[index] ?? false;
                        }
                    }
                });

                // Optionally include top and bottom surface files
                if (includeSurfaces) {
                    const surfaceFiles = [
                        {
                            file: item.topSurface,
                            key: "topSurface",
                            visible: item.topSurfaceVisible
                        },
                        {
                            file: item.bottomSurface,
                            key: "bottomSurface",
                            visible: item.bottomSurfaceVisible
                        }
                    ];

                    for (const { file, key, visible } of surfaceFiles) {
                        if (file) {
                            const ext = file.split('.').pop();
                            if (extensions[ext]) {
                                if (!fileMap.has(file)) {
                                    fileMap.set(file, {
                                        name: file,
                                        type: extensions[ext],
                                        visibility: { topSurface: false, bottomSurface: false }
                                    });
                                }
                                fileMap.get(file).visibility[key] = !!visible;
                            }
                        }
                    }
                }
            }
        }
    }

    return Array.from(fileMap.values());
}

// Exports
export const modelFilenames = extractFilenamesFromMenu(menuData, false);
export const surfFilenames = extractFilenamesFromMenu(menuData, true);