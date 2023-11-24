import { fetchChartData } from "../api";
import { useQuery } from "@tanstack/react-query";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { themeState } from "../atoms";

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

const CandleStick = ({ coinId }: IChart) => {
  const { isLoading, data } = useQuery<IChartDetail[]>(["Chart", coinId], () =>
    fetchChartData(coinId)
  );
  const isDark = useRecoilValue(themeState);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: data?.map((price) => ({
                x: price.time_close,
                y: [price.open, price.high, price.low, price.close],
              })) as any[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                tools: {},
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
              },
            },
            xaxis: {
              labels: {
                show: false,
                datetimeFormatter: {
                  month: "mmm yy",
                },
              },
              type: "datetime",
              categories: data?.map((data) => data.time_close),
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (v) => `${v.toFixed(3)}`,
              },
            },
          }}
        ></ApexCharts>
      )}
    </>
  );
};

export default CandleStick;
