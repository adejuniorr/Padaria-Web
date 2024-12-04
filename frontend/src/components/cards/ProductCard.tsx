import { Category, Product } from "../../types/types"

type ProductCardProps = {
  product: Product,
  categories: Category[],
}

export const ProductCard = ({ product, categories }: ProductCardProps) => {
  return (
    <div className='bg-white h-full rounded-md overflow-hidden shadow-custom-01 flex items-center justify-between'>
      <div className='w-[40%] h-full flex items-center justify-center bg-orange'>
        {product.img ? (
          <img src={product.img} alt={product.imgAlt} />
        ) : (
          <p className='text-4xl text-brown font-bold'>{product.nome[0]}</p>
        )}
      </div>
      <div className='w-[60%] h-fit p-2'>
        <p className='font-bold text-xl mb-2'>{product.nome}</p>
        <p className='flex items-center gap-1 rounded-full bg-orange bg-opacity-70 w-fit px-2 mb-2'>
          {categories.find((category) => category.name === product.categoria)?.icon}
          {product.categoria}
        </p>
        <p><i>{product.descricao}</i></p>
        <br />
        <p className='font-bold text-xl'>
          <i>R$ {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 },)}</i>
        </p>
      </div>
    </div>
  )
}
