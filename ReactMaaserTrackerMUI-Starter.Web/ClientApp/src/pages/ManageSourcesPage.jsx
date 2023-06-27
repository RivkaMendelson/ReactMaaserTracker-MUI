import { Container, Table, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ManageSourcesPage = () => {
    const [sources, setSources] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSource, setSelectedSource] = useState("");
    const [editingSourceId, setEditingSourceId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const getSources = async () => {
            const { data } = await axios.get(`/api/maaser/getSources`);
            setSources(data);
            setIsLoading(false);
        }

        getSources();
    }, []);



    const handleOpen = (source = '') => {
        setOpen(true);
        setSelectedSource(source);
        setEditingSourceId(source.id);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSource('');
        setEditingSourceId(null);
    };

    const handleAddEdit = async () => {
        if (editingSourceId) {
            await axios.post("/api/maaser/editSource", { name: selectedSource, id: editingSourceId });
            window.location.reload();
        } else {
            await axios.post("/api/maaser/addSource", { name: selectedSource });
            window.location.reload();

        }
        handleClose();
    };

    const handleDelete = async (sourceToDelete) => {
        await axios.post('/api/maaser/deleteSource', { id: sourceToDelete.id });
        window.location.reload();
    };

    return (
        
        <Container>
            {isLoading ? <Typography variant="h5" gutterBottom>
                Loading...
            </Typography> :
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
                    Add Source
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                            <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sources.map((source) => (
                            <TableRow key={source.id}>
                                <TableCell sx={{ fontSize: '18px' }}>{source.name}</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>
                                    <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(source)}>Edit</Button>
                                    <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(source)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{editingSourceId ? 'Edit Source' : 'Add Source'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={selectedSource.name} onChange={e => setSelectedSource(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEdit} color="primary">
                        {editingSourceId ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog></>}
        </Container>
    );
}

export default ManageSourcesPage;
