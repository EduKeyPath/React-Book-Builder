import React, {useState, useEffect} from "react";
import {addBook} from '../../../../redux/action/createBookAction';
import { useSelector, useDispatch } from "react-redux";
import './add-product.css';

export default function AddProduct(props:any){    
    const [lType, setLType] = useState('free');
    const booksList = ['Math', 'English', 'Physics', 'Science'];
    const grade = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
    const [bType, setBType] = useState('');
    const [bGrade, setBGrade]:any = useState([]);
    const [bName, setBName] = useState('');
    const [bDes, setBDes] = useState('');
    const [bPrice, setBPrice] = useState('');
    const [bImage, setBImage] = useState('');
    const [errorData, setErrorData]:any = useState({});
    const dispatch:any = useDispatch();
    const createBookItems = useSelector((state:any) => state.createBookReducer.books )

    useEffect(() => {
        if(!!createBookItems){
            setLType(createBookItems.lType);
            setBType(createBookItems.bType);
            setBGrade(createBookItems.grade);
            setBName(createBookItems.name);
            setBPrice(createBookItems.price);
            setBDes(createBookItems.des);
            setBImage(createBookItems.image);
        }
    }, [createBookItems]);
    
    const toggleGrade = (item:any) => {
        let currGrade:any = [...bGrade];
        let selIndx = currGrade.indexOf(item);

        if(selIndx > -1){
            currGrade.splice(selIndx, 1);
            setBGrade(currGrade);
        }else {
            currGrade.push(item);
            setBGrade(currGrade);
        }
    }

    const validateForm = () => {
        let error = false;
        let errorDataCln:any = {...errorData}
        if(!!!bName){
            error = true;
            errorDataCln.bName = 'Please enter book name';
        }
        setErrorData(errorDataCln);
        return !error;
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        let isValid = validateForm();

        if(isValid){
            const data = {
                'listingType'   : lType,
                'bookType'   : bType,
                'grade'  : bGrade,
                'name'   : bName,
                'price'  : bPrice,
                'des'    : bDes,
                'qty' : 5,
                'isHighDemand' : "no",
                'largeImg' : "https://img.freepik.com/free-vector/abstract-elegant-winter-book-cover_23-2148798745.jpg?w=2000",
                'image'  : !!bImage ? bImage : 'https://cdn-icons-png.flaticon.com/512/7734/7734301.png',
                'otherImages': [
                    "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
                    "https://www.adobe.com/express/create/cover/media_181e3d2c78f153ae7bf0e19a2faeb9a76e234da30.jpeg?width=400&format=jpeg&optimize=medium",
                    "https://pub-static.fotor.com/assets/projects/pages/dddda0b59fb9433eb53e7174981c8b67/blue-minimal-novel-cover-6e355184dc3545c6bec6a9f618f83e0d.jpg",
                    "https://www.adobe.com/express/create/cover/media_1a1c99c9bbc4c5bd26974a96b19b1cdaee9bc866c.jpeg?width=400&format=jpeg&optimize=medium",
                    "https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg"
                ],
            }
            props.setSteps(2);
            dispatch(addBook(data));
        }
    }

    return(
        <>
            <div className="addProduct-wrap">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="addProduct-wrap-inner">
                                <div className="mb-3">
                                    <label className="input-label">Listing Type</label>
                                    <section>
                                        <div className="form-check form-check-inline">
                                            <input onChange={() => setLType('free')} className="form-check-input" type="radio" name="ltype" id="free" value="free" checked={lType === 'free'} />
                                            <label className="form-check-label" htmlFor="free">
                                                Free
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={() => setLType('paid')} className="form-check-input" type="radio" name="ltype" id="paid" value="paid" checked={lType === 'paid'} />
                                            <label className="form-check-label" htmlFor="paid">
                                                Paid
                                            </label>
                                        </div>
                                    </section>
                                </div>
                                <div className="mb-3">
                                    <label className="input-label">Book Type</label>
                                    <select value={bType} className="form-control" onChange={(e) => setBType(e.target.value)}>
                                        <option>Select Book Type</option>
                                        {
                                            booksList.map((item, k) => {
                                                return (
                                                    <option key={k} value={item}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="input-label">Grade</label>
                                    <section>
                                        {
                                            grade.map((item, k) => {
                                                return(
                                                    <div key={k} className="form-check form-check-inline">
                                                        <input className="form-check-input" id={`grade_${k}`} type="checkbox" checked={bGrade.includes(item)} onChange={(e) => toggleGrade(e.target.value)} value={item} />
                                                        <label className="form-check-label" htmlFor={`grade_${k}`}>
                                                            {item}
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </section>
                                </div>
                                <div className="mb-3">
                                    <label className="input-label">Book Name</label>
                                    <input type="text" onChange={(e) => setBName(e.target.value)} value={bName} className="form-control" />
                                    {
                                        (!!errorData.bName) ?
                                        <p className="alert alert-danger my-1">Please enter book name</p>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="addProduct-wrap-inner">
                                <div className="mb-3">
                                    <label className="input-label">Book Price</label>
                                    <input type="number" onChange={(e) => setBPrice(e.target.value)} value={bPrice} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="input-label">Book Image</label>
                                    <input type="text" onChange={(e) => setBImage(e.target.value)} value={bImage} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="input-label">Book Description</label>
                                    <textarea className="form-control" onChange={(e) => setBDes(e.target.value)} value={bDes}>{bDes}</textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">                            
                            <div className="mt-3 text-center">
                                <button className="ds-btn ds-btn--primary">Save & Next</button>
                            </div>
                        </div>
                    </div>
                    
                </form>
            </div>
        </>
    )
}