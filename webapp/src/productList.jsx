export const ProducrLists = () =>{
    const products = [
        {
            id: '101',
            imgUrl: "https://bellavitashop.co.uk/5462-large_default/nutella-biscuits-304g-ferrero.jpg",
            name: "Nutella biscuits",
            quantity: 5,
            isMisplaced: false
        },
        { 
            id: '102', 
            imgUrl: "https://www.colbeck.co.uk/wp-content/uploads/2017/11/Diet-Coke-330ml-021074.jpg", 
            name: "Diet coke", 
            quantity: 4, 
            isMisplaced: true 
        },
        { 
            id: '103', 
            imgUrl: "https://tastemerchants.co.uk/wp-content/uploads/2022/06/ert003-600x600.jpg", 
            name: "Hummus Chips", 
            quantity: 0, 
            isMisplaced: false
        }
    ];

    const getCalloutClass = (qty, isMisplaced) =>{
        if(qty === 0){
            return "danger";
        }
        return isMisplaced? "warning" :"info";
    }

    return (
        products.map (product => {
            const calloutClass = `callout-${getCalloutClass(product.quantity, product.isMisplaced)}`;
            return <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={product.id}>
                <div className={`card my-4 shadow bg-white rounded ${calloutClass}`}>
                        <div className="row">
                            <div className="col-5">
                                <img className="img-thumbnail" src={product.imgUrl}/>
                            </div>
                            <div className="col-6 d-flex flex-column justify-content-around align-items-center">
                                <div class="blockquote">
                                    {product.name}    
                                </div>
                                <div class="h1">
                                    {product.quantity}    
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        })
    )
}