import { useState } from "react";
import { ProductChartData, ProductResponse } from "../types/types";
import { getAllProducts } from "../services/getAllProducts";
import { CATEGORIES } from '../constants/categories';

export const useProductCharts = () => {
  const [loadingDropdown, setLoadingDropdown] = useState<boolean>(false);
  const [loadingChartData, setLoadingChartData] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [productsFound, setProductsFound] = useState<ProductResponse[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [productData, setProductData] = useState<ProductChartData[] | null>([
    { qtd_vendida: 0, mes: 'Jul' },
    { qtd_vendida: 0, mes: 'Ago' },
    { qtd_vendida: 0, mes: 'Set' },
    { qtd_vendida: 0, mes: 'Out' },
    { qtd_vendida: 0, mes: 'Nov' },
    { qtd_vendida: 0, mes: 'Dez' },
  ]);

  const handleCreateLineChart = async (search: string) => {
    if (search.length < 3) {
      setOpenDropdown(false);
      setProductsFound([]);
      setSelectedProduct('');
      setProductData([
        { qtd_vendida: 0, mes: 'Jul' },
        { qtd_vendida: 0, mes: 'Ago' },
        { qtd_vendida: 0, mes: 'Set' },
        { qtd_vendida: 0, mes: 'Out' },
        { qtd_vendida: 0, mes: 'Nov' },
        { qtd_vendida: 0, mes: 'Dez' },
      ]);

      return;
    }

    setLoadingDropdown(true);
    setOpenDropdown(true);

    const products = await getAllProducts();

    setProductsFound(products.filter((product) => product.nome.toLowerCase().includes(search.toLowerCase())));

    setLoadingDropdown(false);
  }

  return {
    productData,
    handleCreateLineChart,
    productsFound,
    openDropdown,
    setOpenDropdown,
    loadingDropdown,
    setProductData,
    categories: CATEGORIES,
    selectedProduct,
    setSelectedProduct,
    loadingChartData,
    setLoadingChartData,
  }
}
