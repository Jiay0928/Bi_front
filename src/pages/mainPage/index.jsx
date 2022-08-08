import React, {useState, useRef, useImperativeHandle} from 'react';
import  "./index.less";
import { FileAddOutlined, SettingOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import ValueListBar from './component/valueListBar';
import { valueList, dataList } from '../../models/fakeData';
import GraphSettingSideBar from './component/graphSettingSideBar';
import { tableImgList } from '../../assets/tableIcons';
import ValueTable from './component/valueTable';
import {dimensionToColumn, dataToRow} from "./../../util/util";

import SelectDb from './component/selectDatabase/selectDb';

export default function MainPage(ref) {
  const [dimension, setDimension] = useState("");
  const [matric, setmatric] = useState([]);
  const [graphType, setGraphType] = useState(0);

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
  let switchDataType = () => {
    switch(graphType){
      case 0: 
        return <ValueTable columnNames={dimensionToColumn([dimension, ...matric])} dataList={dataToRow(dataList, [dimension, ...matric])}/> ;
      default:
        return <></>;
    }
  }
  return (
    <div className="MainPage">
      <div className="DataSelectSideBar"> 
        <div className='dataBaseInfoWrapper'>
            <div className='dataBaseInfoTop'>
                数据集
                <SelectDb/>
            </div>
            <div>
                DataBase Name
            </div>
            
        </div>
        <div className='searchBoxWrapper'>
            <Input className='searchBox' placeholder="输入关键词搜索" />
        </div>
        <ValueListBar title="维度" valueList={valueList} clickAction={valueAddingHandler(true)}/>
        <ValueListBar title="指标" valueList={valueList} clickAction={valueAddingHandler(false)}/>
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
            { (dimension !== "") && (matric.length !== 0) &&
              switchDataType()
            }
            </div>
          </div>
        </div>
  )
}
