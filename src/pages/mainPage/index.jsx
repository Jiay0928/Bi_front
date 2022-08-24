import React, {useState, useEffect} from 'react';
import  "./index.less";
import { FileAddOutlined, SettingOutlined, CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import ValueListBar from './component/valueListBar';
import GraphSettingSideBar from './component/graphSettingSideBar';
import { tableImgList } from '../../assets/tableIcons';
import ValueGraph from './component/valueGraph';
import {connect} from 'react-redux';
import {updateDatabaseInfo, updateGraphData} from "./../../redux/action"

import SelectDb from './component/selectDatabase/selectDb';

function MainPage({dispatch, allDimensions,allMatrics}) {
  const [dimension, setDimension] = useState("");
  const [matric, setmatric] = useState([]);
  const [graphingDim, setGraphingDim] = useState("");
  const [graphingMatric, setGraphingMatric] = useState([]);
  const [graphType, setGraphType] = useState(0);
  const [shownDimensions, setShownDimensions] = useState();
  const [shownMatrics, setShownMatrics] = useState();
  const [tableVisible, setTableVisible] = useState(false);
  useEffect(() => {
    dispatch(updateDatabaseInfo()); 
  }, []);
  useEffect(() => {
    setShownDimensions(allDimensions);
    setShownMatrics(allMatrics)
  }, [allMatrics,allDimensions]);
  
  
  
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
      
      setGraphingDim(dimension);
      setGraphingMatric(matric);
      dispatch(updateGraphData(dimension,matric));
      setTimeout(() => {
        setTableVisible(true);
    }, 10) 
    
      
    }else{
      setTableVisible(false);
      alert("请至少选择一个维度和一个指标。")
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
            <Input className='searchBox' placeholder="输入关键词搜索" onChange={searchMethod}/>
        </div>
        <ValueListBar title="维度" valueList={shownDimensions} clickAction={valueAddingHandler(true)}/>
        <ValueListBar title="指标" valueList={shownMatrics} clickAction={valueAddingHandler(false)}/>
       </div>
          <GraphSettingSideBar imgList={tableImgList} selectedGraphIndex={graphType} setSelectedGraphIndex={setGraphType} analysisData={{sum: 100}}/>
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
              <ValueGraph dimension={graphingDim} matric={graphingMatric} graphType={graphType} />
            }
            </div>
          </div>
        </div>
  )
}
const mapStateToProps = (state) => {
  const baseData = state.dataBaseInfo;
  let tempDimList = baseData.dimensionList && baseData.dimensionList;
  let tempMatList = baseData.metricList &&  baseData.metricList;  
  return {
    allDimensions: tempDimList? tempDimList.map(value => value.name) : [],
    
    allMatrics: tempMatList? tempMatList.map(value => value.name) : [],
    
  }
}

export default connect(mapStateToProps)(MainPage);