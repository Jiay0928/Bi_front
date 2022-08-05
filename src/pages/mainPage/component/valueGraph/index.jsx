import React,{useEffect} from 'react';
import ReactEcharts from "echarts-for-react"; 

export default function ValueGraph({graphOption}) {
  useEffect(() => {
    console.log("wrong", graphOption);
    console.log("right",options);
  }, []);
    const options = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'pie'
          }
        ]
      }; 
  return (
    <ReactEcharts option={graphOption} />
  );
}
