import { FaPlus } from "react-icons/fa"
import { Category, Product } from "../../types/types"

type ProductCardProps = {
  product: Product,
  categories: Category[],
  changing?: boolean,
}

export const ProductCard = ({ product, categories, changing }: ProductCardProps) => {
  return (
    <div className='sm:w-[400px] min-h-[200px] bg-orange rounded-md overflow-hidden shadow-custom-01 flex items-center justify-between'>
      <div className='relative w-[40%] min-h-[200px]'>
        {changing && (
          <div className='absolute z-10 bg-gray-600 opacity-0 hover:opacity-75 cursor-pointer w-full h-full flex flex-col items-center justify-center'>
            <FaPlus className="text-5xl" />
            <span className="break-words w-[50%] text-center">Adicionar Imagem</span>
          </div>
        )}
        <div className="flex items-center justify-center min-h-[200px]">
          {product.img ? (
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
