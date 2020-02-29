import { CLICK_DELETE_VALUE, CLICK_FILTER_VALUE, CLICK_SORT_VALUE, CLICK_PAGINATE } from "./actionsTypes";
import utils from "../utils";

const deleteItem = (id) => {
    return {
        type: CLICK_DELETE_VALUE,
        payload: id
    }
}

const filterItemsBy = (property = {}) =>{
    console.log('filterItemsBy: ', property)
    return {
        type: CLICK_FILTER_VALUE,
        payload: property
    }
}

const sortElementsBy = (property = {}) =>{
    let data = null;
    if(property.key && property.order && property.rows){
        data = property.rows;
        data.sort(utils.compareValues(property.key, property.order));
    }
    return{
        type: CLICK_SORT_VALUE,
        payload: data
    }
}

const paginate = (objToPagination) => {    //items = [], page, per_page
    var page = objToPagination.page || 1,
    per_page = objToPagination.per_page || 10,
    items = objToPagination.items,
    offset = (page - 1) * per_page,    
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);    

    return {
        type: CLICK_PAGINATE,
        payload: {
            page: page,
            per_page: per_page,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            total: items.length,
            total_pages: total_pages,
            data: paginatedItems
        }
    }
}

export default {
    deleteItem,
    filterItemsBy,
    sortElementsBy,
    paginate
}