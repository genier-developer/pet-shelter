// src/components/AddNewPet.tsx
import React, {useState} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {ButtonGroup, Card, Container, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Typography from "@mui/material/Typography";


type AddNewPetProps = {
    onClose: () => void;
}

export const AddNewPet: React.FC<AddNewPetProps> = ({onClose}) => {
    const [petType, setPetType] = useState('');
    const [petName, setPetName] = useState('');
    const [petAge, setPetAge] = useState(0);
    const [petSex, setPetSex] = useState('');
    const [petWeight, setPetWeight] = useState(0);

    const queryClient = useQueryClient();

    const addNewPetMutation = useMutation(
        (newPet: { name: string, age: number, sex: string, weight: number }) =>
            fetch('http://localhost:3000/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPet),
            }),
        {
            onSuccess: () => {
                console.log('Pet successfully added');
                queryClient.invalidateQueries('pets');
                onClose();
            },
            onError: (error) => {
                console.error('Error adding pet:', error);
            },
        }
    );

    const handleAddPet = () => {
        addNewPetMutation.mutate({name: petName, age: petAge, sex: petSex, weight: petWeight});
    };

    return (
        <Card elevation={10}
              sx={{
                  marginTop: 'auto',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: 5,
                  maxWidth: 300,
                  padding: 2,
                  textAlign: 'center'
              }}>
            <Typography variant={"h5"}>ADD NEW PET</Typography>
            <Container sx={{marginTop: 2}}>
                <TextField
                    sx={{marginBottom: 2}}
                    type="text"
                    size={"small"}
                    label="Name"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                />
                <TextField
                    sx={{marginBottom: 2}}
                    type="number"
                    size={"small"}
                    label="Age"
                    value={petAge}
                    onChange={(e) => setPetAge(+e.target.value)}
                />
                <TextField
                    sx={{marginBottom: 2}}
                    type="number"
                    size={"small"}
                    label={'Weight, kg'}
                    value={petWeight}
                    onChange={(e) => setPetWeight(+e.target.value)}
                />

                <Box sx={{display: 'flex', alignSelf: 'left', marginBottom: 2, marginLeft: 3.5, textAlign: 'left'}}>
                    <FormControl size={'small'} fullWidth sx={{paddingRight: 3.5}}>
                        <InputLabel>Sex</InputLabel>
                        <Select
                            value={petSex}
                            label="Sex"
                            onChange={(e) => setPetSex(e.target.value)}
                        >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{display: 'flex', alignSelf: 'left', marginLeft: 3.5, textAlign: 'left'}}>
                    <FormControl size={'small'} fullWidth sx={{paddingRight: 3.5}}>
                        <InputLabel>Pet</InputLabel>
                        <Select
                            value={petType}
                            label="Pet"
                            onChange={(e) => setPetType(e.target.value)}
                        >
                            <MenuItem value={'dog'}>Dog</MenuItem>
                            <MenuItem value={"cat"}>Cat</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Container sx={{marginTop: 3, marginBottom: 4, display: 'flex', justifyContent: 'space-between'}}>
                    <Button
                        variant={"contained"}
                        sx={{marginTop: 1}}
                        size={'small'}
                        onClick={handleAddPet}
                    >
                        Add Pet
                    </Button>

                    <Button
                        variant={"contained"}
                        sx={{marginTop: 1}}
                        size={"small"}
                        onClick={onClose}>
                        Cancel
                    </Button>
                </Container>
            </Container>
        </Card>
    );
};


