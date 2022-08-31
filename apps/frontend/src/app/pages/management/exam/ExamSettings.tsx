import { Box, Checkbox, Chip, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState, useEffect } from "react";

export type Settings = {
    title: string;
    instructions?: string;
    duration: {
        unlimited: boolean;
        durationMinutes?: number;
        durationSeconds?: number;
    }
    timeBox: {
        state: boolean;
        isAllQuestions: boolean;
        durationMinutes?: number;
        durationSeconds?: number;
    }
    contribution: number;
    passGrade: number;
    randomizeQuestions: boolean;
    randomizeAnswers: boolean;
}

export const defaultSettings: Settings = {
    title: "Exam title",
    instructions: "Instructions",
    duration: {
        unlimited: false,
        durationMinutes: 0,
        durationSeconds: 0
    },
    timeBox: {
        state: false,
        isAllQuestions: false,
        durationMinutes: 0,
        durationSeconds: 0
    },
    contribution: 0,
    passGrade: 0,
    randomizeQuestions: false,
    randomizeAnswers: false
}

export default function ExamSettings(props: any) {
    const { changeSettings, examSettings, questions } = props;
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    if (JSON.stringify(examSettings) != JSON.stringify(settings) && settings == defaultSettings) {
        setSettings(examSettings);
    }

    const handleDurationChange = (settings: any, questions: any[]) => {
        if (settings.timeBox.state && !settings.timeBox.isAllQuestions) {
            const duration = questions.reduce((acc, curr) => {
                return acc + parseInt(curr.durationSeconds);
            }, 0);
            setSettings({ ...settings, duration: { ...settings.duration, durationSeconds: duration % 60, durationMinutes: Math.floor(duration / 60) } });
        }
        else if (settings.timeBox.state && settings.timeBox.isAllQuestions) {
            setSettings({ ...settings, duration: { ...settings.duration, durationSeconds: (settings.timeBox.durationSeconds * questions.length) % 60, durationMinutes: settings.timeBox.durationMinutes * questions.length + Math.floor(settings.timeBox.durationSeconds * questions.length / 60) } });
        }
    }

    useEffect(() => {
        handleDurationChange(settings, questions);
    }, [settings.timeBox, questions]);

    useEffect(() => {
        changeSettings(settings);
    }, [settings]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Divider textAlign="left" sx={{ width: '100%' }}>
                    <Chip label="General" />
                </Divider>
                <TextField
                    error={settings.title === ""}
                    helperText={settings.title === "" ? "Title is required" : ""}
                    fullWidth value={settings.title}
                    defaultValue={'Exam title'}
                    label="Exam Title"
                    variant="outlined"
                    sx={{ my: 2 }}
                    onChange={(e) => setSettings(prevState => ({ ...prevState, title: e.target.value }))} />
                <TextField
                    fullWidth
                    error={settings.instructions === ''}
                    helperText={settings.instructions === '' ? 'Instructions are required' : ''}
                    value={settings.instructions}
                    label="Instructions"
                    placeholder="Enter instructions here"
                    multiline
                    variant="outlined"
                    rows={4}
                    onChange={(e) => setSettings(prevState => ({ ...prevState, instructions: e.target.value }))}
                />
            </Grid>
            <Grid item xs={12}>
                <Divider textAlign="left" sx={{ width: '100%' }}>
                    <Chip label="Timing" />
                </Divider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Quiz duration
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end' }}>
                        <Typography variant='caption' sx={{ mb: 1 }}>
                            Time for quiz
                        </Typography>
                        <Box sx={{ display: 'flex', mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ ml: 1 }}>
                                Unlimited time
                                <Checkbox checked={settings.timeBox.isAllQuestions} disabled={settings.timeBox.state} onChange={(e) => setSettings((prevState: Settings) => ({ ...prevState, duration: { ...prevState.duration, unlimited: !prevState.duration.unlimited } }))} />
                            </Typography>
                            <TextField
                                size="small"
                                label="minutes"
                                type="number"
                                value={settings.duration?.durationMinutes}
                                defaultValue={0.0}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ width: '8ch', mr: 2 }}
                                InputProps={{ inputProps: { min: 0, max: 60 } }}
                                onChange={(e) => setSettings((prevState: Settings) => ({ ...prevState, duration: { ...prevState.duration, durationMinutes: parseInt(e.target.value) } }))}
                                disabled={settings.timeBox.state || settings.duration.unlimited}
                            />
                            <TextField
                                size="small"
                                label="seconds"
                                type="number"
                                value={settings.duration?.durationSeconds}
                                defaultValue={0.0}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ width: '8ch' }}
                                InputProps={{ inputProps: { min: 0, max: 60 } }}
                                onChange={(e) => setSettings((prevState: Settings) => ({ ...prevState, duration: { ...prevState.duration, durationSeconds: parseInt(e.target.value) } }))}
                                disabled={settings.timeBox.state || settings.duration.unlimited}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Time box questions {settings.timeBox.state}
                        <Checkbox checked={settings.timeBox.state} onChange={(e) => setSettings((prevState: Settings) => ({ ...prevState, timeBox: { ...prevState.timeBox, state: !prevState.timeBox.state } }))} />
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end' }}>
                        <Typography variant='caption' sx={{ mb: 1 }}>
                            Time for each question
                        </Typography>
                        <Box sx={{ display: 'flex', mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ ml: 1 }}>
                                For all questions
                                <Checkbox checked={settings.timeBox.isAllQuestions} disabled={!settings.timeBox.state} onChange={(e) => setSettings((prevState: Settings) => ({ ...prevState, timeBox: { ...prevState.timeBox, isAllQuestions: !prevState.timeBox.isAllQuestions } }))} />
                            </Typography>
                            <TextField
                                size="small"
                                label="minutes"
                                type="number"
                                value={settings.timeBox.durationMinutes}
                                defaultValue={0.0}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ width: '8ch', mr: 2 }}
                                InputProps={{ inputProps: { min: 0, max: 60 } }}
                                onChange={(e) => setSettings((prevState: Settings) => ({ ...prevState, timeBox: { ...prevState.timeBox, durationMinutes: parseInt(e.target.value) } }))}
                                disabled={!settings.timeBox.state || !settings.timeBox.isAllQuestions}
                            />
                            <TextField
                                size="small"
                                label="seconds"
                                type="number"
                                value={settings.timeBox.durationSeconds}
                                defaultValue={0.0}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ width: '8ch' }}
                                InputProps={{ inputProps: { min: 0, max: 60 } }}
                                onChange={(e) => setSettings((prevState: Settings) => ({ ...prevState, timeBox: { ...prevState.timeBox, durationSeconds: parseInt(e.target.value) } }))}
                                disabled={!settings.timeBox.state || !settings.timeBox.isAllQuestions}
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
                        value={settings.contribution}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '11ch' }}
                        InputProps={{
                            inputProps: { min: 0, max: 100 },
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                        onChange={(e) => setSettings(prevState => ({ ...prevState, contribution: parseInt(e.target.value) }))}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Pass grade
                    </Typography>
                    <TextField
                        size="small"
                        type="number"
                        value={settings.passGrade}
                        defaultValue={0.0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '11ch' }}
                        InputProps={{
                            inputProps: { min: 0, max: 100 },
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                        onChange={(e) => setSettings(prevState => ({ ...prevState, passGrade: parseInt(e.target.value) }))}
                    />
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
                    <Checkbox checked={settings.randomizeQuestions} onChange={(e) => setSettings((prevState: Settings) => ({ ...prevState, randomizeQuestions: !prevState.randomizeQuestions }))} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2, width: { xs: '100%', sm: '70%', md: '50%', lg: '30%' } }}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Randomize answers
                    </Typography>
                    <Checkbox checked={settings.randomizeAnswers} onChange={(e) => setSettings((prevState: Settings) => ({ ...prevState, randomizeAnswers: !prevState.randomizeAnswers }))} />
                </Box>
            </Grid>
        </Grid>
    );
}
