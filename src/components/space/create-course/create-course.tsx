import React, { useState } from "react";
import AddProduct from './add-product/add-product';
import AuthorProduct from './author-product/author-product';
import PreviewProduct from './preview-product/preview-product';
import '../space';
import './create-course.css';

export default function CreateCourses() {
    const steps = {step1 : 1, step2: 2, step3: 3}
    const [curSteps, setCurSteps] = useState(steps.step1);

    const setSteps = (stepNum:any) => {
        setCurSteps(stepNum);
    }

    return (
        <>
            <section className="space-container">
                <div className="container-bar">
                    <h2>Create Book</h2>
                    <div className="tab-menu">
                        <button type="button" onClick={() => setSteps(steps.step1)} className={"ds-btn " + (curSteps > 0 && curSteps <= 3 ? 'ds-btn--primary' : 'ds-btn--secondary')}>1. Intro</button>
                        <button type="button" onClick={() => setSteps(steps.step2)} className={"ds-btn " + (curSteps > 1 && curSteps <= 3 ? 'ds-btn--primary' : 'ds-btn--secondary')}>2. Author</button>
                        <button type="button" onClick={() => setSteps(steps.step3)} className={"ds-btn " + (curSteps > 2 && curSteps <= 3 ? 'ds-btn--primary' : 'ds-btn--secondary')}>3. Preview</button>
                    </div>
                </div>
                <div className="spcae-container-inner">
                    {
                        !!curSteps && curSteps === 1 ? 
                        <AddProduct setSteps={setSteps} />
                        : null
                    }
                    {
                        !!curSteps && curSteps === 2 ? 
                        <AuthorProduct setSteps={setSteps} />
                        : null
                    }
                    {
                        !!curSteps && curSteps === 3 ? 
                        <PreviewProduct />
                        : null
                    }
                </div>
            </section>
        </>
    )
}