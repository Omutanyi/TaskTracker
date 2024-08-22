"use client";
import { useState, useEffect, useCallback } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Task } from '../types/task';
import { AppContainer } from './UiComponents';
import { constants } from '@/utils/constants';
import TasksTable from './TasksTable';
import swal from 'sweetalert';
import { createTask, deleteTask, fetchTasks, formatDate } from '@/utils';

interface AlertStatus {
    open: boolean;
    error: string;
}

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [status, setStatus] = useState<String>('');
    const [title, setTitle] = useState<String>('');
    const [alertStatus, setAlertStatus] = useState<AlertStatus>({ open: false, error: '' });
    const [description, setDescription] = useState<String>('');
    const [dueDate, setDueDate] = useState<Date>(new Date);


    const fetchTaskData = async () => {
        const data: Task[] | undefined = await fetchTasks();
        if (data) {
            setTasks(data);
        }
    };

    useEffect(() => {
        fetchTaskData()
    }, []);

    const errorPopUp = () => {
        swal({
            title: '',
            text: alertStatus.error,
            icon: "warning",
            dangerMode: true,
            className: "swal-login",
        })
        setAlertStatus({ error: "", open: false });
    };

    const handleCreateTask = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (!title || !description || !status) {
            return
        }

        if (!title) {
            setAlertStatus({ error: "Email and password required.", open: true });
            return;
        }

        const params = { title: title, description: description, status: status, dueDate: dueDate };
        const records = await createTask('POST', params);
        if (records) {
            fetchTaskData();
            setTitle('');
            setDescription('');
            setStatus('');
            setDueDate(new Date);
        }
    }

    
    const handleEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (!title || !description || !status) {
            return
        }
        const params = { title: title, description: description, status: status, dueDate: dueDate };
        console.log('params...', params)
        const records = await createTask('PUT', params);
        if (records) {
            setTitle('');
            setDescription('');
            setStatus('');
            setDueDate(new Date);
            fetchTaskData();
        }
    }
    async function handleDelete(id: Number) {
        await deleteTask(Number(id)).then(() => {
            fetchTaskData();
        })
    }

    return (
        <AppContainer>
            <Grid sx={{ width: '100%' }}>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    {/* Create Task */}
                    <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                        <Box component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                borderRadius: '10px',
                                border: theme => `1px solid ${theme.palette.primary.main}`,
                            }}>
                            <Box
                                sx={{
                                    backgroundColor: theme => theme.palette.primary.main,
                                    color: theme => theme.palette.primary.contrastText,
                                    borderTopLeftRadius: '10px',
                                    borderTopRightRadius: '10px',
                                    p: 1.5,
                                }}
                            >
                                <Typography variant="h6" component="h1">
                                    CREATE TASK
                                </Typography>
                            </Box>
                            <Box component="form"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    p: 2,
                                }}>
                                <TextField label="title" onChange={(e) => setTitle(e.target.value)} variant="outlined" fullWidth />
                                <TextField label="description" onChange={(e) => setDescription(e.target.value)} variant="outlined" fullWidth />
                                <TextField label="due date" value={formatDate(dueDate)} type="date" onChange={(e) => setDueDate(new Date(e.target.value))} variant="outlined" fullWidth />
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        onChange={(e) => setStatus(String(e.target.value))}
                                        label="Select Item"
                                    >
                                        {
                                            constants?.status.map((r, i) => {
                                                return <MenuItem value={r.label} key={i}>{r.label}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }} onClick={handleCreateTask} disabled={!title || !description || !status}>
                                    CREATE TASk
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Tasks list */}
                    <Grid item xs={7}>
                        <Box sx={{ height: '100vh', overflowY: 'auto' }}>
                            <Box
                                sx={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: (theme) => theme.palette.primary.main,
                                    color: (theme) => theme.palette.primary.contrastText,
                                    p: 1.5,
                                    borderTopLeftRadius: '10px',
                                    borderTopRightRadius: '10px',
                                }}
                            >
                                <Typography variant="h6" component="h1">
                                    TASK LIST
                                </Typography>
                            </Box>
                            <TasksTable tasks={tasks} handleEdit={handleEdit} handleDelete={handleDelete} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </AppContainer>
    );

};

export default TaskList;