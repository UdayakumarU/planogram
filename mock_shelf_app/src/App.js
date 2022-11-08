/**
 * 1. able to rearrange the product between shelfs
 * 2. able to delete item
 */

import { useEffect, useState } from "react";

import { Shelf } from "./shelf";
import { Navigator } from "./navigator";

import { mapItemsDetail, getItemByPosition, deleteItemFromTheShelf, getUpperShelfFreeSpace, getLowerShelfFreeSpace, swapItems } from "./utils";
import { publishItemsInTheShelf } from "./socket";

const App = () => {
  
const itemsDetail = [
  {
    id: '101',
    imgUrl: "https://bellavitashop.co.uk/5462-large_default/nutella-biscuits-304g-ferrero.jpg",
    name: "Nutella biscuits"
},
{ 
    id: '102', 
    imgUrl: "https://www.colbeck.co.uk/wp-content/uploads/2017/11/Diet-Coke-330ml-021074.jpg", 
    name: "Diet coke"
},
{ 
    id: '103', 
    imgUrl: "https://tastemerchants.co.uk/wp-content/uploads/2022/06/ert003-600x600.jpg", 
    name: "Hummus Chips"
}
];

const initialItemsInTheShelf = [
  {
    rowId: 1,
    rowFor: "101",
    items: [
        {id:"1", itemId:'101'}, 
        {id:"2", itemId:'101'}, 
        {id:"3", itemId:'101'}, 
        {id:"4", itemId:'101'},
        {id:"5", itemId:'101'},
        {id:"6", itemId:'101'}
      ]
  },
  {
    rowId: 2,
    rowFor: "102",
    items: [
        {id:"7", itemId:'102'}, 
        {id:"8", itemId:'102'}, 
        {id:"9", itemId:'102'}, 
        {id:"10", itemId:'102'},
        {id:"11", itemId:'102'},
        {id:"12", itemId:'102'}
      ]
  }, 
  {
    rowId: 3,
    rowFor: "103",
    items: [
        {id:"13", itemId:'103'}, 
        {id:"14", itemId:'103'}, 
        {id:"15", itemId:'103'}, 
        {id:"16", itemId:'103'}, 
        {id:"17", itemId:'103'}, 
        {id:"18", itemId:'103'}
      ]
  }
];
  const freePosition = {rowIndex:-1, columnIndex:-1}
  const [itemsInTheShelf, changeItemsInTheShelf] = useState(mapItemsDetail(initialItemsInTheShelf, itemsDetail));
  const [selectedItem, setSelectedItem] = useState({});
  const [upperShelfFreeSpace, setUpperShelfFreeSpace] = useState(freePosition);
  const [lowerShelfFreeSpace, setLowerShelfFreeSpace] = useState(freePosition);

  useEffect(()=>{
    publishItemsInTheShelf(itemsInTheShelf);
  },[itemsInTheShelf]);

  const deleteItem = () =>{
    const { rowIndex, columnIndex } = selectedItem;
    const updatedShelf = deleteItemFromTheShelf(itemsInTheShelf, rowIndex, columnIndex);
    changeItemsInTheShelf(updatedShelf);
    setUpperShelfFreeSpace(freePosition);
    setLowerShelfFreeSpace(freePosition);
  };

  const moveItemUp = () =>{
    const itemsAfterSwapping = swapItems(itemsInTheShelf, selectedItem, upperShelfFreeSpace);
    changeItemsInTheShelf(itemsAfterSwapping);
    handleItemSelection({
      item: getItemByPosition(itemsAfterSwapping, upperShelfFreeSpace),
      ...upperShelfFreeSpace
    });
  }

  const moveItemDown = () =>{
    const itemsAfterSwapping = swapItems(itemsInTheShelf, selectedItem, lowerShelfFreeSpace);
    changeItemsInTheShelf(itemsAfterSwapping);
    handleItemSelection({
      item: getItemByPosition(itemsAfterSwapping, lowerShelfFreeSpace),
      ...lowerShelfFreeSpace
    });
  }

  const handleItemSelection = (event) =>{
    setSelectedItem(event);
    const { rowIndex, columnIndex } = event;
    const { freeUpperRowIndex, freeUpperColumnIndex } = getUpperShelfFreeSpace(itemsInTheShelf, rowIndex, columnIndex);
    const { freeLowerRowIndex, freeLowerColumnIndex } = getLowerShelfFreeSpace(itemsInTheShelf, rowIndex, columnIndex);
    setUpperShelfFreeSpace({rowIndex:freeUpperRowIndex, columnIndex:freeUpperColumnIndex});
    setLowerShelfFreeSpace({rowIndex:freeLowerRowIndex, columnIndex:freeLowerColumnIndex});
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-10">
          <Shelf 
            itemsInTheShelf = {itemsInTheShelf}
            handleItemSelection = {handleItemSelection}
            selectedItem = {selectedItem}
          />
        </div>
        <div className="col-2">
          <Navigator
            deleteItem={deleteItem}
            moveItemUp={moveItemUp}
            moveItemDown={moveItemDown}
            isUpperShelfFree={(upperShelfFreeSpace.rowIndex !== -1 && upperShelfFreeSpace.columnIndex !== -1)}
            isLowerShelfFree ={(lowerShelfFreeSpace.rowIndex !== -1 && lowerShelfFreeSpace.columnIndex !== -1)}
            selectedItemId = {selectedItem.item?.id}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
