import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Pet, PetState } from "../models/Pet";

export const initialState: PetState = {
    pets: [],
    isLoading: false,
};

export const fetchPets = createAsyncThunk('pet/fetchPets', async () => {
    const response = await fetch('http://localhost:3000/pets');
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Failed to fetch pets");
    }
});

const petSlice = createSlice({
    name: 'pet',
    initialState,
    reducers: {
        addPet: (state, action: PayloadAction<Pet>) => {
            state.pets.push(action.payload);
        },
        deletePet: (state, action: PayloadAction<string>) => {
            state.pets = state.pets.filter(pet => pet.id !== action.payload);
        },
        updatePet: (state, action: PayloadAction<Pet>) => {
            const index = state.pets.findIndex((pet) => pet.id === action.payload.id);
            if (index !== -1) {
                state.pets[index] = action.payload;
            }
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

export const { addPet, deletePet, updatePet } = petSlice.actions;
export const petReducer = petSlice.reducer;
export const selectPets = (state: RootState) => state.pet.pets;
