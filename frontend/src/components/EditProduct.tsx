import { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const schema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  categoria: z.enum(['Pães', 'Doces', 'Salgados'], { required_error: "A categoria é obrigatória", description: "Categoria inválida" }),
  descricao: z.string().optional(),
  preco: z.number().positive("O preço deve ser positivo").min(0.01, "O preço deve ser maior que zero")
});

type ProductForm = z.infer<typeof schema>;

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/produtos/${id}`)
      .then((res) => {
        const response = res.data;

        if (response.success) {
          const product = response.data;

          setValue('nome', product.nome);
          setValue('categoria', product.categoria);
          setValue('descricao', product.descricao);
          setValue('preco', product.preco);
        }
      });
  }, [id, setValue]);

  const onSubmit = async (data: ProductForm) => {
    await axios.put(`http://localhost:8000/api/produtos/${id}`, data);
    navigate('/');
  };

  return (
    <div>
      <h1>Editar Produto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome</label>
          <input type="text" {...register('nome')} />
          {errors.nome && <span>{errors.nome.message}</span>}
        </div>
        <div>
          <label>Categoria</label>
          <select {...register('categoria')}>
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
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
