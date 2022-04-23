import React, { Fragment } from 'react';

const BookInfo = ({ bookInfo, getBookInfo }) => {
    return (
        <Fragment>
            <h2>Book Details</h2>
            {
                Object.values(getBookInfo).length === 0 ?
                <div className='alert alert-secondary' role='alert'>
                    There is no book selected yet. Please select!
                </div> :
                <div key={getBookInfo.id}>
                    <p className='fw-bold'>Title: {getBookInfo.title}</p>
                    <p className='fw-light'>Description:{getBookInfo.description}</p>
                    <p className='fst-italic'>Price:{getBookInfo.price}</p>
                </div>
            }
        </Fragment>
    );
};

export default BookInfo;
