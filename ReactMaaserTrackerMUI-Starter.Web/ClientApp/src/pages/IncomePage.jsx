import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';


const IncomePage = () => {

    const [groupBySource, setGroupBySource] = useState(false);
    const [incomes, setIncomes] = useState([]);
    const [groupedIncomes, setGroupedIncomes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getIncomes();
    }, []);

    const getIncomes = async () => {
        const { data } = await axios.get(`/api/maaser/getIncomes`);
        setIncomes(data);
        setIsLoading(false);
    }

    useEffect(() => {

        var groupedObject = incomes.reduce(function (acc, income) {
            var source = income.source;
            if (!acc[source]) {
                acc[source] = [];
            }
            acc[source].push(income.income);
            return acc;
        }, {});

        var groupedArray = Object.entries(groupedObject).map(function ([source, income]) {
            return { source, income };
        });

        setGroupedIncomes(groupedArray);

       

    }, [groupBySource]);

   


    return (

        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            {isLoading ? <Typography variant="h2" gutterBottom>
                Loading...
            </Typography> : <>
                <Typography variant="h2" gutterBottom component="div">
                    Income History
                </Typography>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={groupBySource}
                            onChange={(event) => setGroupBySource(event.target.checked)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Group by source"
                /></>}

            {!groupBySource ? (
                <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {incomes.map((income) => (
                                <TableRow key={income.income.id}>
                                    <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                        {income.source}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>${income.income.amount}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.income.date).format('YYYY-MM-DD')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                groupedIncomes.map((income) => (
                    <div key={income.income.id} sx={{ width: '80%', maxWidth: '80%' }}>
                        <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
                            {income.source}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Source</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {income.income.map((i) => (
                                        <TableRow key={income.id}>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>{income.source}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>${i.amount}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(i.date).format('YYYY-MM-DD')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))
            )}
        </Container>
    );
}

export default IncomePage;
