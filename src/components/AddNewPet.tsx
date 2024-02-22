import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useAppDispatch} from "../app/hooks.ts";
import {addPet} from "../features/petSlice.ts";
import {v1} from "uuid"
import {Card, Container, FormControl, Typography} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


type AddNewPet = {
    onClose: () => void
};

export const AddNewPet: React.FC<AddNewPet> = ({onClose}) => {
    const [pet, setPet] = useState({
        petType: '',
        petName: '',
        petAge: '',
        petSex: '',
        petWeight: '',
        petImage: ''
    })
    const dispatch = useAppDispatch()

    const newPet = {
        id: v1(),
        type: pet.petType,
        name: pet.petName,
        age: +pet.petAge,
        sex: pet.petSex,
        weight: +pet.petWeight,
        isAvailable: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: '', // Add the image URL
    };
    const handleAdd = () => {
        console.log("add pet")
        dispatch(addPet(newPet))
        onClose()
    }
    const handleCancel = () => {
        onClose()
    }

    return (
        <Card elevation={10}
              sx={{
                  marginTop: 'auto',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: 250,
                  padding: 5,
                  textAlign: 'center'
              }}>
            <Typography variant={"h5"}>ADD NEW PET</Typography>
            <Container sx={{marginTop: 2}}>
                <TextField
                    sx={{marginBottom: 2}}
                    id="outlined-basic-type"
                    size="small"
                    label="Name"
                    variant="outlined"
                    value={pet.petName}
                    onChange={(e) => setPet({...pet, petName: e.target.value})}
                />
                <TextField
                    sx={{marginBottom: 2}}
                    id="outlined-basic-type"
                    size="small"
                    label="Age"
                    variant="outlined"
                    value={pet.petAge}
                    onChange={(e) => setPet({...pet, petAge: e.target.value})}
                />
                <TextField
                    sx={{marginBottom: 2}}
                    id="outlined-basic-type"
                    size="small"
                    label="Weight, kg"
                    variant="outlined"
                    value={pet.petWeight}
                    onChange={(e) => setPet({...pet, petWeight: e.target.value})}
                />

                <Box sx={{display: 'flex', alignSelf: 'left', marginBottom: 2, textAlign: 'left'}}>
                    <FormControl size={'small'} fullWidth sx={{paddingRight: 0.5, paddingLeft: 0.5}}>
                        <InputLabel>Sex</InputLabel>
                        <Select
                            value={pet.petSex}
                            label="Sex"
                            onChange={(e) => setPet({...pet, petSex: e.target.value})}
                        >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{display: 'flex', alignSelf: 'left', marginBottom: 2, textAlign: 'left'}}>
                    <FormControl size={'small'} fullWidth sx={{paddingRight: 0.5, paddingLeft: 0.5}}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={pet.petType}
                            label="Type"
                            onChange={(e) => setPet({...pet, petType: e.target.value})}
                        >
                            <MenuItem value={'cat'}>Cat</MenuItem>
                            <MenuItem value={"dog"}>Dog</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: 'center',
                    marginTop: 5,
                    paddingRight: 0.5,
                    paddingLeft: 0.5
                }}>
                    <Button variant="contained" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleAdd}>
                        Add
                    </Button>
                </Box>

            </Container>
        </Card>

    );
};

