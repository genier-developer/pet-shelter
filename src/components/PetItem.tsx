// src/components/PetItem.tsx
import React, {useState} from 'react';
import {Card, CardActions, CardContent, CardMedia, Container, TextField, Typography} from '@mui/material';
import Button from "@mui/material/Button";
import {useAppDispatch} from "../app/hooks";
import {Pet} from "../models/Pet";
import {useQueryClient, useMutation} from "react-query";

export type PetItemProps = {
    pet: Pet
}

export const PetItem: React.FC<PetItemProps> = ({pet}) => {

    const dispatch = useAppDispatch()
    const queryClient = useQueryClient();
    const [updatedPet, setUpdatedPet] = useState<Pet>(pet);
    const [isEditing, setIsEditing] = useState(false);

    const deletePetMutation = useMutation(
        (id: string) =>
            fetch(`http://localhost:3000/pets/${id}`, {
                method: 'DELETE',
            }),
        {
            onSuccess: () => {
                console.log('Pet successfully deleted');
                queryClient.invalidateQueries('pets');
            },
            onError: (error) => {
                console.error('Error deleting pet:', error);
            },
        }
    );

    const handleDeletePet = () => {
        deletePetMutation.mutate(pet.id);
    }


    const updatePetMutation = useMutation(
        (updatedPet: Pet) =>
            fetch(`http://localhost:3000/pets/${updatedPet.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPet),
            }),
        {
            onSuccess: () => {
                console.log('Pet successfully updated');
                queryClient.invalidateQueries('pets');
                setIsEditing(false);
            },
            onError: (error) => {
                console.error('Error updating pet:', error);
            },
        }
    );

    const handleToggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const handleUpdatePet = () => {
        updatePetMutation.mutate(updatedPet);
    }

    const handleCancelEditing = () => {
        setUpdatedPet(pet);
        setIsEditing(false);
    }

    const handleInputChange = (field: string, value: string | number) => {
        setUpdatedPet((prevPet) => ({
            ...prevPet,
            [field]: value,
        }));
    };

    return (
        <Card sx={{maxWidth: 345}} elevation={6}>
            <CardMedia
                image={pet.image}
                // title={pet.name}
                sx={{width: 200, height: 200}}
            />
            <CardContent>
                {isEditing?
                        <TextField
                            type="text"
                            size="small"
                            label={pet.name}
                            value={updatedPet.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    : <Typography variant="h5" component="div" sx={{marginBottom: 1}}>{pet.name}</Typography>
                }

                {/*<Typography variant="h5" component="div" sx={{marginBottom: 1}}>{pet.name}</Typography>*/}
                {/*<Typography color="text.secondary">Pet: <b>{pet.type}</b></Typography>*/}
                <Typography color="text.secondary">Age: <b>{pet.age}</b></Typography>
                <Typography color="text.secondary">Weight, kg: <b>{pet.weight}</b></Typography>
                <Typography color="text.secondary">Sex: <b>{pet.sex ? 'male' : 'female'}</b></Typography>
                <Typography color="text.secondary">Available: <b>{pet.isAvailable ? 'Yes' : 'No'}</b></Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: "space-between" }}>
                {!isEditing && <Button size="small" onClick={handleToggleEditing}>Update</Button>}
                {isEditing && (
                    <>
                        <Button size="small" onClick={handleUpdatePet}>Save</Button>
                        <Button size="small" onClick={handleCancelEditing}>Cancel</Button>
                    </>
                )}
                {!isEditing && <Button size="small" onClick={handleDeletePet}>Delete</Button>}
            </CardActions>
        </Card>
    );
};