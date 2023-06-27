import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';


const AddMaaserPage = () => {

    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");


    const submitMaaser = async () => {
        await axios.post('/api/maaser/addmaaser', { date, recipient, amount });
        navigate("/maaser");
    }


    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField label="Recipient" variant="outlined" fullWidth margin="normal" onChange={(e) => setRecipient(e.target.value)} />
            <TextField label="Amount" variant="outlined" fullWidth margin="normal" onChange={(e) => setAmount(e.target.value)} />
            <TextField
                label="Date"
                type="date"
                value={dayjs(date).format('YYYY-MM-DD')}
                onChange={e => setDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button onClick={submitMaaser} variant="contained" color="primary">Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
