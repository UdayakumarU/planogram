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