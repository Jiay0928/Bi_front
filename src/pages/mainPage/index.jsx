import React from 'react';
import  "./index.less";
import { FileAddOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import ValueListBar from './component/valueListBar';
import { valueList } from '../../models/fakeData';
import GraphSettingSideBar from './component/graphSettingSideBar';

export default function MainPage() {
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
            <Input className='searchBox' placeholder="输入关键词搜索" />
        </div>
        <ValueListBar title="维度" valueList={valueList}/>
        <ValueListBar title="指标" valueList={valueList}/>
    </div>
      <GraphSettingSideBar/>
      <div className="graphContainer">SADSDÅ</div>
    </div>
  )
}
