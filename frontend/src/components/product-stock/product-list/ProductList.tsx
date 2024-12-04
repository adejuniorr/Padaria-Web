import { Category, Product } from "../../../types/types";
import { useNavigate } from 'react-router-dom';
import { ProductCard } from "../../cards/ProductCard";

type ProductListProps = {
  products: Product[],
  categories: Category[],
}

export const ProductList = ({ products, categories }: ProductListProps) => {
  const navigate = useNavigate();

  return (
    <ul className='flex flex-col gap-5 h-[62vh] overflow-y-scroll px-3 py-2 pb-4'>
      {products.map((product) => (
        <li key={product.id} onClick={() => navigate(`/produto/${product.id}`)} className="cursor-pointer">
          <ProductCard
            product={product}
            categories={categories}
          />
        </li>
      ))}
    </ul>
  )
}
