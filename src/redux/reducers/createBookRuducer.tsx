import {ADD_BOOK, GET_PAGE_DATA, ADD_PAGE, DELETE_PAGE, SAVE_AUTHOR_DATA, PUBLISH_BOOK} from '../constants/createBookConstant';
import callApi from '../../helper/api';

const initialsate = {
    books : {
        listingType  : '',
        bookType  : '',
        grade  : '',
        name   : '',
        qty : 5,
        price  : '',
        isHighDemand : "no",
        des    : '',
        image  : '',
        largeImg : "https://img.freepik.com/free-vector/abstract-elegant-winter-book-cover_23-2148798745.jpg?w=2000",
        otherImages: [
            "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
            "https://www.adobe.com/express/create/cover/media_181e3d2c78f153ae7bf0e19a2faeb9a76e234da30.jpeg?width=400&format=jpeg&optimize=medium",
            "https://pub-static.fotor.com/assets/projects/pages/dddda0b59fb9433eb53e7174981c8b67/blue-minimal-novel-cover-6e355184dc3545c6bec6a9f618f83e0d.jpg",
            "https://www.adobe.com/express/create/cover/media_1a1c99c9bbc4c5bd26974a96b19b1cdaee9bc866c.jpeg?width=400&format=jpeg&optimize=medium",
            "https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg"
        ],
        pages : [{
            pageId : 1,
            pagenName : "Page 1",
            pageContent : "<p>Page 1 content - This is CKeditor dynamic content</p>"
        }]
    }
};

export const createBookReducer = (state = initialsate, action:any) => {
    switch(action.type){
        case ADD_BOOK : 
            let bookObj = {...action.payload};
            // let newBook = {...state.books, ...bookObj};
            let test = {...state, books: {...state.books, ...bookObj}}
            console.log(test, 'test')
            return {...state, books: {...state.books, ...bookObj}}
            break;

        // case GET_PAGE_DATA : 
        //     return {...product}
        // break;

        // case ADD_PAGE : 
        //     return {...state}
        // break;

        // case DELETE_PAGE : 
        //     return {...state}
        // break;

        case SAVE_AUTHOR_DATA : 
            let pagesArr = [...action.payload];
            let newPageBook = {...state.books, pages: pagesArr};
            return {...state, books: newPageBook}
        break;

        case PUBLISH_BOOK : 
            let cartRc = publishProduct({...state});
            return {cartRc}
        break;
        
        default :
            return state;
    }

}


const publishProduct = async (newData:any) => {
    try {
      const response:any = await callApi('GET', '/data.json');
      const res = response.data.data;
      const resP = res.product;
      newData.books.id = resP.length + 1;
      resP.push(newData.books);
      console.log(resP, 'res');
    } 
    catch (error) {
      console.error(error);
    }
}