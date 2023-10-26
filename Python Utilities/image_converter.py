import distutils
import os
import subprocess
from PIL import Image
import shutil


def png_to_webp(root_dir, image_quality, image_extensions):
    num_images = count_image_files(root_dir, image_extensions)
    images_converted = 0

    if num_images == 0:
        print("No images found!")
    else:
        if input("Backup directory? (y/n), No is default: ") == "y":
            incremental_backup(image_dir, image_dir + "_backup")

        for dirpath, dirnames, filenames in os.walk(root_dir):
            for filename in filenames:
                # Check if the file has any of the common image extensions
                if any(filename.endswith(ext) for ext in image_extensions):
                    input_path = os.path.join(dirpath, filename)

                    # Check the image dimensions
                    with Image.open(input_path) as img:
                        width, height = img.size

                    # The output filename will always have a .webp extension
                    output_path = os.path.join(dirpath, os.path.splitext(filename)[0] + '.webp')

                    # Try executing the cwebp command
                    try:
                        result = subprocess.run(['cwebp', '-q', str(image_quality), input_path, '-o', output_path],
                                                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

                        # If conversion was successful and output file exists, delete the original image
                        if result.returncode == 0 and os.path.exists(output_path):
                            if input_path != output_path:
                                os.remove(input_path)

                            images_converted += 1
                            print(f"Converted {images_converted} of {num_images} images - {filename}")
                        else:
                            print(f"Conversion failed for {input_path}")
                    except subprocess.CalledProcessError:
                        print(f"Error processing {input_path}")

        print(f"Conversion to WebP @ {image_quality} Quality Completed!")


def webp_to_png(root_dir):
    num_images = count_image_files(root_dir, ['.webp'])
    images_converted = 0

    if num_images == 0:
        print("No images found!")
    else:
        incremental_backup(image_dir, image_dir + "_backup")
        for dirpath, dirnames, filenames in os.walk(root_dir):
            for filename in filenames:
                # Check if the file has a .webp extension
                if filename.endswith('.webp'):
                    input_path = os.path.join(dirpath, filename)

                    # The output filename will always have a .png extension
                    output_path = os.path.join(dirpath, os.path.splitext(filename)[0] + '.png')

                    # Try executing the dwebp command
                    try:
                        result = subprocess.run(['dwebp', input_path, '-o', output_path], stdout=subprocess.DEVNULL,
                                                stderr=subprocess.DEVNULL, check=True)

                        # If conversion was successful and output file exists, delete the original webp image
                        if result.returncode == 0 and os.path.exists(output_path):
                            os.remove(input_path)
                            # print(f"Converted and deleted {input_path}")
                            images_converted += 1
                            print(f"Converted {images_converted} of {num_images} images")
                        else:
                            print(f"Conversion failed for {input_path}")
                    except subprocess.CalledProcessError:
                        print(f"Error processing {input_path}")

        print("Conversion to PNG Completed!")


def duplicate_directory(src_dir, dest_dir):
    # Ensure source directory exists
    if not os.path.exists(src_dir):
        raise ValueError(f"Source directory {src_dir} does not exist!")

    # If destination directory exists, delete it
    if os.path.exists(dest_dir):
        shutil.rmtree(dest_dir)

    print(f"Backing up {src_dir} to {dest_dir}")

    # Copy directory
    shutil.copytree(src_dir, dest_dir)


def incremental_backup(src_dir, dest_dir):
    # Ensure source directory exists
    if not os.path.exists(src_dir):
        raise ValueError(f"Source directory {src_dir} does not exist!")

    print(f"Backing up {src_dir} to {dest_dir}")

    # Copy directory (only new files)
    distutils.dir_util.copy_tree(src_dir, dest_dir)


def count_image_files(directory_path, image_extensions):
    image_count = 0

    for root, dirs, files in os.walk(directory_path):
        for file in files:
            for ext in image_extensions:
                if file.lower().endswith(ext):
                    image_count += 1

    return image_count


def valid_dir(image_dir):
    if image_dir == "":
        new_input = input("Enter the path to the image directory: ").strip('\'"')
        if new_input == "":
            default_dir = "E:\zombiesGuides\games"
            print(f"Using default directory: {default_dir}")
            return default_dir
    else:
        use_previous_dir = input("Use previous directory? (y/n): ")
        if use_previous_dir == "n":
            return input("Enter the path to the image directory: ").strip('\'"')
        else:
            print("Using previous directory...")
            return image_dir


if __name__ == "__main__":
    while 1:
        image_dir = ""

        convert_option = input(
            "Convert to webp (1), convert to png (2), Backup Directory in Full (Don't) (3), Change Directory (4) or Quit (5)? ")

        if convert_option == "1":
            image_dir = valid_dir(image_dir)

            image_quality = input("Enter the image quality (1-100), 87 is Default: ")
            if image_quality == "":
                image_quality = "87"

            include_webp = input("Include webp files? (y/n), No is default: ")
            if include_webp == "":
                image_extensions = ['.png', '.jpg', '.jpeg', '.bmp']
            else:
                image_extensions = ['.png', '.jpg', '.jpeg', '.bmp', '.webp']

            png_to_webp(image_dir, image_quality, image_extensions)

        elif convert_option == "2":
            image_dir = valid_dir(image_dir)

            webp_to_png(image_dir)

        elif convert_option == "3":
            image_dir = valid_dir(image_dir)

            incremental_backup(image_dir, image_dir + "_backup")
            print("Backup Completed!")

        elif convert_option == "4":
            image_dir = input("Enter the path to the image directory: ").strip('\'"')

        elif convert_option == "5":
            break
