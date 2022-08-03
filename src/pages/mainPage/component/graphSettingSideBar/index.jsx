import React from 'react';
import "./index.less";
import { Tooltip } from 'antd';
import {graphName} from "./../../../../models/common"

export default function GraphSettingSideBar({imgList,selectedGraphIndex, setSelectedGraphIndex}) {
  let graphButtonCreator = (img, index) => {
      return <div className={"graphButton " + ((selectedGraphIndex === index)? "selectedButton" : "") }
             onClick={()=>setSelectedGraphIndex(index)}>
        <Tooltip title={graphName[index]}>
        <img src={img} alt={graphName[index]} />
        </Tooltip>
      </div>
  }

  return (
    <div className="GraphSettingSideBar">
      <div className="titleContainer">
        图表
      </div>
      <div className="graphButtonContainer">
        {imgList.map((img, index) =>  
           graphButtonCreator(img, index))}

      </div>
        
    </div>
  )
}
