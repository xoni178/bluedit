import ResizeImage from "./ResizeImage.js";

const ImageReader = (e, SetException, SetImage, imageRef) => {
  const file = e.target.files[0];

  if (file) {
    if (!file.type.startsWith("image/")) {
      SetException("Only images are allowed!");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      SetException("File too large! Under 2MB is allowed.");
      return;
    }

    SetImage(file);

    ResizeImage(file, 500, 500, (resizedBlob) => {
      const resizedUrl = URL.createObjectURL(resizedBlob);
      imageRef.current.src = resizedUrl;
      imageRef.current.style.display = "block";
    });
  }
};

export default ImageReader;
