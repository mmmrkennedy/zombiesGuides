import distutils
import os
import subprocess
from PIL import Image
import shutil


def png_to_webp(root_dir, image_quality, image_extensions=['.png', '.jpg', '.jpeg', '.bmp', '.webp']):
    num_images = count_image_files(root_dir, image_extensions)
    images_converted = 0

    initial_size = get_directory_size(root_dir)
    print("Initial Size: " + str(initial_size) + " MB")

    if num_images == 0:
        print("No images found!")
    else:
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

                if images_converted >= num_images:
                    print("Warning: More images converted than initially counted. Breaking out of the loop.")
                    break

            if images_converted >= num_images:
                break


        new_size = get_directory_size(root_dir)

        print(f"Initial Size: {initial_size}, New Size: {new_size}, Difference: {round((((new_size - initial_size) / initial_size) * 100),2)}% (-% Means New Size is Smaller Initial Size)")

        print(f"Conversion to WebP @ Quality Level: {image_quality} Completed!")


def webp_to_png(root_dir):
    num_images = count_image_files(root_dir, ['.webp'])
    images_converted = 0

    initial_size = get_directory_size(root_dir)
    print("Initial Size: " + str(initial_size) + " MB")

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

        new_size = get_directory_size(root_dir)

        print(f"Initial Size: {initial_size}, New Size: {new_size}, Difference: {((new_size - initial_size) / initial_size) * 100}%")

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

    # List of image file extensions (add more if needed)
    image_extensions = ['.jpg', '.jpeg', '.png', '.webp']

    # Iterate over all files in source directory
    for root, _, files in os.walk(src_dir):
        for file in files:
            # Check if the file has an image extension
            if any(file.lower().endswith(ext) for ext in image_extensions):
                src_file_path = os.path.join(root, file)
                # Calculate relative path to preserve directory structure
                rel_path = os.path.relpath(src_file_path, src_dir)
                dest_file_path = os.path.join(dest_dir, rel_path)

                # Create destination directory if it does not exist
                dest_dir_path = os.path.dirname(dest_file_path)
                if not os.path.exists(dest_dir_path):
                    os.makedirs(dest_dir_path)

                # Check if file already exists in destination
                if not os.path.exists(dest_file_path) or os.path.getmtime(src_file_path) > os.path.getmtime(dest_file_path):
                    shutil.copy2(src_file_path, dest_file_path)
                    print(f"File {file} has been backed up to {dest_file_path}.")
                else:
                    print(f"File {file} is already up to date.")
def count_image_files(directory_path, image_extensions):
    image_count = 0

    for root, dirs, files in os.walk(directory_path):
        for file in files:
            for ext in image_extensions:
                if file.lower().endswith(ext):
                    image_count += 1

    return image_count

def check_images(directory):
    if not os.path.isdir(directory):
        return "Provided path is not a directory."

    results = {
        "0_byte_files": [],
        "corrupted_files": []
    }

    # Supported image formats
    image_formats = ('.png', '.webp', '.jpg', '.jpeg')

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(image_formats):
                file_path = os.path.join(root, file)

                # Check if file is 0 bytes
                if os.path.getsize(file_path) == 0:
                    results["0_byte_files"].append(file_path)
                else:
                    # Check if file is corrupted
                    try:
                        img = Image.open(file_path)
                        img.verify()
                    except Exception as e:
                        results["corrupted_files"].append(file_path)

    return results

def valid_dir(image_dir):
    if image_dir == "":
        return input("Enter the path to the image directory: ").strip('\'"')
    else:
        use_previous_dir = input("Use previous directory? (y/n): ")
        if use_previous_dir == "n":
            return input("Enter the path to the image directory: ").strip('\'"')
        else:
            print("Using previous directory...")
            return image_dir

def get_directory_size(directory_path):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(directory_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            if os.path.exists(fp):
                total_size += os.path.getsize(fp)

    return total_size / (1024 ** 2)


if __name__ == "__main__":
    while 1:
        image_dir = ""

        convert_option = input(
            "Convert to webp (1)\nConvert to png (2)\nBackup Directory in Full (Don't) (3)\nChange Directory (4)\nCheck for 0 Byte/Corrupted Images (5)\nQuit (6)? ")

        if convert_option == "1":
            image_dir = valid_dir(image_dir)

            image_quality = input("Enter the image quality (1-100), 87 is Default: ")
            if image_quality == "":
                image_quality = "87"

            image_extensions = ['.png', '.jpg', '.jpeg', '.bmp']
            if input("Ignore .webp files? Yes is default (y/n): ").lower() == "n":
                image_extensions.append('.webp')

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
            image_dir = valid_dir(image_dir)

            print(check_images(image_dir))

        elif convert_option == "6":
            break
