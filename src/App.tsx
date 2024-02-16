// src/App.tsx
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {PetList} from './components/PetList';
import {AddNewPet} from './components/AddNewPet';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container} from "@mui/material";

const queryClient = new QueryClient();

const App: React.FC = () => {

    const [isAddNewPetOpen, setIsAddNewPetOpen] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            PET SHELTER
                        </Typography>
                        <Button component={Link} to="/" color="inherit">
                            Home
                        </Button>
                        <Button color="inherit" onClick={() => setIsAddNewPetOpen(true)}>
                            Add New Pet
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container sx={{marginTop: 4, marginBottom: 4}}>
                    {isAddNewPetOpen?
                        <Container sx={{marginTop: 14}}>
                            <AddNewPet onClose={() => setIsAddNewPetOpen(false)}/>
                        </Container>
                    : <PetList/>

                    }
                    {/*<Routes>*/}
                    {/*    <Route path="/" element={<PetList/>}/>*/}

                    {/*</Routes>*/}
                </Container>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
