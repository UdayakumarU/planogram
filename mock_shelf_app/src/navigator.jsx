export const Navigator = ({deleteItem, moveItemUp, moveItemDown, isUpperShelfFree, isLowerShelfFree, selectedItemId}) =>{
    return(
        <div className="d-flex flex-column align-items-center justify-content-between full-shelf">
            <div>
            <button 
                className={`btn btn-danger ${selectedItemId?"":"disabled"}`} 
                onClick = {deleteItem}>
                    delete
            </button>
            </div>
            <div>
                <button 
                    className={`btn btn-success ${isUpperShelfFree?"":"disabled"}`} 
                    onClick = {moveItemUp}>
                        up
                </button>
                <button 
                    className={`btn btn-success ${isLowerShelfFree?"":"disabled"}`} 
                    onClick = {moveItemDown}>
                        Down
                </button>
            </div>
        </div>
    )
}