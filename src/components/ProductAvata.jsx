import React from "react";

export default function ProductAvata({image}){
  return(
    <div className="productavata">
      <img className="productavata_image" 
          src = {image} />                    
    </div>
  );
}
