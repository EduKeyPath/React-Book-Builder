import React from "react";
import './page.css';


class NoPageComponent extends React.Component {
    render(){
        return(
            <>
                <section className="no-page">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>Sorry, but the requested page is not found.</p>
                </section>
            </>
        )
    }
}

export default NoPageComponent;