import { configureStore }  from '@reduxjs/toolkit';
import loginReducer from '../reducers/login/loginSlice';

export const store = configureStore({
    reducer: {
        user:loginReducer
    }
});