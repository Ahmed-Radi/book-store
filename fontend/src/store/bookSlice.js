import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { logInsert } from './reportSlice';

const initialState = {books: null, isLoading: false, error: null, bookInfo: null }

export const getBooks = createAsyncThunk('book/getBooks', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('http://localhost:3005/books');
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const insertBooks = createAsyncThunk('book/insertBooks', async (data, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
        data.userName = getState().auth.name;
        const res = await fetch('http://localhost:3005/books', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
        const books = await res.json();
        dispatch(logInsert({ name: 'insertBook', status: 'success' }))
        return books;
    }
    catch (error) {
        dispatch(logInsert({ name: 'insertBook', status: 'failed' }))
        return rejectWithValue(error.message);
    }
})

export const deleteBooks = createAsyncThunk('book/deleteBooks', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        await fetch(`http://localhost:3005/books/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        return item;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getBook = createAsyncThunk('book/getBook', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        await fetch(`http://localhost:3005/books/${item.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        return item;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const bookSlice = createSlice({
    name: 'book',
    initialState,
    extraReducers: {
        //GET Books
        [getBooks.pending]: (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [getBooks.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books = action.payload
        },
        [getBooks.rejected]: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        //INSERT Book
        [insertBooks.pending]: (state, action) =>  {
            state.isLoading = true
            state.error = null
        },
        [insertBooks.fulfilled]: (state, action) =>  {
            state.isLoading = false
            state.books.push(action.payload)
        },
        [insertBooks.rejected]: (state, action) =>  {
            state.isLoading = false
            state.error = action.payload
        },
        // DELETE Book
        [deleteBooks.pending]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        [deleteBooks.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books = state.books.filter(el => el.id !== action.payload.id)
        },
        [deleteBooks.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        //GET Book
        [getBook.pending]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        [getBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.bookInfo = action.payload;
            // console.log(action.payload)
        },
        [getBook.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    },
})

export default bookSlice.reducer