import {ARROW_UP, ARROW_DOWN, SELECT} from '../constants/keyConstant';


export const arrowUp = (data:any) => {
    return {
        type : ARROW_UP,
        payload : data
    }
}

export const arrowDown = (data:any) => ({
    type : ARROW_DOWN,
    payload : data
})

export const select = (data:any) => ({
    type : SELECT,
    payload : data
})