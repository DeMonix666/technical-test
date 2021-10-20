import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from 'app/store/fuse/messageSlice';

const totalRecords = {
    nature : 21,
    architecture: 23,
    fashion: 22
};

export const getPhotos = createAsyncThunk('photos/list', async (params, { dispatch }) => {
    const page = (params.page * 3) + 1;

    const promises = [];

    // I dont like this style; was forced to do this cos of eslint warning. unable to call function inside for loop
    const temp = [1, 2, 3]; 

    temp.forEach((val, i) => {
        const p = i + page;

        promises.push(new Promise((resolve, reject) => {
            axios.get(`${process.env.REACT_APP_ENDPOINT}/images?page=${p}&category=${params.category}`)
            .then(function (response) {
                resolve(response);
            });
        }));
    });
    
    const result = await Promise.all(promises)
    .then((response) => {
        let photos = [];

        if (response !== undefined){
            response.forEach(data => {
                if (data.data !== undefined && data.data.length > 0) {
                    photos = [...photos, ...data.data];
                }
            });
        }

        return photos;
    }).then((data) => {
        return data;
    });

    const _data = await result;

    return {
        data: _data,
        pagination: {
            page: params.page,
            pages: Math.ceil(totalRecords[params.category] / 9),
            total: totalRecords[params.category],
            limit: 9
        }
    };
});

const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        collection:[],
        pagination: {
            page: 0,
            pages: 0,
            total: 0,
            limit: 9            
        }
    },
    reducers: {
    },
    extraReducers: {
        [getPhotos.fulfilled]: (state, action) => {
            state.collection = action.payload.data;
            state.pagination = action.payload.pagination;
        }
    }
});

export default photosSlice.reducer;
