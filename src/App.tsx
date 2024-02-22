import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Box, Container} from "@mui/material";
import {BrowserRouter, Link} from 'react-router-dom';
import {useEffect, useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {fetchPets} from "./features/petSlice.ts";
import {useAppDispatch} from "./app/hooks.ts";
import {PetList} from "./components/PetList.tsx";
import {AddNewPet} from "./components/AddNewPet.tsx";


export const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const [isAddNewPetOpen, setIsAddNewPetOpen] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetch data');
            try {
                await dispatch(fetchPets());
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchData().then(() => {
            console.log('fetchData completed');
        });

    }, [dispatch]);

    const handleHomeButtonClick = ()=>{
        setIsAddNewPetOpen(false)
    }

    return (
        <BrowserRouter>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            PET SHELTER
                        </Typography>
                        <Button component={Link} to="/" color="inherit" onClick={handleHomeButtonClick}>
                            Home
                        </Button>
                        <Button color="inherit" onClick={() => setIsAddNewPetOpen(true)}>
                            Add New Pet
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container sx={{marginTop: 4, marginBottom: 4}}>
                {isAddNewPetOpen ?
                    <Container sx={{marginTop: 14}}>
                        <AddNewPet onClose={() => setIsAddNewPetOpen(false)}/>
                    </Container>
                    : <PetList/>
                }
            </Container>
        </BrowserRouter>
    );
};

