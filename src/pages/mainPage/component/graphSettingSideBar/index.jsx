import React from 'react';
import "./index.less";
import { useState } from 'react';

export default function GraphSettingSideBar({imgList}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  let graphButtonCreator = (img, index, graphType) => {
      return <div className={"graphButton " + ((selectedIndex === index)? "selectedButton" : "") }
             onClick={()=>setSelectedIndex(index)}>
        <img src={img} alt={graphType} />
      </div>
  }

  return (
    <div className="GraphSettingSideBar">
      <div className="titleContainer">
        图表
      </div>
      <div className="graphButtonContainer">
        {imgList.map((img, index) =>  
           graphButtonCreator(img, index, "tableTypes"))}

      </div>
        
    </div>
  )
}
