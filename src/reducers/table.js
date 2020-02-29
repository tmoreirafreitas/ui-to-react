import { CLICK_PAGINATE, CLICK_FILTER_VALUE, CLICK_SORT_VALUE } from "../actions/actionsTypes";

const table = (state = {}, action) => {
    switch(action.type){
        case CLICK_FILTER_VALUE:
            return {
                ...state,
                payload: action.payload
            }
        case CLICK_SORT_VALUE:
            return {
                ...state,
                payload: action.payload
            }
        case CLICK_PAGINATE:            
            return {
                ...state,
                payload: action.payload,
                paginated: true,
            }
        default:
            return state
    }
}

export default table;