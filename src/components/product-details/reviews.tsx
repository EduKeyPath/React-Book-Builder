import React from "react";

export default function ReviewsPage(props:any){

    return(
        <>
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
                <div className="card px-3 py-2">
                    <div className="rating-group mb-1" role="group">
                        <div className={`rating p-0 justify-content-center align-items-center d-inline-flex ${props.reviews.rating >= 1 ? 'reviewed' : ''}`}>
                            <span className="material-icons-outlined">
                                star
                            </span>
                        </div>
                        <div className={`rating p-0 justify-content-center align-items-center d-inline-flex ${props.reviews.rating >= 2 ? 'reviewed' : ''}`}>
                            <span className="material-icons-outlined">
                                star
                            </span>
                        </div>
                        <div className={`rating p-0 justify-content-center align-items-center d-inline-flex ${props.reviews.rating >= 3 ? 'reviewed' : ''}`}>
                            <span className="material-icons-outlined">
                                star
                            </span>
                        </div>
                        <div className={`rating p-0 justify-content-center align-items-center d-inline-flex ${props.reviews.rating >= 4 ? 'reviewed' : ''}`}>
                            <span className="material-icons-outlined">
                                star
                            </span>
                        </div>
                        <div className={`rating p-0 justify-content-center align-items-center d-inline-flex ${props.reviews.rating >= 5 ? 'reviewed' : ''}`}>
                            <span className="material-icons-outlined">
                                star
                            </span>
                        </div>
                    </div>
                    <h3>{props.reviews.name}</h3>
                    <p>{props.reviews.des}</p>
                </div>
            </div>
        </>
    )
}