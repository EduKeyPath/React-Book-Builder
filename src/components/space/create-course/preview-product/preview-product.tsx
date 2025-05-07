import {publishBook} from '../../../../redux/action/createBookAction';
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import BookViewer from './viewer/viewer';
import ProductViewer from './product/product';
import './preview-product.css';

export default function PreviewProduct(){
    const history = useNavigate();
    const dispatch:any = useDispatch();   
    
    const handleSubmit = () => {
        dispatch(publishBook());
        history(`/space/books/`);
    }
    
    return(
        <>
            <div className="author-container preview-product-container d-flex my-3">
                <div className="auth-left-panel">
                    <ProductViewer />
                </div>
                <div className="auth-right-panel">
                    <div className="auth-right-panel-container">
                        <BookViewer />
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="m-3 text-center">
                    <button onClick={handleSubmit} className="ds-btn ds-btn--primary">Publish</button>
                </div>
            </div>
        </>
    )
}