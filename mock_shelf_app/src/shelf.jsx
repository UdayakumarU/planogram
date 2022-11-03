export const Shelf = ({itemsInTheShelf, handleItemSelection, selectedItem}) => {
    
    const getItemClassName = (currentItemId, currentId) =>{
        if(currentItemId){
            if(selectedItem.item?.id === currentId){
                return "item item-selected"
            }
            return "item"
        }
        return "";
    } 

    return( 
    <div className="d-flex flex-column full-shelf justify-content-between">
        {itemsInTheShelf.map( (row, rowIndex) => {
           return(
                <div key ={row.rowId} className="card">
                    <div  className="row">
                       {
                           row.items.map((item, columnIndex) => (
                               <div
                                   key={item.id}
                                   className="col-2">
                                    <img 
                                        onClick={()=>handleItemSelection({item,rowIndex, columnIndex})}
                                        className={`img-thumbnail ${getItemClassName(item.itemId, item.id)}`} 
                                        src={item.imgUrl} />
                               </div>
                           ))
                        }
                   </div>
                </div>
            ) 
        })}
    </div>
    )
}