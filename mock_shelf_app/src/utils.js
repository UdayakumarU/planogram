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
    const rowLength = itemsInTheShelf[rowIndex]?.items.length;

    for(let j=rowIndex-1; j>=0; --j){
        for(let i=0; i<rowLength; ++i){
            if(itemsInTheShelf[j].items[i].itemId === ""){
                freePosition.freeUpperRowIndex = j;
                freePosition.freeUpperColumnIndex = i;
                return freePosition;
            }
        }
    }
    return freePosition;
}

export const getLowerShelfFreeSpace = (itemsInTheShelf, rowIndex) =>{
    const freePosition = { freeLowerRowIndex:-1, freeLowerColumnIndex: -1};
    const rowLength = itemsInTheShelf[rowIndex+1]?.items.length;

    for(let j=rowIndex+1; j<itemsInTheShelf.length; ++j){
        for(let i=0; i<rowLength; ++i){
            if(itemsInTheShelf[j].items[i].itemId === ""){
                freePosition.freeLowerRowIndex = j;
                freePosition.freeLowerColumnIndex = i;
                return freePosition;
            }
        }
    }
    return freePosition;
}


export const swapItems = (itemsInTheShelf, selectedItem, designatedItem) =>{
    const pickedItem = itemsInTheShelf[selectedItem.rowIndex].items[selectedItem.columnIndex];
    itemsInTheShelf[selectedItem.rowIndex].items[selectedItem.columnIndex] = itemsInTheShelf[designatedItem.rowIndex].items[designatedItem.columnIndex];
    itemsInTheShelf[designatedItem.rowIndex].items[designatedItem.columnIndex] = pickedItem;
    return [...itemsInTheShelf];
} 