import {memo} from "react";
import '../product/product.css';

const SimProduct = (props:any) => {
    return (
        <>
            {
                props.similarProducts.map((item:any, k:any) => {
                    return <div key={k} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                        <div className="card p-2">
                            <div className="card-img">
                                <img src={item.image} className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.des}</p>
                                <button onClick={() => props.goToDetails(item.id)} className="ds-btn ds-btn--secondary mt-0">Details</button>
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    )
}

export default memo(SimProduct);