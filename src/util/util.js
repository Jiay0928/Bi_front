// change dimensionList into column info used by antd table
export function dimensionToColumn(dimensionList){
    return dimensionList.map((dim) => {
        const result = {
            title: dim,
            dataIndex: dim,
            key: dim,
        }
        return result;
    })

}

export function dataToRow(data, dimensionList){
    return data.map((data,index)=>{
        let result = {
            key: index,
        }
        dimensionList.forEach((element) => {
            result[element] = data[element]; 
        });
        return result;
    } )
}

