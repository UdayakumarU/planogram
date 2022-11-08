const getTotalQuantity = (id, rows) =>{
    let quantity = 0;
    rows.forEach(row =>{
        row.items.forEach(item=>{
            if(item.itemId === id) ++quantity;
        })
    });
    return quantity;
}

const checkIfItemMisplaced = (id, rows) =>{
    const actualRow = +id.substr(id.length-1) - 1 ; 
    for(let i=0; i<rows.length; ++i){
        if(i !== actualRow){
            const {items} = rows[i];
            for(let j=0; j<items.length; ++j){
                if(items[j].itemId === id)
                    return true;
            }
        }
    }
    return false;
}

const processShelfAlignment = (itemsIntheShelf, items) =>{
    return items.map( item =>{
        return{
            ...item,
            quantity: getTotalQuantity(item.id, itemsIntheShelf),
            isMisplaced: checkIfItemMisplaced(item.id, itemsIntheShelf)
        }
    })
}

module.exports = {processShelfAlignment};