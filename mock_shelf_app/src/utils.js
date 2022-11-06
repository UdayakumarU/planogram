const _getItemDetailById = (itemDetail, id) => {
    return itemDetail.find( item => item.id === id);
}

export const mapItemsDetail = (itemsInshelf, itemDetail) =>{
   return itemsInshelf?.map(row=>{
        return {
            ...row,
            items: row.items?.map( item => {
                const {imgUrl, name} = _getItemDetailById(itemDetail, item.itemId);
                return{
                    ...item,
                    itemName : name,
                    imgUrl
                }
            })
        }
    })
}

export const getItemByPosition = (items, position) => {
    return items[position.rowIndex].items[position.columnIndex];
} 

export const deleteItemFromTheShelf = (itemsInTheShelf, rowIndex, columnIndex) => {
   return itemsInTheShelf.map((row, rowInd)=>{
        return {
            ...row,
            items: row.items?.map ((item, colInd)=> {
              return  (rowInd === rowIndex && colInd ===columnIndex)?{
                    ...item,
                    itemId: "",
                    itemName: "",
                    imgUrl: "https://cdn.coolermaster.com/media/4571/haf700-600x600.png"
                }:
                item;
            })
        }
    })
}

export const getUpperShelfFreeSpace = (itemsInTheShelf, rowIndex) =>{
    const freePosition = { freeUpperRowIndex:-1, freeUpperColumnIndex: -1};
    if(rowIndex === 0) 
        return freePosition;
    
    let freeColumnIndex = -1;
    const rowLength = itemsInTheShelf[rowIndex-1].items.length;
    for(let i=0; i<rowLength; ++i){
        if(itemsInTheShelf[rowIndex-1].items[i].itemId === ""){
            freeColumnIndex = i;
            break;
        }
    }
    freePosition.freeUpperRowIndex = rowIndex-1;
    freePosition.freeUpperColumnIndex = freeColumnIndex;
    return freePosition;
}

export const getLowerShelfFreeSpace = (itemsInTheShelf, rowIndex) =>{
    const freePosition = { freeLowerRowIndex:-1, freeLowerColumnIndex: -1};
    if(rowIndex === itemsInTheShelf.length-1) 
        return freePosition;
    
    let freeColumnIndex = -1;
    const rowLength = itemsInTheShelf[rowIndex+1].items.length;
    for(let i=0; i<rowLength; ++i){
        if(itemsInTheShelf[rowIndex+1].items[i].itemId === ""){
            freeColumnIndex = i;
            break;
        }
    }
    freePosition.freeLowerRowIndex = rowIndex+1;
    freePosition.freeLowerColumnIndex = freeColumnIndex;
    return freePosition;
}


export const swapItems = (itemsInTheShelf, selectedItem, designatedItem) =>{
    const pickedItem = itemsInTheShelf[selectedItem.rowIndex].items[selectedItem.columnIndex];
    itemsInTheShelf[selectedItem.rowIndex].items[selectedItem.columnIndex] = itemsInTheShelf[designatedItem.rowIndex].items[designatedItem.columnIndex];
    itemsInTheShelf[designatedItem.rowIndex].items[designatedItem.columnIndex] = pickedItem;
    return itemsInTheShelf;
} 