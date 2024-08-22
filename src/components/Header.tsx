import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Header = () => {
    return (
        <AppBar position="fixed" sx={{ height: '70px' }}>
            <Toolbar
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Box sx={{ flex: 1 }} />
                        <h2>TASK TRACKER PORTAL</h2>
                    <Box sx={{ flex: 1 }} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
