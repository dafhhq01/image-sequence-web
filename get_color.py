from PIL import Image
import os
from collections import Counter

def get_bg_color(image_path):
    try:
        img = Image.open(image_path)
        # Sample corners
        width, height = img.size
        corners = [
            img.getpixel((0, 0)),
            img.getpixel((width-1, 0)),
            img.getpixel((0, height-1)),
            img.getpixel((width-1, height-1))
        ]
        # Find most common color in corners
        most_common = Counter(corners).most_common(1)[0][0]
        return '#{:02x}{:02x}{:02x}'.format(most_common[0], most_common[1], most_common[2])
    except Exception as e:
        print(f"Error: {e}")
        return "#ffffff"

path = "c:/Users/LENOVO/Documents/greentea/sequence/ezgif-frame-001.jpg"
print(get_bg_color(path))
