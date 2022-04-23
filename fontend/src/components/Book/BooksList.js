import React from 'react';
import { useDispatch } from 'react-redux';

const BooksList = ({ books, isLoading, isLoggedIn, deleteBooks, getBook }) => {

    const dispatch = useDispatch()
    const bookList = books &&  books.length > 0 ?  books && books?.map(item => (
            <li className='list-group-item d-flex  justify-content-between align-items-center' key={item.id}>
                <div>{item.title}</div>
                <div className='btn-group' role='group'>
                    <button type='button' className='btn btn-primary'
                        onClick={() => dispatch(getBook(item)).unwrap()
                            .then((originalPromiseResult) => {
                                // console.log(originalPromiseResult)
                            })
                            .catch((rejectedValueOrSerializedError) => {
                                // console.log(rejectedValueOrSerializedError)
                            })}
                    >
                        Read
                    </button>
                    {isLoggedIn ? <button type='button' className='btn btn-danger'
                        onClick={() => dispatch(deleteBooks(item)).unwrap()
                            .then((originalPromiseResult) => {
                                console.log(originalPromiseResult)
                            })
                            .catch((rejectedValueOrSerializedError) => {
                                console.log(rejectedValueOrSerializedError)
                            })}
                    >
                        Delete
                    </button> : ''}
                </div>
            </li>
        )
    ) : 'No book to show'

    return (
        <div>
            <h2>Books List</h2>
            {
                isLoading ?
                'loading...': (
                    <ul className='list-group'>
                        {bookList}
                    </ul>
                )
            }
        </div>
    );
};

export default BooksList;
