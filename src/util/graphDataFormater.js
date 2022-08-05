export default class GraphDataFormater{
    constructor(dataList,matricsList,dimension){
        this.dataList = dataList;
        this.matricsList = matricsList;
        this.dimension = dimension;
    }
    toBarGraph(){
        let option = {
           tooltip: {
              trigger: 'axis',
            }, 
            grid: {
              right: '20%'
            },
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: this.dimension,
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
              
            series: 

              this.matricsList.map((value) => {
                let result = {
                    name: value,
                    
                    data: this.dataList.map(data=> data[value]),
                    type: 'bar', 
                }
                return result;
              })
            
          };
          return option;

    }
}