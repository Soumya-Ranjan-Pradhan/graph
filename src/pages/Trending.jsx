import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/chartSlice";

const Trending = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.chart);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading data: {error}</div>;
  if (!data?.by_month_year?.length) return <div>No data available</div>;

  const processedData = data.by_month_year
    .map((item) => ({
      ...item,
      date: `${item.month}-${item.year}`,
    }))
    .sort(
      (a, b) => new Date(a.year, a.month - 1) - new Date(b.year, b.month - 1)
    );

  const months = processedData.map((item) => item.date);
  const scrapQuantities = processedData.map((item) =>
    parseFloat(item.total_scrap_quantity)
  );
  const scrapValues = processedData.map((item) =>
    parseFloat(item.total_value_for_scrap)
  );

  const option = {
    title: {
      text: "MOM Trending of Scrap Value & Quantity",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Scrap Value", "Scrap Quantity"],
      left: "center",
      top: "30px",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      data: months,
      axisLabel: {
        rotate: 45,
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Scrap Value",
        type: "line",
        smooth: true,
        data: scrapValues,
        label: {
          show: true,
          position: "top",
          formatter: (params) => `₹${(params.value / 1000).toFixed(2)}k`,
        },
        itemStyle: {
          color: "orange",
        },
      },
      {
        name: "Scrap Quantity",
        type: "line",
        smooth: true,
        data: scrapQuantities,
        label: {
          show: true,
          position: "top",
          formatter: (params) => `${(params.value / 1000).toFixed(2)}k`,
        },
        itemStyle: {
          color: "black",
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      notMerge={true}
      className="chart"
      style={{ marginTop: "30px" }}
    />
  );
};

export default Trending;
