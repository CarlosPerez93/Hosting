import React from "react";
import Chart from "react-apexcharts";
import { Tabs, DatePicker, Space, Select } from "antd";

export const ChartsCompany = () => {
  const affiliates = {
    series: [
      {
        name: "Afiliados",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Desafiliados",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (Cantidad)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };
  const averageAffiliates = {
    option: {
      labels: ["Afiliados", "Desafiliados"],
    },
    series: [44, 55],
  };
  const Gender = {
    series: [
      {
        name: "Hombre",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 18],
      },
      {
        name: "Mujer",
        data: [12, 11, 14, 18, 17, 13, 13, 25, 100],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const income = {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],

    options: {
      stroke: {
        colors: ["#fff"],
        type: "polarArea",
      },
      labels: [
        "Membresia A",
        "Membresia B",
        "Membresia C",
        "Membresia D",
        "Membresia E",
        "Membresia F",
        "Membresia G",
        "Membresia H",
        "Membresia I",
      ],
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const { TabPane } = Tabs;
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  return (
    <div className="charts-company">
      <Tabs defaultActiveKey="1" centered className="tabs">
        <TabPane tab="Afiliados" key="1">
          <div>
            <div className="item1">
              <div className="subItem1">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>Rango de Fechas</label>
                  <Space style={{ maxWith: "80%", minWidth: "20%" }}>
                    <RangePicker />
                  </Space>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "15%",
                  }}
                >
                  <label>Departamento</label>
                  <Select defaultValue=" " onChange={handleChange}>
                    <Option value="Caqueta"> Caqueta</Option>
                  </Select>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "15%",
                  }}
                >
                  <label>Género</label>
                  <Select defaultValue=" " onChange={handleChange}>
                    <Option value="Masculino"> Masculino</Option>
                  </Select>
                </div>
              </div>
              <Chart
                options={affiliates.options}
                series={affiliates.series}
                type="bar"
                className="chart"
              />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Ingresos" key="2">
          <div>
            <div className="item3">
              <div className="subItem1">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>Rango de Fechas</label>
                  <Space>
                    <RangePicker />
                  </Space>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "15%",
                  }}
                >
                  <label>Despartamento</label>
                  <Select
                    defaultValue=" "
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                    onChange={handleChange}
                  >
                    <Option value="Caqueta"> Caqueta</Option>
                  </Select>
                </div>
              </div>
              <br />
              <Chart
                options={income.options}
                series={income.series}
                type="polarArea"
                className="chart"
                width="100%"
              />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
