import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';


const AddIncomePage = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [sources, setSources] = useState([]);
    const [sourceId, setSourceId] = useState();
    const [amount, setAmount] = useState("");


    useEffect(() => {

        const getSources = async () => {
            const { data } = await axios.get(`/api/maaser/getSources`);
            setSources(data);
        }

        getSources();
    }, []);

    const submitIncome = async () => {
        await axios.post('/api/maaser/addIncome', {sourceId, amount, date });
        navigate("/income");
    }


    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={option => option.name}
                fullWidth
                onChange={(e, option) => setSourceId(option.id)}
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                onChange={e=>setAmount(e.target.value) }
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
            />
             <TextField
                label="Date"
                type="date"
                value={dayjs(date).format('YYYY-MM-DD')}
                onChange={e => setDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={submitIncome }>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
