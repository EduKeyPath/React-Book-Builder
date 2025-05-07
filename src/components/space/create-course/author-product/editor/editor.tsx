import React, {useState, useEffect} from "react";
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import './editor.css';

export default function ContentEditor(props:any){
    const [curPageData, setCurPageData]:any = useState({});
    const [authorData, setAuthorData] = useState('');

    const handleModelChange= (event:any)=>{
        // console.log(event, 'event')
        setAuthorData(event);
        let updatePageObj = {...curPageData}
        updatePageObj.pageContent = event;
        setCurPageData(updatePageObj);
        props.saveCurAuthorData(curPageData);
    }

    useEffect(() => {
        const authObj = props.curPageData;
        if(!!authObj && authObj.pageContent){
            setCurPageData(authObj);
            setAuthorData(authObj.pageContent);
        }
        // console.log(props.curPageData, 'props.curPageData')
    }, [props.curPageData]);

    // console.log(curPageData, 'curPageData');
    
    
    return(
        <>
            {
                !props.productView ? 
                <FroalaEditorComponent 
                    tag='textarea'
                    model={authorData}
                    onModelChange={handleModelChange}
                />
                : 
                <div className="preview-content"  dangerouslySetInnerHTML={{
                    __html: authorData
                  }}>
                    {/* {authorData} */}
                </div>
            }
        </>
    )
}