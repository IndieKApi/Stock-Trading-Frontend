import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CandlestickSeries, createChart,AreaSeries } from 'lightweight-charts';

const StockChart = ({ symbol }) => {
  const chartContainerRef = useRef();
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stocks/history/${symbol}`);
        console.log(response.data.historical);
        setHistoricalData(response.data.historical);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();
  }, [symbol]);

  useEffect(() => {
    if (historicalData.length === 0 || !chartContainerRef.current) {
      return;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 550,
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
      },
      grid: {
        vertLines: {
          color: '#e1e1e1',
        },
        horzLines: {
          color: '#e1e1e1',
        },
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries);
    candlestickSeries.setData(
      historicalData.reverse().map(data => ({
        time: new Date(data.date).getTime() / 1000, // Convert to UNIX timestamp
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
      }))
    );

    // const areaSeries = chart.addSeries(AreaSeries);
    // areaSeries.setData(
    //   historicalData.map(data => ({
    //     time: new Date(data.date).getTime() / 1000, // Convert to UNIX timestamp
    //     value: data.close,
    //   }))

    // );

    return () => {
      chart.remove();
    };
  }, [historicalData]);

  return <div ref={chartContainerRef} style={{ width: "100%", height: "550px" }} />;
};

export default StockChart;
