import { Category, ProductResponse } from "../../types/types"
import ImageUploader from "./image-uploader/ImageUploader"

type ProductCardProps = {
  product: ProductResponse,
  categories: Category[],
  changing?: boolean,
  onImageChange?: (file: File | null) => void; // Callback para manipular mudanças de imagem
}

export const ProductCard = ({ product, categories, changing, onImageChange }: ProductCardProps) => {
  return (
    <div className='w-[72vw] min-w-[260px] md:max-w-[400px] lg:max-w-[290px] xl:max-w-[400px] h-[210px] bg-gray-300 rounded-md overflow-hidden shadow-custom-01 flex z-50'>
      <div className='relative w-[50%] sm:w-[40%] flex items-center justify-center bg-orange'>
        <div className="flex items-center justify-center">
          {changing ? (
            <ImageUploader onImageChange={onImageChange!} />
          ) : product.imagem ? (
            <img
              src={product.imagem}
              alt="Imagem meramente ilustrativa do produto"
              className="object-cover min-h-[210px] z-10"
            />
          ) : (
            <p className='text-4xl text-brown font-bold'>{product.nome[0]}</p>
          )}
        </div>
      </div>
      <div className='w-[60%] bg-white p-3 flex flex-col justify-between'>
        <div className="flex flex-col gap-3">
          <p className='font-bold text-xl'>{product.nome}</p>
          <p className='flex items-center gap-1 rounded-full bg-orange text-brown bg-opacity-70 w-fit px-2'>
            {categories.find((category) => category.name === product.categoria)?.icon}
            {product.categoria}
          </p>
          <p className="break-words line-clamp-2"><i>{product.descricao}</i></p>
        </div>
        <p className='font-bold text-xl'>
          <i>R$ {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 },)}</i>
        </p>
      </div>
    </div>
  )
}
