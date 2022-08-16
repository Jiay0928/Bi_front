import React,{useState} from 'react';
import "./index.less";
import { Tooltip, Tabs} from 'antd';
import {graphName} from "./../../../../models/common";
import {connect} from 'react-redux';

function GraphSettingSideBar({imgList,selectedGraphIndex, setSelectedGraphIndex, analysisData, functionList}) {
  const [getAnalysis, setGetAnalysis] = useState(false);
  const { TabPane } = Tabs;
  let graphButtonCreator = (img, index) => {
      return <div key={index} className={"graphButton " + ((selectedGraphIndex === index)? "selectedButton" : "") }
             onClick={()=>setSelectedGraphIndex(index)}>
          <Tooltip title={graphName[index]}>
          <img src={img} alt={graphName[index]} />
          </Tooltip>
      </div>
  }

  let clickHandler = () => {
    

  }
  let valueContainerCreator = (title, key) => {
    return (
    <div className="valueWrapper">
      <div className="valueTitle">
          {title} 
      </div>
      
      {analysisData && <div>
        {analysisData[key]}
        
      </div>}
   </div>)
    
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
             {functionList.map((value,index) => valueContainerCreator(value.name, index))}
             
           </TabPane>
       </Tabs>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    functionList : state.dataBaseInfo.functionList
  }
}

export default connect(mapStateToProps)(GraphSettingSideBar);


