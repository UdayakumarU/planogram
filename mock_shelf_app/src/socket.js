import { io } from "socket.io-client";

export const publishItemsInTheShelf = (itemsInTheShelf) =>{
    const socket = io('http://localhost:8080');
    socket.emit("fromShelf", itemsInTheShelf);
}