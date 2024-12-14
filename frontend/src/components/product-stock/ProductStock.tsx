import useProductStock from '../../hooks/useProductStock';
import { SearchInput } from '../inputs/SearchInput';
import { CategorySelector } from './category-selector/CategorySelector';
import { ProductList } from './product-list/ProductList';

export default function ProductStock() {
  const {
    filteredProducts,
    handleSearch,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useProductStock();

  /* const handleDelete = async (id: number) => { // TODO: refactoring (SOLID principles)
    if (confirm('Deseja realmente excluir esse produto?')) {
      await axios.delete(`http://localhost:8000/api/produtos/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  }; */

  return (// TODO: substituir tag main por div
    <main className='pb-4 h-screen'>
      <h2 className='font-pacifico text-orange text-center py-4'>
        Estoque
      </h2>
      <SearchInput handleSearch={handleSearch} />
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className='flex flex-col items-center gap-2 mt-4'>
        <p><i>Toque no produto para ver mais detalhes</i></p>
        <hr className='w-full border-2 border-orange mb-3' />
      </div>
      <ProductList
        products={filteredProducts}
        categories={categories}
      />
    </main>
  );
}
