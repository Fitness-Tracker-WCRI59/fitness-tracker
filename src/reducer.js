import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    age: 0,
    height: 0,
    weight: 0,
    sex: '',
    goal: 0,
    calories: 0,
    days: 0,
    activityLevel: 0
};

export const statSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {

    }
});

//export const { } = statSlice.actions;