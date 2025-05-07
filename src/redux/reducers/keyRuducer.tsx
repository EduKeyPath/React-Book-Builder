
const initialState = { selectedIndex: 0 };

export const keyRuducer = (state = initialState, action:any) => {
    switch (action.type) {
        case "ARROW_UP":
            return {
                selectedIndex:
                    state.selectedIndex !== 0 ? state.selectedIndex - 1 : action.payload.length - 1
            };
        case "ARROW_DOWN":
            return {
                selectedIndex:
                    state.selectedIndex !== action.payload.length - 1 ? state.selectedIndex + 1 : 0
            };
        case "SELECT":
            return { selectedIndex: action.payload };
        default:
            return state;
    }
}