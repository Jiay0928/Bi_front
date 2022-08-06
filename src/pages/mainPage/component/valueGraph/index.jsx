import React,{useEffect, useRef} from 'react';
import ReactEcharts from "echarts-for-react"; 

export default function ValueGraph({graphOption}) {
    const chartRef = useRef();
    let echartsInstance;
    useEffect(() => {
      echartsInstance = chartRef.current.chartInstance;
      
    
      return () => {
        echartsInstance && echartsInstance.dispose();
      }
    }, [])
    
  return (
    <ReactEcharts style={{height: '500px'}} ref={chartRef} option={graphOption} />
  );
}
