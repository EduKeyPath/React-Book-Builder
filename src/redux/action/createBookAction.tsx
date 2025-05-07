import {ADD_BOOK, GET_PAGE_DATA, ADD_PAGE, DELETE_PAGE, SAVE_AUTHOR_DATA, PUBLISH_BOOK} from '../constants/createBookConstant';

export const addBook = (data:any) => ({
    type : ADD_BOOK,
    payload : data
})

// export const getPageData = () => ({
//     type : GET_PAGE_DATA
// })

// export const addPage = (data:any) => ({
//     type : ADD_PAGE,
//     payload : data
// })

// export const deletePage = (data:any) => ({
//     type : DELETE_PAGE,
//     payload : data
// })

export const saveAuthorData = (data:any) => ({
    type : SAVE_AUTHOR_DATA,
    payload : data
})

export const publishBook = () => ({
    type : PUBLISH_BOOK
})
