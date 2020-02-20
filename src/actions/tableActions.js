import { CLICK_DELETE_VALUE, CLICK_FILTER_VALUE, CLICK_SORT_VALUE, CLICK_PAGINATE } from "./actionsTypes"

const deleteItem = (id) => {    
    return {
        type: CLICK_DELETE_VALUE,
        payload: id
    }
}

const filterItemsBy = (property = {}) =>{
    return {
        type: CLICK_FILTER_VALUE,
        payload: property
    }
}

const sortElementsBy = (property = {}) =>{
    return{
        type: CLICK_SORT_VALUE,
        payload: property
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