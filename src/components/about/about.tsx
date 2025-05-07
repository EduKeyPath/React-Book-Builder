import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './about.css';
import useKeyPress from '../../helper/key';
import { arrowUp, arrowDown, select } from '../../redux/action/keyAction';
import VisionComponent from './vision';
import MissionComponent from './mission';


export default function AboutComponent() {
    const [list] = useState(["Cras justo odio", "Cras justo odio", "Morbi leo risus", "Porta ac consectetur ac"]);
    const arrowUpPressed = useKeyPress("ArrowUp");
    const arrowDownPressed = useKeyPress("ArrowDown");
    const currSelectedIndex = useSelector((state:any) => state.keyRuducer.selectedIndex);
    const dispatch = useDispatch();

    const keyPressHandler = (indx:any) => {
        dispatch(select(indx));
    }

    useEffect(() => {
        if (arrowUpPressed) {
            dispatch(arrowUp(list));
        }
      }, [arrowUpPressed]);
    
      useEffect(() => {
        if (arrowDownPressed) {
            dispatch(arrowDown(list));
        }
      }, [arrowDownPressed]);

    return (
        <>
            <section className="about-page">
                <h1>About us</h1>
                <div className="mb-5">
                    {
                        !!list ?
                            <div className="list-group">
                                {
                                    list.map((item, i) => (
                                        <button
                                            className={"list-group-item list-group-item-action " + (i === currSelectedIndex ? "active" : "")}                                        
                                            key={i}
                                            aria-pressed={i === currSelectedIndex}
                                            onKeyDown={(e) => {
                                                if(e.key === 'Enter'){
                                                    keyPressHandler(i);
                                                    // e.target.blur();
                                                }
                                            }}
                                            onClick={() => keyPressHandler(i)}
                                            type="button"
                                            tabIndex={i === currSelectedIndex ? 0 : -1}
                                        >
                                            {item}
                                        </button>
                                    ))
                                }
                            </div>
                            : null
                    }
                </div>
                <VisionComponent />
                <MissionComponent />
            </section>
        </>
    )
}
