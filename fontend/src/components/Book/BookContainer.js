import React, { Fragment, useEffect, useState } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import './book.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, deleteBooks, getBook } from '../../store/bookSlice';

const BookContainer = () => {
    const [getBookInfo, setGetBookInfo] = useState({})
    const dispatch = useDispatch();
    const { books, isLoading, bookInfo } = useSelector(state => state.books);
    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getBooks());
    } ,[dispatch]);

    const getBookId = (id) => {
        const selectedBook = books.find(book => book.id === id)
        setGetBookInfo(prev => ({...prev, ...selectedBook}))
    }

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
                        // getBook={getBook}
                        getBookId={getBookId}
                    />
                </div>
                <div className='col side-line'>
                    <BookInfo bookInfo={bookInfo} getBookInfo={getBookInfo} />
                </div>
            </div>
        </Fragment>
    );
};

export default BookContainer;
