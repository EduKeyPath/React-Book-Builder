import AuthorProduct from '../../author-product/author-product';
import './viewer.css';

export default function BookViewer(){
    const productView:boolean = true;
    
    return(
        <>
            <div className="book-viewer-container">
                <AuthorProduct productView={productView} />
            </div>
        </>
    )
}