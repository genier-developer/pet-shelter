// src/features/petSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {Pet, PetState} from "../models/Pet";

export const initialState: PetState = {
    pets: [],
    isLoading: false,
};

export const fetchPets = createAsyncThunk('pet/fetchPets', async () => {
    const response = await fetch('http://localhost:3000/pets');
    return response.json();
});

const petSlice = createSlice({
    name: 'pet',
    initialState,
    reducers: {
        addPet: (state, action: PayloadAction<Pet>) => {
            state.pets.push(action.payload);
        },
        updatePet: (state, action: PayloadAction<Pet>) => {
            const index = state.pets.findIndex((pet) => pet.id === action.payload.id);
            if (index !== -1) {
                state.pets[index] = action.payload;
            }
        },
        removePet: (state, action: PayloadAction<string>) => {
            state.pets = state.pets.filter((pet) => pet.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pets = action.payload;
            })
            .addCase(fetchPets.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { addPet, updatePet, removePet } = petSlice.actions;

export const selectPets = (state: RootState) => state.pet.pets;

export const petReducer = petSlice.reducer;


