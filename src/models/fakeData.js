export let valueList = ["name", "age","salary"];

export let dataList = [
    {
        name: 'John Brown',
        age: 32,
        salary: 1000,
        
      },
      {
        name: 'Jim Green',
        age: 42,
        salary: 100,
        
      },
      {
        name: 'Joe Black',
        age: 32,
        salary: 1000,
       
      },
      {
        name: 'John Brown1',
        age: 32,
        salary: 1000,
        
      },
      {
        name: 'Jim Green1',
        age: 42,
        salary: 1000,
        
      },
      {
        name: 'Joe Black1',
        age: 32,
        salary: 1000,
        
      },

];

export const options = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'pie'
    }
  ]
};