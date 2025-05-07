import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {saveAuthorData} from '../../../../redux/action/createBookAction';
import CustomModal from '../../modal/modal';
import ContentEditor from './editor/editor';
import PagesList from './pages/page';
import './author-product.css';

export default function AuthorProduct(props:any){
    const dispatch:any = useDispatch();
    const intBookData = useSelector((state:any) => state.createBookReducer.books)
    const [pagesData, setPageData]:any = useState([]);
    const [curPageData, setCurPageData]:any = useState({});
    const [curPageId, setCurPageId] = useState(1);
    const [modalType, setModalType] = useState('');
    const [toggleModal, setToggleModal] = useState(false);
    
    const showModal = (type:string) => {
        if(type === 'image'){
            setModalType('image');
        }
        if(type === 'audio'){
            setModalType('audio');
        }
        setToggleModal(!toggleModal);
    }

    useEffect(() => {
        if(intBookData){
            console.log(intBookData, 'intBookData')
            setPageData(intBookData.pages)
        }
    }, [intBookData]);

    useEffect(() => {
        if(!!pagesData){
            let pageObj = pagesData.find((item:any) => {
                return item.pageId === curPageId;
            })
            setCurPageData(pageObj);
        }
    }, [!!pagesData && pagesData.length > 0]);

    const addPage = () => {
        let curPageList = [...pagesData];
        const newPageData = {
            pageId : curPageList.length + 1,
            pagenName : "Page " + (curPageList.length + 1),
            pageContent : "Page " + (curPageList.length + 1) + " content - This is CKeditor dynamic content"
        }
        const pageArr = [...curPageList, newPageData];
        dispatch(saveAuthorData(pageArr));
        // setPageData(pageArr);
    }

    const openPageDetails  = (pageId:any) => {
        setCurPageId(pageId);
        let pageObj = pagesData.find((item:any) => {
            return item.pageId === pageId;
        })
        setCurPageData(pageObj);
    }

    const deletePage = (pageId:any) => {
        let pageIndex = pagesData.findIndex((item:any) => {
            return item.pageId === pageId;
        })
        let bookDataforDel = [...pagesData]; 
        bookDataforDel.splice(pageIndex, 1);
        dispatch(saveAuthorData(bookDataforDel));
        // setPageData(bookDataforDel);
    }

    const saveCurAuthorData = (e:any) => {
        const pageArr = [...pagesData];
        let pageIndex = pageArr.findIndex((item:any) => {
            return item.pageId === e.pageId;
        })
        pageArr[pageIndex] = e;
        dispatch(saveAuthorData(pageArr));
        // setPageData(pageArr);
    }

    const insertContentEditor = (content:any) => {
        let pageObj = pagesData.find((item:any) => {
            return item.pageId === curPageId;
        })
        pageObj.pageContent = content;
        setCurPageData({...pageObj});
        setToggleModal(false);
    }

    const handleSubmit = () => {
        if(pagesData){
            dispatch(saveAuthorData(pagesData));
            props.setSteps(3);
        }
    }
    
    return(
        <>
            <div className="author-container d-flex my-3">
                <PagesList productView={props.productView} pageData={pagesData} addPage={addPage} openPageDetails={openPageDetails} deletePage={deletePage} />
                <div className="auth-right-panel">
                    <div className="auth-right-panel-container">
                        {
                            !props.productView ? 
                            <div className="heading-bar d-flex justify-content-between mb-2">
                                <h4>Author Content</h4>
                                <div>
                                    <button type="button" onClick={() => showModal('audio')} id="" className="ds-btn ds-btn--link me-2">
                                        <span className="material-icons-outlined ds-btn--icon ds-btn--icon__start" aria-hidden="true">mic_external_on</span>Audio to content
                                    </button>
                                    <button type="button" onClick={() => showModal('image')} id="" className="ds-btn ds-btn--link">
                                        <span className="material-icons-outlined ds-btn--icon ds-btn--icon__start" aria-hidden="true">image</span>Image to content
                                    </button>
                                </div>
                            </div>
                            : null
                        }
                        {
                            !!toggleModal ? <CustomModal modalType={modalType} showModal={showModal} insertContentEditor={insertContentEditor}  /> : null
                        }
                        <ContentEditor productView={props.productView} curPageData={curPageData} saveCurAuthorData={saveCurAuthorData} />
                    </div>
                </div>
            </div>
            {
                !props.productView ?
                <div className="col-12">                            
                    <div className="m-3 text-center">
                        <button onClick={() => handleSubmit()} className="ds-btn ds-btn--primary">Save & Next</button>
                    </div>
                </div>
                : null
            }
        </>
    )
}