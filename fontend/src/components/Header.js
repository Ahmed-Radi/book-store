import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isLogInOut } from '../store/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.books)
    const { isLoggedIn } = useSelector(state => state.auth)

    return (
        <>
            <nav className='navbar navbar-dark bg-dark container-fluid'>
                <span className='navbar-brand mb-0 h1'>My Books</span>
                <button className='btn btn-outline-primary' type='submit'
                    onClick={() => dispatch(isLogInOut())}
                >
                    {isLoggedIn ? 'Log Out' : 'Log In'}
                </button>
            </nav>
            {error && <div className="alert alert-danger" role="alert">
                {error}
            </div>}
        </>
    );
};

export default Header;
