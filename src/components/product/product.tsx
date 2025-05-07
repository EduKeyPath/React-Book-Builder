import React from "react";
import { useNavigate } from "react-router-dom";

export default function Product(props:any){
    const history = useNavigate();

    const goDetails = (pId:any) => {
        history(`/product-details/${pId}`);
    }

    return(
        <>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="card p-2">
                    {
                        (props.product.isHighDemand === 'yes') ?
                        <span className="badge rounded-pill bg-danger position-absolute high">High Demand</span>
                        : null
                    }
                    <div className="card-img">
                        <img src={props.product.image} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">{props.product.name}</h2>
                        <p className="card-text mb-0">{props.product.des}</p>
                        <p className="h5 mt-2">&#8377;{props.product.price}</p>
                        <button className="ds-btn ds-btn--primary" onClick={() => goDetails(props.product.id)}>Details</button>
                    </div>
                </div>
            </div>
        </>
    )
}