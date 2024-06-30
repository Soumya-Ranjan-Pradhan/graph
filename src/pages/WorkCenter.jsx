import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/chartSlice";

const WorkCenter = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.chart);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  if (!data || !data.by_work_center) {
    return <div>No data available</div>;
  }

  const workCenters = data.by_work_center.map((item) => item.work_center);
  const scrapCounts = data.by_work_center.map((item) =>
    parseFloat(item.total_scrap_quantity)
  );
  const scrapPercentages = data.by_work_center.map(
    (item, index) => ((index + 1) / workCenters.length) * 100
  );

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
      axisPointer: {
        type: "shadow",
      },
    },
    yAxis: [
      {
        type: "value",
        name: "Scrap Count",
        min: 0,
        max: 25000,
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
          normal: {
            color: function (params) {
              var colorList = [
                "#FF69B4",
                "#33CC33",
                "#6666CC",
                "#0099CC",
                "#FFCC00",
                "#CC0099",
                "#0066CC",
                "#CC6600",
              ];
              return colorList[params.dataIndex];
            },
          },
        },
        data: scrapCounts,
      },
      {
        name: "Scrap %",
        type: "line",
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: "#FF0000",
          },
        },
        data: scrapPercentages,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ReactECharts option={option} notMerge={true} className="chart" />
    </div>
  );
};

export default WorkCenter;
