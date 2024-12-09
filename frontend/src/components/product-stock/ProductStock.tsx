import { Product } from '../../types/types';
import { SearchInput } from '../inputs/SearchInput';
import { CategorySelector } from './category-selector/CategorySelector';
import { ProductList } from './product-list/ProductList';
import { useState, useEffect } from 'react';
import { TiThSmallOutline } from 'react-icons/ti';
import { PiBreadFill } from 'react-icons/pi';
import { RiCake3Line } from 'react-icons/ri';
import { MdOutlineBakeryDining } from 'react-icons/md';
import axios from 'axios';

export default function ProductStock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const categories = [
    {
      name: 'Todos',
      icon: <TiThSmallOutline />,
    },
    {
      name: 'Pães',
      icon: <PiBreadFill />,
    },
    {
      name: 'Doces',
      icon: <RiCake3Line />,
    },
    {
      name: 'Salgados',
      icon: <MdOutlineBakeryDining />,
    },
  ]

  useEffect(() => { // TODO: refactoring (SOLID principles)
    axios.get('http://localhost:8000/api/produtos')
      .then((res) => {
        const response = res.data;

        if (response.success) {
          setProducts(response.data);
        }
      });
  }, []);

  /* const handleDelete = async (id: number) => { // TODO: refactoring (SOLID principles)
    if (confirm('Deseja realmente excluir esse produto?')) {
      await axios.delete(`http://localhost:8000/api/produtos/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  }; */

  return (// TODO: substituir tag main por div
    <main className='py-4 h-screen'>
      <h2 className='font-pacifico text-orange text-center mb-6'>
        Estoque
      </h2>
      <SearchInput />
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className='flex flex-col items-center gap-2 mt-4'>
        <small><i>Toque no produto para ver mais detalhes</i></small>
        <hr className='w-full border-2 border-orange mb-3' />
      </div>
      <ProductList
        products={products}
        categories={categories}
      />
    </main>
  );
}
