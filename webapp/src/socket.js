import { io } from "socket.io-client";

export const getShelfStatus = (setProducts) =>{
   const socket = io("http://localhost:8080");
   socket.on('toPlanogram', (data) => {
    setProducts(data);
});
}