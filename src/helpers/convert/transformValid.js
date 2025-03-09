
export function transformValidChart( data ) {
    const categories = {};
    for( let i =0; data.length -1 >= i; i++ ){
        if(data[i].category in categories ){
            categories[data[i].category] += data[i].amount;
        }else {
            categories[data[i].category] = data[i].amount;
        }
    }
    return categories;
}