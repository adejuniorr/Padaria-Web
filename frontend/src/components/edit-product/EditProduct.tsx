import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProductForm } from '../../hooks/useProductForm';
import { useContext, useEffect, useState } from 'react';
import { CreateProductContext } from '../../contexts/create-product-ctx/CreateProductContext';
import { InputField } from '../inputs/InputField';
import { ProductCard } from '../product-card/ProductCard';
import { TiThSmallOutline } from 'react-icons/ti';
import { PiBreadFill } from 'react-icons/pi';
import { RiCake3Line } from 'react-icons/ri';
import { MdOutlineBakeryDining } from 'react-icons/md';
import { Button } from '../buttons/Button';
import { FaArrowLeft, FaRegCheckCircle } from 'react-icons/fa';
import Warning from '../warning/Warning';
import { CgSpinner } from 'react-icons/cg';
import { AiFillDelete } from 'react-icons/ai';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, setValue, handleSubmit, formState: { errors } } = useProductForm();
  const categories = [
    { name: 'Todos', icon: <TiThSmallOutline /> },
    { name: 'Pães', icon: <PiBreadFill /> },
    { name: 'Doces', icon: <RiCake3Line /> },
    { name: 'Salgados', icon: <MdOutlineBakeryDining /> },
  ];
  const [openWarning, setOpenWarning] = useState<boolean>(false);
  const {
    pageLoading,
    setPageLoading,
    price,
    setPrice,
    openAlertWarning,
    setOpenAlertWarning,
    openErrorWarning,
    setOpenErrorWarning,
    errorWarningMessage,
    onSubmitUpdate,
    productRequest,
    setProductRequest,
    productResponse,
    setProductResponse,
    handleNameChange,
    handlePriceChange,
    handleCategoryChange,
    handleDescriptionChange,
    handleDeleteProduct,
  } = useContext(CreateProductContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/produtos/${id}`)
      .then((res) => {
        const response = res.data;

        if (response.success) {
          const produto = response.produto;

          setValue("nome", produto.nome);
          setValue("preco", produto.preco);
          setValue("categoria", produto.categoria);
          setValue("descricao", produto.descricao);

          setProductResponse(produto);
          setPrice(
            "R$ " + produto.preco.toLocaleString(
              'pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }
            )
          );
        }
      });
  }, [id, setPrice, setProductResponse, setValue]);

  useEffect(() => {
    if (productResponse.preco !== 0) setLoading(false);
  }, [productResponse]);

  const onImageChange = (file: File | null) => {
    if (file) {
      setProductRequest({ ...productRequest, imagem: file });
      setValue("imagem", file);
    } else {
      setProductRequest({ ...productRequest, imagem: undefined });
      setValue("imagem", null);
    }
  };

  return (
    <>
      {pageLoading ? (
        <div className='flex items-center justify-center h-screen'>
          <h1 className='text-3xl text-brown font-pacifico flex flex-row gap-2'>
            <CgSpinner className='animate-spin' /> Carregando
          </h1>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmitUpdate)}
          className='bg-vanilla flex flex-col gap-8 justify-center items-center mx-auto'
        >
          <h2 className='text-brown text-center mt-6 font-pacifico w-[60%]'>
            Detalhes do Produto
          </h2>
          <div className='relative w-fit flex flex-col items-center justify-center mx-auto'>
            <span className='block font-pacifico text-xl bg-orange text-white rounded-t-lg px-4 pt-1 pb-2 relative top-1 z-10 w-fit self-start'>
              Prévia
            </span>
            <ProductCard
              product={productResponse}
              categories={categories}
              prevImg={productResponse.imagem}
              onImageChange={onImageChange}
              editing={isEditing}
              loading={loading}
            />
            <span>{errors.imagem && <i>{errors.imagem.message?.toString()}</i>}</span>
          </div>
          <div className='w-full flex flex-col gap-4 px-6'>
            <InputField
              label='Nome'
              error={errors.nome}
              loading={loading}
              input={
                <input
                  type="text"
                  value={productResponse.nome}
                  {...register('nome')}
                  onChangeCapture={handleNameChange}
                  placeholder='Digite o nome do produto'
                  className='outline-none w-full disabled:text-gray-600 disabled:cursor-not-allowed'
                  disabled={isEditing ? false : true}
                />
              }
            />
            <InputField
              label='Preço'
              error={errors.preco}
              loading={loading}
              input={
                <input
                  type="text"
                  value={price}
                  {...register('preco')}
                  onChangeCapture={handlePriceChange}
                  placeholder='Digite o preço (apenas números)*'
                  className='outline-none w-full disabled:text-gray-600 disabled:cursor-not-allowed'
                  disabled={isEditing ? false : true}
                />
              }
            />
            <InputField
              label='Categoria'
              error={errors.categoria}
              loading={loading}
              input={
                <select
                  value={productResponse.categoria}
                  {...register('categoria')}
                  onChangeCapture={handleCategoryChange}
                  className='outline-none w-full cursor-pointer bg-white disabled:text-gray-600 disabled:cursor-not-allowed'
                  disabled={isEditing ? false : true}
                >
                  <option value="Selecionar">Selecionar</option>
                  <option value="Pães">Pães</option>
                  <option value="Doces">Doces</option>
                  <option value="Salgados">Salgados</option>
                </select>
              }
            />
            <InputField
              label='Descrição'
              vertical
              error={errors.descricao}
              loading={loading}
              input={
                <textarea
                  rows={3}
                  value={productResponse.descricao}
                  {...register('descricao')}
                  placeholder='Digite aqui uma breve descrição sobre o produto (opcional)'
                  onChangeCapture={handleDescriptionChange}
                  className='outline-none w-full resize-none disabled:text-gray-600 disabled:cursor-not-allowed'
                  disabled={isEditing ? false : true}
                />
              }
            />
          </div>
          <div className='flex flex-col items-center gap-4 sticky bottom-0 z-40 bg-vanilla border border-black pt-4 rounded-t-[2rem] bg-none w-full'>
            <Button type={isEditing ? 'button' : 'submit'} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Salvar Alterações' : 'Editar Produto'}
            </Button>
            {isEditing && (
              <Button
                type='button'
                bgColor='bg-orange'
                onClick={() => {
                  location.reload();
                  setIsEditing(false)
                }}
              >
                Cancelar
              </Button>
            )}
            <Button type='button' bgColor='bg-brown' onClick={() => setOpenWarning(true)}>
              Excluir Produto
            </Button>
            <Link to="/" className='flex items-center gap-2 text-xl mx-auto pb-4 hover:underline focus:underline focus:outline-none'>
              <FaArrowLeft /> Voltar
            </Link>
          </div>
        </form>
      )}
      {openWarning && (
        <Warning
          open
          type='confirm'
          warningMessage={`Por favor, confirme se você deseja excluir ${productResponse.nome}`}
          denyButtonMessage="Não, voltar para edição"
          confirmButtonMessage="Sim, excluir produto"
          onConfirmClose={handleDeleteProduct}
          onDenyClose={() => setOpenWarning(false)}
          icon={<AiFillDelete />}
        />
      )}
      {openAlertWarning && (
        <Warning
          open
          type='alert'
          warningMessage={`Produto atualizado com sucesso! Você será redirecionado para a página inicial.`}
          denyButtonMessage="Ok, prosseguir"
          onDenyClose={() => {
            setOpenAlertWarning(false);
            setPageLoading(false);
            navigate('/');
          }}
          icon={<FaRegCheckCircle />}
        />
      )}
      {openErrorWarning && (
        <Warning
          open
          type='alert'
          warningMessage={errorWarningMessage}
          denyButtonMessage='Voltar'
          onDenyClose={() => {
            setOpenErrorWarning(false);
            setPageLoading(false);
          }}
        />
      )}
    </>
  );
}
