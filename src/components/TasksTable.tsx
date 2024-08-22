import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Modal,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
} from '@mui/material';
import { Task } from '@/types/task';
import { Box, borderRadius } from '@mui/system';
import { constants } from '@/utils/constants';
import { createTask, formatDate } from '@/utils';

interface TasksTableProps {
    tasks: Task[];
    handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleDelete: (id: number) => void;
  }
import { Delete } from '@mui/icons-material';

const TasksTable: React.FC<TasksTableProps> = ({ tasks, handleEdit, handleDelete }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [editingTask, setEditingTask] = useState<Task>({} as Task);
    const handleOpenEdit = (task: Task) => {
        setEditingTask(task);
        setOpenEdit(true)
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setEditingTask({} as Task);
    };
    return (
        <div>
            <EditTaskModal open={openEdit} editingTask={editingTask} handleCloseEdit={handleCloseEdit} handleEdit={handleEdit} />
            <TableContainer component={Paper}>
                <Table aria-label="events table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task, t) => (
                            <TableRow key={task.id}>
                                <TableCell color="primary" style={{ fontSize: '16px' }}>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" type="submit" onClick={() => handleOpenEdit(task)}>Edit</Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton variant="contained" color="error" onClick={() => handleDelete(Number(task.id))}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

interface EditTaskModalProps {
    open: boolean;
    handleCloseEdit: () => void;
    editingTask: Task;
    handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


const EditTaskModal = ({ open, editingTask, handleCloseEdit, handleEdit }: EditTaskModalProps) => {
    const [status, setStatus] = useState<String>(editingTask.status);
    const [title, setTitle] = useState<String>(editingTask.title);
    const [description, setDescription] = useState<String>(editingTask.description);
    const [dueDate, setDueDate] = useState<Date>(editingTask.dueDate);
    React.useEffect(() => {
        if (editingTask) {
            setStatus(editingTask.status);
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setDueDate(editingTask.dueDate);
        }
    }, [editingTask]);
    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            p: 2,
                        }}>
                        <TextField label="title" value={title} onChange={(e) => setTitle(e.target.value)} variant="outlined" fullWidth />
                        <TextField label="description" value={description} onChange={(e) => setDescription(e.target.value)} variant="outlined" fullWidth />
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
                        <Button variant="contained" color="primary" type="submit" onClick={handleEdit} sx={{ mt: 2 }}>
                            EDIT
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleCloseEdit} sx={{ mt: 1 }}>
                            CANCEL
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default TasksTable;
