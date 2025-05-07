import React from "react";

export default function UpcomingProduct(props:any){

    return(
        <>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="card p-2">
                    <div className="card-img">
                        <img src={props.product.image} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">{props.product.name}</h4>
                        <p className="card-text">{props.product.des}</p>
                    </div>
                </div>
            </div>
        </>
    )
}