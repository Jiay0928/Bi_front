import React, {useState, useRef, useImperativeHandle} from 'react';
import  "./index.less";
import { FileAddOutlined, SettingOutlined, CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import ValueListBar from './component/valueListBar';
import { valueList, dataList } from '../../models/fakeData';
import GraphSettingSideBar from './component/graphSettingSideBar';
import { tableImgList } from '../../assets/tableIcons';
import ValueTable from './component/valueTable';
import {dimensionToColumn, dataToRow} from "./../../util/util";
import ValueGraph from './component/valueGraph';


export default function MainPage(ref) {
  const [dimension, setDimension] = useState("");
  const [matric, setmatric] = useState([]);
  const [graphType, setGraphType] = useState(0);
  const [allDimensions, setAllDimensions] = useState(valueList);
  const [allMatrics, setMatrics] = useState(valueList);
  const [shownDimensions, setShownDimensions] = useState(valueList);
  const [shownMatrics, setShownMatrics] = useState(valueList);
  const [tableVisible, setTableVisible] = useState(false);
  
  
  // handle selected values
  let createValueContainer = (value, isDim) => {
    if (value === ""){
      return <></>
    }else {
        return <div key={value} className={"valueContainer" + (isDim? " DimensionContainer" : "") }>
          <CloseCircleOutlined onClick={()=>valueDeleteHandler(value,isDim)}/> 
          {value}</div>
    } 
  }
  
  let valueDeleteHandler = (value, isDim) => {
    if (isDim) {
      setDimension("");
    }else {
      setmatric(matric.filter((v)=> {return (v !== value);}))
    }

  }

  let valueAddingHandler = (isDim) => {
    if (isDim){
      return (value) => setDimension(value);
    }else{
      return (value) => {
        if (matric.includes(value)){
          return;
        }
        setmatric([...matric,value])};
    }
  }

  // handle graph
  let graphCreator = () => {
    switch(graphType){
      case 0: 
        return <ValueTable columnNames={dimensionToColumn([dimension, ...matric])} dataList={dataToRow(dataList, [dimension, ...matric])}/> ;
      default:
        return <ValueGraph/>
    }
  }

  // handle input search bar
   let searchMethod = (e) => {
        let value = e.target.value;
        setShownDimensions(allDimensions.filter((str)=>(str.includes(value))));
        setShownMatrics(allMatrics.filter((str) => 
          str.includes(value)
        ))
   }

  //  handle if table is visible 
  let tableVisibilityHandler = () => {
    if ((dimension !== "") && (matric.length !== 0)){
      setTableVisible(true);
      
    }else{
      setTableVisible(false);
    }

  }

  return (
    <div className="MainPage">
      <div className="DataSelectSideBar"> 
        <div className='dataBaseInfoWrapper'>
            <div className='dataBaseInfoTop'>
                数据集
                <FileAddOutlined />
            </div>
            <div>
                DataBase Name
            </div>
        </div>
        <div className='searchBoxWrapper'>
            <Input className='searchBox' placeholder="输入关键词搜索" onChange={searchMethod}/>
        </div>
        <ValueListBar title="维度" valueList={shownDimensions} clickAction={valueAddingHandler(true)}/>
        <ValueListBar title="指标" valueList={shownMatrics} clickAction={valueAddingHandler(false)}/>
       </div>
          <GraphSettingSideBar imgList={tableImgList} selectedGraphIndex={graphType} setSelectedGraphIndex={setGraphType}/>
          <div className="rightContainer">
            <div className='SelectedValueContainer'>
              <div className="valueWrapper">
                <div className='valueNameContainer'>
                     维度 <SettingOutlined style={{fontWeight: 700, paddingLeft:4}}/>
                </div>
                {createValueContainer(dimension, true)}  
              </div>
              <div className="valueWrapper">
              <div className='valueNameContainer'>
                    指标 <SettingOutlined style={{fontWeight: 700, paddingLeft:4}}/>
                </div>
                {matric.map((value)=> createValueContainer(value, false))}
              </div>

            </div>
            <div className="graphContainer">
              <Button className='searchButton' onClick={tableVisibilityHandler}>
                <SearchOutlined /> 查询
              </Button>
            {tableVisible  &&
              graphCreator()
            }
            </div>
          </div>
        </div>
  )
}
