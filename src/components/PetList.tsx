//src/components/PetList.tsx
import React, { useState } from 'react';
import { useQuery, useQueryClient, QueryClient } from 'react-query';
import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { PetItem } from './PetItem';
import { AddNewPet } from "./AddNewPet";

export const PetList: React.FC = () => {
    const queryClient = useQueryClient()
    const { data: pets,  isLoading, } = useQuery(['pets'], async () => {
        const response = await fetch('http://localhost:3000/pets');
        return response.json();
    }, {});
    console.log(pets,isLoading,)
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
                    <AddNewPet onClose={async() => {
                        setIsAddNewPetVisible(false)
                    }} />
                ) : (
                    <>
                        {pets.map((pet: any) => (
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


