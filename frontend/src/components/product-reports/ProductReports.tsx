import { useProductCharts } from "../../hooks/useProductCharts";
import { getProductSalesData } from "../../services/getProductSalesData";
import { ProductChartData } from "../../types/types";
import { ProductLineChart } from "../charts/ProductLineChart";
import { ProductPieChart } from "../charts/ProductPieChart";
import { SearchInput } from "../inputs/SearchInput";
import { DateRangePicker } from "../calendar/DateRangePicker";
import { Button } from "../buttons/Button";
import { useContext } from "react";
import { HandleChartsContext } from "../../contexts/charts/HandleChartsContext";

export const ProductReports = () => {
  const {
    productData,
    productsFound,
    handleCreateLineChart,
    loadingDropdown,
    openDropdown,
    setOpenDropdown,
    setProductData,
    selectedProduct,
    setSelectedProduct,
    categories,
    loadingChartData,
    setLoadingChartData,
  } = useProductCharts();

  const {
    handleCreatePieChart,
    fourBestSellers,
    openDateRange,
    setOpenDateRange
  } = useContext(HandleChartsContext);

  return (
    <div className='p-4 h-screen'>
      <h2 className='font-pacifico text-orange text-center mb-8 pt-4 w-[80%] mx-auto'>
        Relatório de Vendas
      </h2>
      <div className="relative max-w-[700px] mb-8 mx-auto flex flex-col gap-4">
        <SearchInput handleSearch={handleCreateLineChart} />
        {openDropdown && (
          <div className={`absolute z-10 top-10 w-fit pt-6 pb-4 shadow-custom-01 shadow-gray-300 rounded-b-xl ${loadingChartData ? "pointer-events-none bg-gray-100" : "bg-white"}`}>
            {loadingDropdown ? (
              <ul>
                <li className="py-2 px-8">
                  Carregando...
                </li>
              </ul>
            ) : (
              <ul className='flex flex-col'>
                {productsFound.map((product) => (
                  <li
                    key={product.id}
                    onClick={async () => {
                      // TODO: fazer requisição na api para puxar dados de pedidos nos últimos 6 meses
                      setLoadingChartData(true);
                      try {
                        const productSalesData: ProductChartData[] = await getProductSalesData(product.id);

                        setProductData(productSalesData);
                        setSelectedProduct(product.nome);
                        setOpenDropdown(false);
                        setLoadingChartData(false);
                      } catch (error) {
                        setLoadingChartData(false);
                        alert('Erro ao buscar dados de vendas do produto');
                        console.log(error);
                      }
                    }}
                    className={`flex items-center gap-2 py-2 px-8 text-lg ${loadingChartData ? "text-gray-400" : "cursor-pointer text-brown hover:bg-gray-100 hover:text-orange"}`}
                  >
                    {categories.find((category) => category.name === product.categoria)?.icon}
                    {product.nome}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <p className="text-gray-400 font-bold">Pesquise pelo nome e selecione um produto para ver o seu desempenho semestral</p>
      </div>
      <div className="w-[90vw] max-w-[600px] overflow-hidden bg-white shadow-custom-01 shadow-gray-400 rounded-lg p-4 mx-auto">
        <h4 className="font-bold text-xl text-start">Desempenho Semestral (últimos 6 meses)</h4>
        <p className="font-bold text-3xl text-orange mt-2">{selectedProduct || "Selecione um produto"}</p>
        <br />
        <div className="overflow-x-scroll">
          <ProductLineChart productChartData={productData!} />
        </div>
      </div>
      <div className="mt-16 text-center">
        <p className="hidden sm:block text-gray-400 font-bold">Selecione um período no calendário abaixo para ver os 4 produtos mais vendidos</p>
        <p className="sm:hidden text-gray-400 font-bold">Toque no botão para selecionar um período e ver os 4 produtos mais vendidos</p>
        <div className="relative flex sm:flex-row flex-col justify-center align-center mt-4">
          <div className="hidden sm:flex flex-col relative top-4 sm:left-2 h-fit bg-white rounded-lg p-4 shadow-custom-01 shadow-gray-400">
            <DateRangePicker />
            <Button
              type="button"
              onClick={handleCreatePieChart}
            >
              Confirmar
            </Button>
          </div>
          {/* Dante range para versão mobile */}
          <div className="sm:hidden w-fit mx-auto left-0 right-0 mb-6">
            <Button
              type="button"
              onClick={() => setOpenDateRange(!openDateRange)}
            >
              Selecionar Período
            </Button>
          </div>
          {openDateRange && (
            <div className="sm:hidden fixed w-full h-screen bg-black bg-opacity-50 top-0 left-0 z-50 flex flex-col items-center justify-center gap-4">
              <div className="mx-4 bg-white rounded-lg p-4 shadow-custom-01 shadow-gray-400 flex flex-col gap-4">
                <DateRangePicker />
                <Button
                  type="button"
                  onClick={handleCreatePieChart}
                >
                  Confirmar
                </Button>
                <Button
                  bgColor="bg-brown"
                  type="button"
                  onClick={() => setOpenDateRange(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
          <div className="w-fit min-h-[500px] sm:mx-0 mx-auto sm:z-20 bg-white mb-16 rounded-lg p-4 shadow-custom-01 shadow-gray-400">
            <h4 className="font-bold text-center text-xl">Os 4 Mais Vendidos</h4>
            <ProductPieChart productChartData={fourBestSellers!} />
          </div>
        </div>
      </div>
    </div>
  );
}
