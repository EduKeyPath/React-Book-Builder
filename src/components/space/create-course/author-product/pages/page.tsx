import React, {useState, useEffect} from "react";
import './page.css';

export default function PagesList(props:any){
    const [pageData, setPageData] = useState(props.pageData);
    const [pageId, setPageId] = useState(1);

    useEffect(() => {
        setPageData(props.pageData);
    }, [props.pageData]);

    const openPage = (pId:any) => {
        setPageId(pId)
        props.openPageDetails(pId);
    }

    return(
        <>
            <div className="auth-left-panel">
                {
                    !props.productView ? 
                    <div className="new ms-2">
                        <button type="button" onClick={props.addPage} className="ds-btn ds-btn--tertiary ds-btn-icon">
                            <span className='material-icons-outlined ds-btn__icon' aria-hidden='true'>add</span>
                        </button>
                    </div>
                    : null
                }
                <div className="list-menu">
                    <ul className="list">
                        {
                            !!pageData ? 
                            <>
                                {
                                    pageData.map((item:any, k:any) => {
                                        return (
                                            <li className="list-item" key={k}>
                                                <div className={`ds-btn ds-btn--tertiary list-item-btn ${item.pageId === pageId ? 'active' : ''}`}>
                                                    <button type="button" onClick={() => openPage(item.pageId)} className="ds-btn ds-btn--link btn-text">{item.pagenName}</button>
                                                    {
                                                        !props.productView ? 
                                                        <>
                                                            {
                                                                item.pageId !== pageId ?
                                                                <button type="button" onClick={() => props.deletePage(item.pageId)} className="ds-btn ds-btn--tertiary ds-btn-icon"><span className="material-icons-outlined ds-btn__icon" aria-hidden="true">delete</span></button>
                                                                : null
                                                            }
                                                        </>
                                                        : null
                                                    }                                                 
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </>                            
                            : null
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}