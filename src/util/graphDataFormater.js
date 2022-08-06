export default class GraphDataFormater{
    constructor(dataList,matricsList,dimension){
        this.dataList = dataList;
        this.matricsList = matricsList;
        this.dimension = dimension;
    }
    toGraphData(graphType){
        switch (graphType){
          case 'line': case 'bar': 
            return this._toLineBarGraphData(graphType, false);
          case 'pie':
            return this._toPieGraph();
          case 'stackedArea':
            return this._toStackedAreaGraph(false);
          case 'stackedBar':
            return this._toLineBarGraphData('bar',true);
            case 'stackedPercentArea':
              return this._toStackedAreaGraph(true);

          default:
            return;
        }
          
    }

    _getStackedPercentData(graphType, option){
        return this.matricsList.map((value) => {
          let result = {
              notMerge: true,
              name: value,
              stack:'ad',
              data: this.dataList.map(data => {
                let sum = this.matricsList.reduce(
                  (previousValue,currentValue) => data[previousValue] + data[currentValue]);
                let res = data[value]/sum;
                return res.toFixed(2);
                }),
              type: graphType,
              ...option
               
          }
          return result;
        })
    }
    _getSeries = (graphType,option) => {
      return this.matricsList.map((value) => {
        let result = {
            name: value,
            data: this.dataList.map(data=> data[value]),
            type: graphType,
            ...option
             
        }
        return result;
      })
    }
    
    _toLineBarGraphData(graphType, isStacked){
      
      let option = {
        notMerge: true,
        tooltip: {
           trigger: 'axis',
         }, 
         grid: {
           right: '20%'
         },
         toolbox: {
           feature: {
             saveAsImage: { show: true }
           }
         },
         legend: {
           data: this.matricsList,
         },
         xAxis: [
           {
             type: 'category',
             axisTick: {
               alignWithLabel: true
             },
             // prettier-ignore
             data: this.dataList.map((value) => value[this.dimension]),
           }
         ],
         yAxis: 
           {
             type: 'value',
             alignTicks: true,
             axisLine: {
               show: true,
               lineStyle: {
                 color: '#737373',
               }
             },
             axisLabel: {
               formatter: '{value}'
             }
           },
           
         series: isStacked? this._getStackedPercentData('bar') : this._getSeries(graphType)
           
          
       };
       return option;
      
    }
    

    _toPieGraph(){
      let option = {
        notMerge: true,
        title: {
          text: `${this.matricsList[0]}饼图`,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',

          
        },
        series:
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: 
            this.dataList.map(
              (data) => {
                let res = {
                  value: data[this.matricsList[0]],
                  name: data[this.dimension],
                };
                return res;
                
              }
            )
            
            ,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        
      }
      return option;
    }
    _toStackedAreaGraph(isPercent){
      
      let option = {
        notMerge: true,
        
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: this.matricsList,
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.dataList.map((value) => value[this.dimension]),
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series:
        
        isPercent? 
        this._getStackedPercentData(
          'line',{
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
          }
        )
        
      :
        this._getSeries(
          'line',{
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
          }
        )
      };
      return option;
    }
}