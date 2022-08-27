import React from 'react';
import "./index.less";
import { Tooltip, Tabs} from 'antd';
import {graphName} from "./../../../../models/common";
import {connect} from 'react-redux';
import {updateAnalyticData,updateGraphData} from '../../../../redux/action';

function GraphSettingSideBar({dispatch, imgList,selectedGraphIndex, setSelectedGraphIndex, analysisData, functionList}) {
  const { TabPane } = Tabs;
  let graphButtonCreator = (img, index) => {
      return <div key={index} className={"graphButton " + ((selectedGraphIndex === index)? "selectedButton" : "") }
             onClick={()=>setSelectedGraphIndex(index)}>
          <Tooltip title={graphName[index]}>
          <img src={img} alt={graphName[index]} />
          </Tooltip>
      </div>
  }
  //  dispatch action for getting analytic data
  let clickHandler = () => {
    dispatch(updateAnalyticData());

  }
  let valueContainerCreator = (title, index) => {
    return (
    <div className="valueWrapper" key={index}>
      <div className="valueTitle" onClick={() => eventClikc(title,index)}>
          {title} 
      </div>
      
      {analysisData && <div>
        {analysisData[index]}
        
      </div>}
   </div>)
    
  }
  let eventClikc = (title,index) => {
    console.log(title,index)
    // if(title)
    // updateGraphData()
  }

  return (
    
      <div className="GraphSettingSideBar">
        <Tabs defaultActiveKey="1" >
            <TabPane tab="图表" key="1">
              <div className="graphButtonContainer">
                {imgList.map((img, index) =>  
                   graphButtonCreator(img, index))}

              </div>
            </TabPane>
           <TabPane tab="分析" key="2" onClick = {clickHandler}>
             {functionList && functionList.map((value,index) => valueContainerCreator(value.name, index))}
           </TabPane>
       </Tabs>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    functionList : state.dataBaseInfo.functionList,
  }
}

export default connect(mapStateToProps)(GraphSettingSideBar);


