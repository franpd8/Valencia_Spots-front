import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
    comments: [],
    pagination:{},
    comment: {},
    message: "",
    isLoading: false
};

export const getComments = createAsyncThunk("comments/getComments", async (data, thunkAPI) => {
    try {
        return await commentsService.getComments(data);
    } catch (error) {
        console.log(error)
    }
});

export const createComment = createAsyncThunk("comment/", async (commentData) => {
    try {
        return await commentsService.createPost(commentData);
    } catch (error) {
        console.error(error)
    }
});

export const updateComment = createAsyncThunk("comment/update", async (data, thunkAPI) => {
    try {

        return await commentsService.updatePost(data);
    } catch (error) {

        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteComment = createAsyncThunk("comment/deleteComment", async (id, thunkAPI) => {
    try {
        let action = await commentsService.deleteComment(id);
        if (action.comment == null) {
            return thunkAPI.rejectWithValue(action)
        }
        return action
    } catch (error) {
        const message = error.response.data;
        return thunkAPI.rejectWithValue(message);
    }
});

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = "";
            state.isSuccess = false;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getComments.fulfilled, (state, action) => {
            console.log(action.payload)
            console.log(state.comments)
            state.comments = action.payload.comments;
            state.pagination = {
                total: action.payload.total,
                page: action.payload.page,
                maxPages: action.payload.maxPages
            }
        })
        .addCase(deleteComment.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false;
            state.message = action.payload.message;
        })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(
                    (comment) => comment._id !== action.payload.comment._id);
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload.message
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const comments = state.comments.map((comment) => {
                    if (comment._id === action.payload.comment._id) {
                        comment = action.payload.post;
                    }
                    return comment;
                });
                state.comments = comments
                state.isSuccess = true
                state.isError = false;
                state.message = action.payload.message
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments = [action.payload, ...state.comments];
            })
    }
});

export default commentsSlice.reducer;