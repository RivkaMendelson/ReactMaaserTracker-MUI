import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Paper } from '@mui/material';

const OverviewPage = () => {

    const [income, setIncome] = useState(0);
    const [maaser, setMaaser] = useState(0);

    const getOverview = async () => {
        const { data } = await axios.get(`/api/maaser/getOverview`);
        setIncome(data.income);
        setMaaser(data.maaser);
    }

    useEffect(() => {
        getOverview();
    }, []);


  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center'
      }}
    >
      <Paper elevation={20} sx={{ padding: '25px', borderRadius: '15px' }}>
        <Typography variant="h2" gutterBottom>
          Overview
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
                      Total Income: ${income.toFixed(2)}
          </Typography>
          <Typography variant="h5" gutterBottom>
                      Total Maaser: ${maaser.toFixed(2) }
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
                      Maaser Obligated: ${(+income * .10).toFixed(2) }
          </Typography>
          <Typography variant="h5" gutterBottom>
                      Remaining Maaser obligation: ${((+income*.10)-maaser).toFixed(2) }
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default OverviewPage;
