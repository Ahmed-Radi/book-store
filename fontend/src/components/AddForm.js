import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertBooks } from '../store/bookSlice';

const Addform = () => {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)

    // using useRef
    // const title = useRef(null)
    // const price = useRef(null)
    // const description = useRef(null)
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = {
    //         title: title.current.value,
    //         price: price.current.value,
    //         description: description.current.value
    //     }
    //     dispatch(insertBooks(formData))
    //     title.current.value = null
    //     price.current.value = null
    //     description.current.value = null
    // }

    // using UseState
    const [title, setTitle] = useState(null)
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState(null)
    // use useRef to clear inputs
    const titleInput = useRef(null)
    const priceInput = useRef(null)
    const descriptionInput = useRef(null)

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            title,
            price,
            description,
        }
        dispatch(insertBooks(formData))

        titleInput.current.value = null
        priceInput.current.value = null
        descriptionInput.current.value = null
    }
    return (
        <div className='row'>
            <div className='col-6 offset-3 mt-3'>
                <h2>Insert Book</h2>
                <form onSubmit={e => handleSubmit(e)}>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' className='form-control' id='title' required
                        ref={titleInput}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='price'>Price</label>
                    <input type='number' className='form-control' id='price' required
                        ref={priceInput}
                        onChange={e => setPrice(+e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='Description'>Description</label>
                    <textarea
                        className='form-control mb-2'
                        id='Description'
                        rows='3'
                        required
                        ref={descriptionInput}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type='submit' className='btn btn-primary' disabled={!isLoggedIn}>
                    Submit
                </button>
                </form>
            </div>
        </div>
    );
};

export default Addform;
