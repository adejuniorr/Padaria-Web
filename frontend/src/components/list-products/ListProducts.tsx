import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import { TiThSmallOutline } from 'react-icons/ti';
import { MdOutlineBakeryDining } from 'react-icons/md';
import { RiCake3Line } from 'react-icons/ri';
import { PiBreadFill } from 'react-icons/pi';

type Product = {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  img?: string;
  imgAlt?: string;
};



export default function ListProducts() {
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
  const navigate = useNavigate();

  useEffect(() => { // TODO: refactoring (SOLID principles)
    axios.get('http://localhost:8000/api/produtos')
      .then((res) => {
        const response = res.data;

        if (response.success) {
          setProducts(response.data);
        }
      });
  }, []);

  const handleDelete = async (id: number) => { // TODO: refactoring (SOLID principles)
    if (confirm('Deseja realmente excluir esse produto?')) {
      await axios.delete(`http://localhost:8000/api/produtos/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  return (// TODO: refactoring (break into smaller components)
    <main className='px-4 py-4 h-screen overflow-hidden'>
      <h1 className='font-pacifico text-orange text-center mb-6'>Estoque</h1>
      <span className='flex gap-2 shadow-custom-01 rounded-md px-4 py-3 bg-white mb-6'>
        <input type="text" placeholder='Pesquisar por nome' className='w-full outline-none' />
        <CiSearch className='text-2xl' />
      </span>
      <div className='flex flex-col gap-4 items-center'>
        <p className='font-pacifico text-orange text-2xl self-start'>
          Categorias: Todos
        </p>
        <div className='flex items-center justify-between w-full'>
          {categories.map((category) => (
            <button key={category.name} onClick={() => setSelectedCategory(category.name)} className={`flex items-center gap-2 p-4 rounded-full border-2 border-white text-2xl shadow-custom-01 ${selectedCategory === category.name ? "bg-orange text-white" : "bg-white text-brown"}`}>
              {category.icon}
            </button>
          ))}
        </div>
        <small><i>Toque no produto para ver mais detalhes</i></small>
        <hr className='w-full border-2 border-orange mb-4' />
      </div>
      <ul className='flex flex-col gap-5 h-[302px]  overflow-y-scroll px-3 py-2 pb-4'>
        {products.map((product) => (
          <li key={product.id}>
            <div className='bg-white h-full rounded-md overflow-hidden shadow-custom-01 flex items-center justify-between'>
              <div className='w-[40%] h-full flex items-center justify-center bg-gray-300'>
                {product.img ? (
                  <img src={product.img} alt={product.imgAlt} />
                ) : (
                  <p className='text-4xl text-brown'>{product.nome[0]}</p>
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
              <div className='sm:flex flex-col gap-2 hidden'>
                <button onClick={() => navigate(`/editar/${product.id}`)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>Excluir</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
