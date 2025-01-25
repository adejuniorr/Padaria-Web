import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ProductLineChartProps } from '../../types/types';

export const ProductLineChart = ({ productChartData }: ProductLineChartProps) => {
  return (
    <LineChart
      width={540}
      height={300}
      data={productChartData}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="mes" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="qtd_vendida" name='Quantidade vendida' stroke="orange" activeDot={{ r: 8 }} />
    </LineChart>
  );
}