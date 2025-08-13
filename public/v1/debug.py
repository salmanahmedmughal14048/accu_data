import trimesh
import open3d as o3d
import numpy as np
import pandas as pd

# === File Paths ===
GLB_PATH = "L1_surface.glb"
SCALAR_CSV_PATH = "L1_surface_colored_face_scalars.csv"

# === Load scalar data ===
print(f"Loading scalar values from: {SCALAR_CSV_PATH}")
face_scalars = pd.read_csv(SCALAR_CSV_PATH)['face_scalar'].values
print(f"Loaded {len(face_scalars)} face scalar values")

# === Load mesh using trimesh ===
print(f"Loading mesh from: {GLB_PATH}")
tri_obj = trimesh.load(GLB_PATH)

# Handle scene vs direct mesh
if isinstance(tri_obj, trimesh.Scene):
    print("GLB contains a scene. Extracting first mesh...")
    mesh_list = list(tri_obj.geometry.values())
    if not mesh_list:
        raise ValueError("No mesh found in GLB scene.")
    tri_mesh = mesh_list[0]
else:
    tri_mesh = tri_obj

vertices = np.array(tri_mesh.vertices)
faces = np.array(tri_mesh.faces)

print(f"Mesh has {len(vertices)} vertices and {len(faces)} faces")

if len(faces) != len(face_scalars):
    raise ValueError("Number of faces in GLB does not match number of scalar values!")

# === Define custom color mapping
def get_custom_color(val):
    if val < 250:
        return [0.0, 0.0, 1.0]  # Blue
    elif val < 500:
        return [0.0, 1.0, 0.0]  # Green
    elif val < 750:
        return [1.0, 1.0, 0.0]  # Yellow
    else:
        return [1.0, 0.0, 0.0]  # Red

# Get per-face RGB
face_colors = np.array([get_custom_color(s) for s in face_scalars])

# === Convert to Open3D format
print("Converting mesh to Open3D format...")
o3d_mesh = o3d.geometry.TriangleMesh()
o3d_mesh.vertices = o3d.utility.Vector3dVector(vertices)
o3d_mesh.triangles = o3d.utility.Vector3iVector(faces)

# Average face color to vertices for Open3D vertex coloring
vertex_color_sum = np.zeros((len(vertices), 3))
vertex_face_count = np.zeros(len(vertices))

for i, face in enumerate(faces):
    color = face_colors[i]
    for v_idx in face:
        vertex_color_sum[v_idx] += color
        vertex_face_count[v_idx] += 1

# Normalize to get average color per vertex
vertex_colors = vertex_color_sum / np.maximum(vertex_face_count[:, None], 1e-8)
o3d_mesh.vertex_colors = o3d.utility.Vector3dVector(vertex_colors)

# Normals (optional for shading)
o3d_mesh.compute_vertex_normals()

# === Visualize
print("Launching Open3D viewer...")
o3d.visualization.draw_geometries(
    [o3d_mesh],
    window_name="GLB Scalar Visualization (Discrete)",
    width=800,
    height=600,
    mesh_show_back_face=True
)
