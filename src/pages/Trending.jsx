import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/chartSlice";

const Trending = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.chart);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading data.</div>;
  }

  const months = data.by_month_year.map((item) => `${item.month}-${item.year}`);
  const scrapValues = data.by_month_year.map((item) =>
    parseFloat(item.total_value_for_scrap)
  );
  const scrapQuantities = data.by_month_year.map((item) =>
    parseFloat(item.total_scrap_quantity)
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
      textStyle: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: [5, 10],
      },
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
      boundaryGap: false,
      data: months,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Scrap Value",
        type: "line",
        stack: "Total",
        data: scrapValues,
        itemStyle: {
          color: "black",
        },
      },
      {
        name: "Scrap Quantity",
        type: "line",
        stack: "Total",
        data: scrapQuantities,
        itemStyle: {
          color: "orange",
        },
      },
    ],
  };

  return <ReactECharts option={option} notMerge={true} className="chart" />;
};

export default Trending;
