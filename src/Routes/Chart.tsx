import { fetchChartData } from "../api";
import { useQuery } from "@tanstack/react-query";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

// interface

interface IChart {
  coinId: string;
}

interface IChartDetail {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: 0;
}

const Chart = ({ coinId }: IChart) => {
  const { isLoading, data: chartData } = useQuery<IChartDetail[]>(
    ["Chart", coinId],
    () => fetchChartData(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Price",
              data: chartData?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: { show: false },
              axisTicks: {
                show: false,
              },
              categories: chartData?.map((price) =>
                Number(price.time_close)
              ) as number[],
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                gradientToColors: ["#1A73E8"],
                stops: [0, 100],
              },
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (val) => `${val.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </>
  );
};

export default Chart;
