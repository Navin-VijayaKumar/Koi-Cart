import React, { createContext, useEffect, useState } from "react";

export const Shopcontext = createContext(null);
import sampleFishData from "../Components/dataset"; // Assuming this is the path to your dataset file


const ShopcontextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    useEffect(() => {
     fetch('http://localhost:3000/get-koi')
         .then((Response)=>Response.json())
         .then((data)=> setAll_Product(data))


    }, [])



    const contextValue = { all_product };

    return (
        <Shopcontext.Provider value={contextValue}>
            {props.children}
        </Shopcontext.Provider>
    );
};

export default ShopcontextProvider;