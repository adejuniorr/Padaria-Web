import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const schema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  categoria: z.enum(['Pães', 'Doces', 'Salgados'], { errorMap: () => ({ message: 'Selecione uma categoria' }) }),
  descricao: z.string().optional(),
  preco: z
    .string()
    .max(6, 'O preço deve ser abaixo de R$ 1000,00')
    .regex(/^\d+(.\d{1,2})?$/, 'Valor inválido (ex. R$ 10,25)')
    .transform((val) => parseFloat(val.replace(',', '.'))),
});

type ProductForm = z.infer<typeof schema>;

export default function CreateProduct() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: ProductForm) => {
    await axios.post('http://localhost:8000/api/produtos', data);
    navigate('/');
  };

  return (
    <div>
      <h1>Cadastro de Produto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome</label>
          <input type="text" {...register('nome')} />
          {errors.nome && <span>{errors.nome.message}</span>}
        </div>
        <div>
          <label>Categoria</label>
          <select {...register('categoria')}>
            <option value="Selecionar">Selecionar</option>
            <option value="Pães">Pães</option>
            <option value="Doces">Doces</option>
            <option value="Salgados">Salgados</option>
          </select>
          {errors.categoria && <span>{errors.categoria.message}</span>}
        </div>
        <div>
          <label>Descrição</label>
          <textarea {...register('descricao')} />
        </div>
        <div>
          <label>Preço</label>
          <input type="number" step="0.01" {...register('preco')} />
          {errors.preco && <span>{errors.preco.message}</span>}
        </div>
        <button type="submit">Cadastrar</button>
        <Link to="/">Voltar</Link>
      </form>
    </div>
  );
}
