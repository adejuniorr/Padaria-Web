import React, { useState } from "react"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"

type ImageUploaderProps = {
  onImageChange: (file: File | null) => void; // Callback para passar a imagem para o formulário pai
}

const ImageUploader = ({ onImageChange }: ImageUploaderProps) => {
  const [imgURL, setImgURL] = useState<string>("");

  const uploadImageDisplay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const cachedURL = URL.createObjectURL(uploadedFile);
      setImgURL(cachedURL);
      onImageChange(uploadedFile); // Passa o arquivo para o pai
    }
  };

  const handleImageDelete = () => {
    setImgURL("");
    onImageChange(null); // Remove o arquivo
  };

  return (
    <div>
      {imgURL && (
        <img
          src={imgURL}
          alt="Imagem do produto"
          className="block object-cover min-h-[212px] z-10"
        />
      )}
      <div className="flex gap-4">
        {imgURL && (
          <>
            <label htmlFor="image-input" className="bg-orange px-3 text-white text-lg rounded-t-md">
              <FaEdit />
            </label>
            <button type="button" onClick={handleImageDelete} className="bg-orange px-3 text-white text-lg rounded-t-md">
              <FaTrash />
            </button>
          </>
        )}
      </div>
      {!imgURL && (
        <div className="absolute bg-gray-300 text-gray-600 cursor-pointer flex flex-col items-center justify-center w-full h-full">
          <label htmlFor="image-input" className="flex flex-col items-center gap-2 border-2 border-dashed border-gray-700 rounded-md p-2">
            <FaPlus className="text-4xl" />
            <span>Adicionar Imagem</span>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              hidden
              onChange={uploadImageDisplay}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
