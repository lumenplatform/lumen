import { Box, Checkbox, Chip, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";

export default function ExamPage() {

    const [attempts, setAttempts] = useState('');

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Divider textAlign="left" sx={{ width: '100%' }}>
                    <Chip label="General" />
                </Divider>
                <TextField fullWidth label="Exam Title" variant="filled" sx={{ my: 2 }} />
                <TextField
                    fullWidth
                    id="filled-textarea"
                    label="Instructions"
                    placeholder="Enter instructions here"
                    multiline
                    variant="filled"
                    rows={4}
                />
            </Grid>
            <Grid item xs={12}>
                <Divider textAlign="left" sx={{ width: '100%' }}>
                    <Chip label="Timing" />
                </Divider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Allow access from
                    </Typography>
                    <DateTimeSelector />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Allow access until
                    </Typography>
                    <DateTimeSelector />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Time box questions <Checkbox defaultChecked />
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='caption' sx={{ mb: 1 }}>
                            Time for each question
                        </Typography>
                        <Box sx={{ display: 'flex', mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                            <TextField
                                size="small"
                                label="minutes"
                                type="number"
                                defaultValue={0.0}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ width: '8ch', mr: 2 }}
                                InputProps={{ inputProps: { min: 0, max: 60 } }}
                            />
                            <TextField
                                size="small"
                                label="seconds"
                                type="number"
                                defaultValue={0.0}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ width: '8ch' }}
                                InputProps={{ inputProps: { min: 0, max: 60 } }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Divider textAlign="left" sx={{ width: '100%' }}>
                    <Chip label="Grade" />
                </Divider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Contribution to course grade
                    </Typography>
                    <TextField
                        size="small"
                        type="number"
                        defaultValue={0.0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '11ch' }}
                        InputProps={{
                            inputProps: { min: 0, max: 100 },
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Pass grade
                    </Typography>
                    <TextField
                        size="small"
                        type="number"
                        defaultValue={0.0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '11ch' }}
                        InputProps={{
                            inputProps: { min: 0, max: 100 },
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Attempts allowed
                    </Typography>
                    <FormControl sx={{ minWidth: '11ch' }} size="small">
                        <InputLabel>attempts</InputLabel>
                        <Select
                            label='Attempts'
                            value={attempts}
                            onChange={(e)=>setAttempts(e.target.value)}
                            autoWidth
                        >
                            <MenuItem value='unlimited'>unlimited</MenuItem>
                            {
                                [...Array(11).keys()].map((i: number) => (
                                    <MenuItem key={i} value={i}>{i}</MenuItem>)
                                )
                            }
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Divider textAlign="left" sx={{ width: '100%' }}>
                    <Chip label="Questions Behaviour" />
                </Divider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2, width: { xs: '100%', sm: '70%', md: '50%', lg: '30%' } }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Randomize questions
                    </Typography>
                    <Checkbox defaultChecked />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2, width: { xs: '100%', sm: '70%', md: '50%', lg: '30%' } }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Randomize answers
                    </Typography>
                    <Checkbox defaultChecked />
                </Box>
            </Grid>
        </Grid>
    );
}


export function DateTimeSelector() {
    const [value, setValue] = useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label="Date and Time picker"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
