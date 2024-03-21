import { useState } from "react";
import { toast } from "sonner";

const usePreviewImage = () => {
  const [imgURL, setImgURL] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload an image");
      setImgURL("");
    }
  };

  return {
    imgURL,
    handleImageChange,
  };
};

export default usePreviewImage;
