import { useState, useRef } from "react"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"

type ImageUploaderProps = {
  uploadImageInForm: (imgURL: string) => void
}

const ImageUploader = ({ uploadImageInForm }: ImageUploaderProps) => {
  const [imgURL, setImgURL] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    inputFileRef.current?.click();
  }

  const uploadImageDisplay = () => {
    if (!inputFileRef.current?.files) return;

    const uploadedFile = inputFileRef.current.files[0];
    // const cashedURL = URL.createObjectURL(uploadedFile);

    // setImgURL(cashedURL);
    // uploadImageInForm(cashedURL);
  
    const reader = new FileReader();

    reader.onload = () => {
      const base64ImgString = reader.result as string;
      setImgURL(base64ImgString);
      uploadImageInForm(base64ImgString);
    }

    reader.readAsDataURL(uploadedFile);
  }

  return (
    <>
      <img
        src={imgURL}
        alt="Imagem do produto"
        className={`${imgURL ? "block" : "hidden"} object-cover min-h-[200px] z-10`}
      />
      <div className="absolute z-20 bottom-0 flex gap-4">
        <button
          type="button"
          onClick={handleImageUpload}
          className={`${imgURL ? "block" : "hidden"} bg-orange px-4 text-white text-lg rounded-t-md w-fit p-1 shadow-custom-01`}
        >
          <FaEdit />
        </button>
        <button
          type="button"
          onClick={() => setImgURL("")}
          className={`${imgURL ? "block" : "hidden"} bg-orange px-4 text-white text-lg rounded-t-md w-fit p-1 shadow-custom-01`}
        >
          <FaTrash />
        </button>
      </div>
      <div className='absolute bg-gray-300 text-gray-600 cursor-pointer flex flex-col items-center justify-center w-full h-full'>
        <button
          type="button"
          onClick={handleImageUpload}
          className="flex flex-col items-center gap-2 border-2 border-dashed border-gray-700 rounded-md p-2"
        >
          <FaPlus className="text-4xl" />
          <span className="break-words w-[80px] text-center">Adicionar Imagem (opcional)</span>
        </button>
        <input
          type="file"
          hidden
          ref={inputFileRef}
          onChange={uploadImageDisplay}
          name="image-input"
          id="image-input"
        />
      </div>
    </>
  )
}

export default ImageUploader