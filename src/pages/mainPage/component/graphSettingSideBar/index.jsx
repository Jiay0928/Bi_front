import React from 'react';
import "./index.less";
import { useState } from 'react';
import {table} from '../../../../assets/tableIcons';

export default function GraphSettingSideBar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  let graphButtonCreator = (img, index, graphType) => {
      return <div className={"graphButton" + (selectedIndex === index) && "selectedButton" } onClick={()=>setSelectedIndex(index)}>
        <img src={img} alt={graphType} />
      </div>
  }

  return (
    <div className="GraphSettingSideBar">
      <div className="titleContainer">
        图表
      </div>
      <div className='graphButtonContainer'>
            {graphButtonCreator(table,0,"table")}
      </div>
    </div>
  )
}
