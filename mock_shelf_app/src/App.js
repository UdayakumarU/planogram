/**
 * 1. able to rearrange the product both column and row
 * 2. able to delete item
 */

import { useState } from "react";
import { Shelf } from "./shelf";
import { mapItemsDetail, deleteItemFromTheShelf } from "./utils";
import { Navigator } from "./navigator";

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

  const [itemsInTheShelf, changeItemsInTheShelf] = useState(mapItemsDetail(initialItemsInTheShelf, itemsDetail));
  const [selectedItem, setSelectedItem] = useState({});

  const deleteItem = () =>{
    const { rowIndex, columnIndex } = selectedItem;
    const updatedShelf = deleteItemFromTheShelf(itemsInTheShelf, rowIndex, columnIndex);
    changeItemsInTheShelf(updatedShelf);
  };

  const handleItemSelection = (event) =>{
    setSelectedItem(event);
  };

  return (
    <div className="container mt-5">
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
            selectedItemId = {selectedItem.item?.id}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
