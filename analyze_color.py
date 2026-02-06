from PIL import Image
from collections import Counter

def analyze_image(image_path):
    try:
        img = Image.open(image_path)
        width, height = img.size
        print(f"Size: {width}x{height}")
        
        # Sample points
        points = [
            (0, 0), (width-1, 0), (0, height-1), (width-1, height-1),
            (width//2, 10), (width//2, height-10),
            (10, height//2), (width-10, height//2),
            (width//2, height//2)
        ]
        
        print("Sampled pixels:")
        for p in points:
            try:
                c = img.getpixel(p)
                print(f"{p}: {c}")
            except:
                pass
                
    except Exception as e:
        print(f"Error: {e}")

path = "c:/Users/LENOVO/Documents/greentea/sequence/ezgif-frame-001.jpg"
analyze_image(path)
