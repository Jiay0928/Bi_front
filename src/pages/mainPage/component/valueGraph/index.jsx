import React from 'react';
import ReactEcharts from "echarts-for-react"; 
import ValueTable from '../valueTable';
import GraphDataFormater from '../../../../util/graphDataFormater';
import { dimensionToColumn, dataToRow } from '../../../../util/util';
// import { dataList } from '../../../../models/fakeData';
// import store from '../../../../redux/store';
import {connect} from 'react-redux';


function ValueGraph({graphType, matric, dimension, dataList}) {
  let optionCreator = () => {
    let graphDataFormater = new GraphDataFormater(dataList, matric, dimension);
    switch(graphType){
      case 1:
        return graphDataFormater.toGraphData("bar");
      case 2:
        return graphDataFormater.toGraphData("stackedArea");
      case 3:
        return graphDataFormater.toGraphData("line");
      case 4:
        return graphDataFormater.toGraphData("pie");
      case 5:
        return graphDataFormater.toGraphData("stackedBar");
      case 6:
        return graphDataFormater.toGraphData("stackedPercentArea");
      default:
        return null
    }
  }
    
  return (
    <>
    {
    (graphType === 0)? 
    
    <ValueTable key={0} columnNames={dimensionToColumn([dimension, ...matric])} dataList={dataToRow(dataList, [dimension, ...matric])}/> :
    
    <ReactEcharts key={graphType} style={{height: '500px'}}  option={optionCreator()} />
  
    }
  </>
  );
}

const mapStateToProps = (state) => {
  return {dataList: state.graphData,}
}

export default connect(mapStateToProps)(ValueGraph);