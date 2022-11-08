class DB{
    constructor(){
        this.productsAlignment = [
            {
                id: '101',
                imgUrl: "https://bellavitashop.co.uk/5462-large_default/nutella-biscuits-304g-ferrero.jpg",
                name: "Nutella biscuits",
                quantity: 0,
                isMisplaced: false
            },
            { 
                id: '102', 
                imgUrl: "https://www.colbeck.co.uk/wp-content/uploads/2017/11/Diet-Coke-330ml-021074.jpg", 
                name: "Diet coke",
                quantity: 0,
                isMisplaced: false
            },
            { 
                id: '103', 
                imgUrl: "https://tastemerchants.co.uk/wp-content/uploads/2022/06/ert003-600x600.jpg", 
                name: "Hummus Chips",
                quantity: 0,
                isMisplaced: false
            }
        ]
    }

    getProducts(){
        return this.productsAlignment;
    }
    
    setProducts(productsAlignment){
        this.productsAlignment = productsAlignment;
    }
}


module.exports = { DB };