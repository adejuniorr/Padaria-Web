import { Category, ProductResponse } from "../../../types/types";
import { useNavigate } from 'react-router-dom';
import { ProductCard } from "../../product-card/ProductCard";
import ProductCardSkeleton from "../../product-card/ProductCardSkeleton";

type ProductListProps = {
  loading?: boolean,
  products: ProductResponse[],
  categories: Category[],
}

export const ProductList = ({ loading, products, categories }: ProductListProps) => {
  const navigate = useNavigate();

  return (
    <ul className='flex flex-wrap justify-center gap-5 h-[385px] overflow-y-scroll w-full px-1 py-2 pb-4'>
      {loading ? (
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      ) : (
        products.map((product) => (
          <li key={product.id} onClick={() => navigate(`/produto/${product.id}`)} className="cursor-pointer">
            <ProductCard
              product={product}
              categories={categories}
            />
          </li>
        ))
      )}
    </ul>
  )
}
