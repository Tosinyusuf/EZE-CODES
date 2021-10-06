import React from 'react';
import "./App.css";
function SingleProducts ({product})  {
    return (
        <div className="SingleProducts_wrapper">
           
                <div className="row">
                    <div className=" col-sm-12 col-md-6"><img src={product.imgUrl} alt={product.brand} /></div>
                    <div className=" col-sm-12 col-md-6 tag">
                        <div className="dev">
                            <h1>{product.name}</h1>
                            <div className="d-flex"><p className=" pr-2">Price: </p> <p >₦ {product.lowestAsk?.price}.00 </p></div>
                        <div className="d-flex"><p className=" pr-2">Storage:</p> <p > {product.lowestAsk?.storageSize}</p></div>
                        <div className="d-flex"><p className=" pr-2">Grade:</p><p > {product.lowestAsk?.grade}</p></div>
                        </div>
                        
                    </div>
                 
                </div>
           
            
        </div>
    )
}

export default SingleProducts;