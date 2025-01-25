import { createContext } from 'react';
import { DateRangeObject, ProductChartData } from '../../types/types';

type HandleChartsContextProps = {
  dateRange: DateRangeObject[];
  handleRangeChange: (item) => void;
  handleCreatePieChart: () => void;
  openDateRange: boolean;
  setOpenDateRange: (value: boolean) => void;
  fourBestSellers: ProductChartData[] | null;
};

export const HandleChartsContext = createContext<HandleChartsContextProps>({
  dateRange: [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }],
  handleRangeChange: () => { },
  handleCreatePieChart: () => { },
  openDateRange: false,
  setOpenDateRange: () => { },
  fourBestSellers: null
});