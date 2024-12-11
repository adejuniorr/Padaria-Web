import { Category, Product } from "../../types/types"
import ImageUploader from "./image-uploader/ImageUploader"

type ProductCardProps = {
  product: Product,
  categories: Category[],
  changing?: boolean,
  imageUpload?: (imgURL: string) => void
}

export const ProductCard = ({ product, categories, changing, imageUpload }: ProductCardProps) => {
  return (
    <div className='sm:w-[400px] min-h-[200px] bg-orange rounded-md overflow-hidden shadow-custom-01 flex items-center justify-between z-10'>
      <div className='relative w-[40%] min-h-[200px]'>
        <div className="flex items-center justify-center min-h-[200px]">
          {changing ? (
            <ImageUploader uploadImageInForm={imageUpload!} />
          ) : product.img ? (
            <img src={product.img} alt={product.imgAlt} />
          ) : (
            <p className='text-4xl text-brown font-bold'>{product.nome[0]}</p>
          )}
        </div>
      </div>
      <div className='w-[60%] min-h-[200px] bg-white p-2'>
        <p className='font-bold text-xl mb-2'>{product.nome}</p>
        <p className='flex items-center gap-1 rounded-full bg-orange text-brown bg-opacity-70 w-fit px-2 mb-2'>
          {categories.find((category) => category.name === product.categoria)?.icon}
          {product.categoria}
        </p>
        <p className="break-words"><i>{product.descricao}</i></p>
        <br />
        <p className='font-bold text-xl'>
          <i>R$ {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 },)}</i>
        </p>
      </div>
    </div>
  )
}
