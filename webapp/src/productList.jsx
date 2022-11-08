import { useEffect, useState } from "react";
import { getShelfStatus } from "./socket";

export const ProducrLists = () =>{

    const [ products, setProducts ] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/items",{method:'GET'}).then(response => response.json() )
        .then(products =>{
            setProducts(products);
        })
    },[]);

    useEffect( ()=>{
        getShelfStatus(setProducts);
    },[products])

    const getCalloutClass = (qty, isMisplaced) =>{
        if(qty === 0){
            return "danger";
        }
        return isMisplaced? "warning" :"info";
    }

    return (
        products?.map (product => {
            const calloutClass = `callout-${getCalloutClass(product.quantity, product.isMisplaced)}`;
            return <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={product.id}>
                <div className={`card my-4 shadow bg-white rounded ${calloutClass}`}>
                        <div className="row">
                            <div className="col-5">
                                <img className="img-thumbnail" src={product.imgUrl}/>
                            </div>
                            <div className="col-6 d-flex flex-column justify-content-around align-items-center">
                                <div className="blockquote">
                                    {product.name}    
                                </div>
                                <div className="h1">
                                    {product.quantity}    
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        })
    )
}