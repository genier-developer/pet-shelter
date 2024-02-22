import { PetItem } from "./PetItem";
import { useState } from "react";
import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { AddNewPet } from "./AddNewPet";
import { useAppSelector } from "../app/hooks";
import { selectPets } from "../features/petSlice";
import {Pet} from "../models/Pet.ts";

export const PetList = () => {
    const pets = useAppSelector(selectPets);
    const isLoading = useAppSelector(state => state.pet.isLoading);
    const [isAddNewPetVisible, setIsAddNewPetVisible] = useState(false);

    if (isLoading) {
        return <LinearProgress />;
    }

    return (
        <Container>
            <Grid container spacing={5} justifyContent="center" alignItems="center">
                {pets.length === 0 && !isAddNewPetVisible && (
                    <Grid item xs={12} textAlign="center">
                        <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
                            В вашем приюте пока нет животных.
                        </Typography>
                    </Grid>
                )}
                {isAddNewPetVisible ? (
                    <AddNewPet onClose={() => setIsAddNewPetVisible(false)} />
                ) : (
                    <>
                        {pets.map((pet: Pet) => (
                            <Grid item key={pet.id}>
                                <PetItem pet={pet} />
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
        </Container>
    );
};
