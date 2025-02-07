from PIL import Image
from pytesseract import pytesseract
import enum
import os

class OS(enum.Enum):
    Mac = "Mac"
    Window = "Windows"  # Changed to "Windows" for consistency

class Lang(enum.Enum):
    ENG = "eng"
    # Add more languages as needed

class TextExtractor:
    def __init__(self, os_type: OS):
        print(f"Running on {os_type.value}")

        if os_type == OS.Window:
            print("Setting up Tesseract for Windows.")
            windows_path = r"D:\Codes\Projects\Final_HTM\tools\tesseract\tesseract.exe"
            if not os.path.exists(windows_path):
                raise FileNotFoundError(f"Tesseract not found at {windows_path}. Please install it and provide the correct path.")
            
            pytesseract.tesseract_cmd = windows_path
            print(f"Tesseract path set to {windows_path}")
        
        elif os_type == OS.Mac:
            print("Assuming Tesseract is installed in the PATH environment variable on Mac.")
            # Optionally add custom path for Tesseract on Mac
            # pytesseract.tesseract_cmd = '/path/to/tesseract'

    def extract_text(self, image_path: str) -> str:
        try:
            img = Image.open(image_path)
            return pytesseract.image_to_string(img, lang=Lang.ENG.value)
        except FileNotFoundError:
            return f"Image file not found: {image_path}"
        except Exception as e:
            return f"Error occurred: {str(e)}"