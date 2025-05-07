import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import './product.css';

export default function ProductViewer(){
    const [bookDetails, setBookdetails] = useState({ listingType  : '', bookType  : '', grade  : [], name   : '', price  : '', des    : '', image  : ''});
    const bookItems = useSelector((state:any) => state.createBookReducer.books )

    useEffect(() => {
        if(!!bookItems){
            setBookdetails(bookItems);
        }
    }, [bookItems]);
    
    return(
        <>
            <div className="product-viewer-container ms-3">
                <div className="card">
                        {
                            !!bookDetails ?
                            <div className="row">
                                <div className="col-12">
                                    <div className="card-img">
                                        <img src={!!bookDetails.image ? bookDetails.image : 'https://cdn-icons-png.flaticon.com/512/7734/7734301.png'} className="card-img-top" alt="..." />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card-body">
                                        <h2 className="card-title">{bookDetails.name}</h2>
                                        <p className="text-capitalize">Listing Type: {bookDetails.listingType}</p>
                                        <p>Book Type: {bookDetails.bookType}</p>
                                        <p>Grade: {bookDetails.grade}</p>
                                        <p className="price mt-2">&#8377;{bookDetails.price}</p>
                                        <p className="card-text text-truncate mb-0">{bookDetails.des}</p>
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                    
                </div>
            </div>
        </>
    )
}