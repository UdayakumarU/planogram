export const Navigator = ({deleteItem, selectedItemId}) =>{
    return(
        <div>
            <button 
                className={`btn btn-primary ${selectedItemId?"":"disabled"}`} 
                onClick = {deleteItem}>
                    delete
            </button>
        </div>
    )
}