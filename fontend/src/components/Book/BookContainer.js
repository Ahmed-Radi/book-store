import React, { Fragment, useEffect  } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import './book.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, deleteBooks, getBook } from '../../store/bookSlice';

const BookContainer = () => {
    const dispatch = useDispatch();
    const { books, isLoading, bookInfo } = useSelector(state => state.books);
    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getBooks());
    } ,[dispatch]);
    return (
        <Fragment>
            <hr className='my-5' />
            <div className='row mb-5'>
                <div className='col'>
                    <BooksList
                        isLoading={isLoading}
                        books={books}
                        isLoggedIn={isLoggedIn}
                        deleteBooks={deleteBooks}
                        getBook={getBook}
                    />
                </div>
                <div className='col side-line'>
                    <BookInfo bookInfo={bookInfo} />
                </div>
            </div>
        </Fragment>
    );
};

export default BookContainer;
