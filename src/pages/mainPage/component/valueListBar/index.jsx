import React from 'react';
import  "./index.less";
import {BarsOutlined} from '@ant-design/icons';

export default function ValueListBar({title, valueList,clickAction}) {
  return (
    <div className='ValueListBar'>
      <div className="titleContainer">
          {title}
      </div>
      <div className="valueContainer">
        <ol>
        {valueList.map((value, index) => 
          <li key={index} onClick={()=>clickAction(value)}> 
            <div className='iconContainer'>
              <BarsOutlined style={{ fontSize: '20px', color: '#3467eb' }}/>
            </div>
            {value} 
          </li>
        )}
        </ol>
      </div>

    </div>
  )
}
