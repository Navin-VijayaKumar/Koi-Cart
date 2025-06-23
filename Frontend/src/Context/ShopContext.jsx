import React, { createContext, useEffect, useState } from "react";

export const Shopcontext = createContext(null);
import sampleFishData from "../Components/dataset"; // Assuming this is the path to your dataset file


const ShopcontextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    useEffect(() => {
        // fetch('https://pc-factory-backend.onrender.com/allproducts')
        // .then((Response)=>Response.json())
        // .then((data)=>setAll_Product(data))
        setAll_Product(sampleFishData);


    }, [])



    const contextValue = { all_product };

    return (
        <Shopcontext.Provider value={contextValue}>
            {props.children}
        </Shopcontext.Provider>
    );
};

export default ShopcontextProvider;