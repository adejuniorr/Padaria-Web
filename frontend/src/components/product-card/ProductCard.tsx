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
    <div className='w-[72vw] md:max-w-[400px] lg:max-w-[290px]  xl:max-w-[400px] min-h-[210px] bg-gray-300 rounded-md overflow-hidden shadow-custom-01 flex z-10'>
      <div className='relative w-[40%] flex items-center justify-center'>
        <div className="flex items-center justify-center">
          {changing ? (
            <ImageUploader onImageChange={onImageChange!} />
          ) : product.imagem ? (
            <img src={product.imagem} alt="Imagem meramente ilustrativa do produto" />
          ) : (
            <p className='text-4xl text-brown font-bold'>{product.nome[0]}</p>
          )}
        </div>
      </div>
      <div className='w-[60%] bg-white p-2'>
        <p className='font-bold text-xl mb-2'>{product.nome}</p>
        <p className='flex items-center gap-1 rounded-full bg-orange text-brown bg-opacity-70 w-fit px-2 mb-2'>
          {categories.find((category) => category.name === product.categoria)?.icon}
          {product.categoria}
        </p>
        <p className="break-words line-clamp-2"><i>{product.descricao}</i></p>
        <br />
        <p className='font-bold text-xl'>
          <i>R$ {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 },)}</i>
        </p>
      </div>
    </div>
  )
}
