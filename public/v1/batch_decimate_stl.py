import vtk
import os
import sys

def decimate_stl(input_file, output_file, reduction_ratio):
    print(f"  Decimating {input_file} with reduction ratio: {reduction_ratio:.2f}")

    # Read input STL
    reader = vtk.vtkSTLReader()
    reader.SetFileName(input_file)
    reader.Update()
    input_mesh = reader.GetOutput()
    num_input_cells = input_mesh.GetNumberOfCells()

    # Apply QEM decimation
    decimator = vtk.vtkQuadricDecimation()
    decimator.SetInputData(input_mesh)
    decimator.SetTargetReduction(reduction_ratio)
    decimator.Update()

    output_mesh = decimator.GetOutput()
    num_output_cells = output_mesh.GetNumberOfCells()

    # Report actual reduction
    actual_reduction = (num_input_cells - num_output_cells) / num_input_cells
    print(f"    Actual reduction: {actual_reduction:.2%}")

    # Write to STL
    writer = vtk.vtkSTLWriter()
    writer.SetFileName(output_file)
    writer.SetInputData(output_mesh)
    writer.SetFileTypeToBinary()  # Add this before writer.Write()

    writer.Write()
    print(f"    Saved to: {output_file}")

def process_folder(folder_path, reduction_ratio):
    output_folder = os.path.join(folder_path, "output")
    os.makedirs(output_folder, exist_ok=True)

    stl_files = [f for f in os.listdir(folder_path) if f.lower().endswith(".stl")]
    if not stl_files:
        print("No STL files found in folder.")
        return

    for filename in stl_files:
        input_file = os.path.join(folder_path, filename)
        output_file = os.path.join(output_folder, filename)
        decimate_stl(input_file, output_file, reduction_ratio)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python batch_decimate_vtk.py <folder_path> <reduction_ratio (0.0 to 0.99)>")
        sys.exit(1)

    folder = sys.argv[1]
    reduction_ratio = float(sys.argv[2])

    if not os.path.exists(folder):
        print(f"Error: Folder '{folder}' does not exist.")
        sys.exit(1)

    if not (0.0 <= reduction_ratio <= 0.99):
        print("Error: Reduction ratio must be between 0.0 and 0.99")
        sys.exit(1)

    process_folder(folder, reduction_ratio)
