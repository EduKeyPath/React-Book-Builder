import React, {useState, useEffect} from "react";
import ImageToText from '../create-course/author-product/image-to-text/image-to-text';
import AudioToText from '../create-course/author-product/audio-to-text/audio-to-text';
import './modal.css';

export default function CustomModal(props:any){ 
    const [insertData, setInsertData] = useState("");

    const insertContent = (data:any) => {
        setInsertData(data);
    }

    return(
        <>
            <div className="custom-modal-wrap">
                <div className="custom-modal-body">
                    <div className="custom-modal-header">
                        <h2 className="custom-modal-title">Create Content</h2>
                        <button type="button" onClick={props.showModal} id="" className="ds-btn ds-btn--tertiary ds-btn-icon modal-close">
                            <span className="material-icons-outlined ds-btn__icon" aria-hidden="true">close</span>
                        </button>
                    </div>
                    <div className="custom-modal-content">
                        {
                            !!props.modalType && props.modalType === 'image' ? 
                            <ImageToText insertImgContent={insertContent} />
                            : <AudioToText insertAudioContent={insertContent} />
                        }                        
                    </div>
                    <div className="custom-modal-footer">
                        <button type="button" id="" onClick={props.showModal} className="ds-btn ds-btn--link me-3">Close</button>{/*  */}
                        <button type="button" id="" onClick={() => props.insertContentEditor(insertData)} disabled={!insertData ? true:false} className="ds-btn ds-btn--primary">Insert to editor</button>
                    </div>                  
                </div>                
            </div>
        </>
    )
}