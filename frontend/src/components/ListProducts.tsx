import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

type Product = {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
};

export default function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/produtos')
      .then((res) => {
        const response = res.data;

        if (response.success) {
          setProducts(response.data);
        }
      });
  }, []);

  const handleDelete = () => {
    alert('Implementar [DELETE]');
  };

  return (
    <>
      <div className='mb-4'>
        <h1>Lista de Produtos</h1>
        <Link to="/cadastro">Cadastrar Novo Produto</Link>
      </div>
      <ul className='flex flex-col gap-2 h-[70vh] overflow-y-scroll p-2'>
        {products.map((product) => (
          <li key={product.id} className='p-2 bg-gray-900 rounded-md flex items-center justify-between'>
            <div>
              <p className='font-bold text-xl'>{product.nome}</p>
              <p>{product.categoria}</p>
              <br />
              <p className='font-bold text-xl'>R$ {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 },)}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <button onClick={() => navigate(`/editar/${product.id}`)}>Editar</button>
              <button onClick={() => handleDelete()}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
