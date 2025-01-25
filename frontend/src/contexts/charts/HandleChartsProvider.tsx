import { ReactNode, useEffect, useState } from "react";
import { HandleChartsContext } from "./HandleChartsContext";
import { getFourBestSellers } from "../../services/getFourBestSellers";
import { ProductChartData } from "../../types/types";
import { addDays } from "date-fns";

export const HandleChartsProvider = ({ children }: { children: ReactNode }) => {
  const [openDateRange, setOpenDateRange] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState([{
    startDate: addDays(new Date(), -6),
    endDate: new Date(),
    key: 'selection'
  }]);
  const [fourBestSellers, setFourBestSellers] = useState<ProductChartData[] | null>([
    { name: 'Pão Francês (unidade)', qtd_vendida: 450 },
    { name: 'Bolo de Chocolate', qtd_vendida: 300 },
    { name: 'Fatia de Torta de Morango', qtd_vendida: 250 },
    { name: 'Croissant', qtd_vendida: 150 },
  ]);

  useEffect(() => {
    (
      async () => {
        const fourBestSellers: ProductChartData[] = await getFourBestSellers(dateRange[0].startDate, dateRange[0].endDate);

        setFourBestSellers(fourBestSellers)
      }
    )();
  }, []);

  const handleRangeChange = (item) => {
    setDateRange([item.selection]);
  }

  const handleCreatePieChart = async () => {
    setOpenDateRange(false);

    try {
      const fourBestSellers: ProductChartData[] = await getFourBestSellers(dateRange[0].startDate, dateRange[0].endDate);

      setFourBestSellers(fourBestSellers);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <HandleChartsContext.Provider
      value={{
        dateRange,
        handleRangeChange,
        handleCreatePieChart,
        openDateRange,
        setOpenDateRange,
        fourBestSellers
      }}
    >
      {children}
    </HandleChartsContext.Provider>
  );
}