import React from 'react';
import "./index.less";
import { Tooltip, Tabs} from 'antd';
import {graphName} from "./../../../../models/common";

export default function GraphSettingSideBar({imgList,selectedGraphIndex, setSelectedGraphIndex, analysisData}) {
  const { TabPane } = Tabs;
  let graphButtonCreator = (img, index) => {
      return <div key={index} className={"graphButton " + ((selectedGraphIndex === index)? "selectedButton" : "") }
             onClick={()=>setSelectedGraphIndex(index)}>
          <Tooltip title={graphName[index]}>
          <img src={img} alt={graphName[index]} />
          </Tooltip>
      </div>
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
           <TabPane tab="分析" key="2">
             {valueContainerCreator("总和", 'sum')}
             {valueContainerCreator("平均值", 'average')}
             {valueContainerCreator("最大值", 'max')}
             {valueContainerCreator("最小值", 'min')}
             
           </TabPane>
       </Tabs>
    </div>
  )
}
