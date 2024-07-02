import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/chartSlice";

const WorkCenter = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.chart);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading data: {error}</div>;
  if (!data?.by_work_center?.length) return <div>No data available</div>;

  const workCenters = data.by_work_center.map((item) => item.work_center);
  const scrapCounts = data.by_work_center.map((item) =>
    parseFloat(item.total_scrap_quantity)
  );
  const totalScrap = scrapCounts.reduce((sum, value) => sum + value, 0);

  const scrapPercentages = scrapCounts.map((qty, idx) => {
    const cumulativeSum = scrapCounts
      .slice(0, idx + 1)
      .reduce((sum, value) => sum + value, 0);
    return ((cumulativeSum / totalScrap) * 100).toFixed(2);
  });

  const option = {
    title: {
      text: "Scrap By Work Center (SWC)",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    xAxis: {
      type: "category",
      data: workCenters,
      axisLabel: {
        rotate: 45,
        textStyle: {
          fontSize: 12,
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "Scrap Count",
        min: 0,
        max: Math.max(...scrapCounts) + 5000,
        interval: 5000,
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "Scrap %",
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: "{value}%",
        },
      },
    ],
    series: [
      {
        name: "Scrap Count",
        type: "bar",
        barGap: "20%",
        itemStyle: {
          color: (params) => {
            const colorList = [
              "#FF69B4",
              "#33CC33",
              "#6666CC",
              "#0099CC",
              "#FFCC00",
              "#CC0099",
              "#0066CC",
              "#CC6600",
            ];
            return colorList[params.dataIndex % colorList.length];
          },
        },
        data: scrapCounts,
      },
      {
        name: "Scrap %",
        type: "line",
        yAxisIndex: 1,
        label: {
          show: true,
          position: "top",
          formatter: "{c}%",
        },
        itemStyle: {
          color: "#FF0000",
        },
        data: scrapPercentages,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ReactECharts
        option={option}
        notMerge={true}
        className="chart"
        style={{ marginTop: "30px" }}
      />
    </div>
  );
};

export default WorkCenter;
