from PIL import Image
import os

img_folder_path = "img"
compressed_folder_path = "fastimg"

os.makedirs(compressed_folder_path, exist_ok=True)

for root, dirs, files in os.walk(img_folder_path):
    for file in files:
        if file.endswith(".jpg"):
            input_file_path = os.path.join(root, file)
            output_folder_path = os.path.join(compressed_folder_path, os.path.relpath(root, img_folder_path))
            output_file_path = os.path.join(output_folder_path, file)

            os.makedirs(output_folder_path, exist_ok=True)

            if os.path.exists(output_file_path):
                print(f"File exists, skip: {output_file_path}")
                continue

            try:
                with Image.open(input_file_path) as img:
                    img.thumbnail((img.width // 8, img.height // 8))
                    img.save(output_file_path)
                    print(f"Compress and save succeed: {output_file_path}")
            except Exception as e:
                print(f"Compress and sace failed: {input_file_path}")
                print(e)

print("Complete.")
