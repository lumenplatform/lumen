import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RuleIcon from '@mui/icons-material/Rule';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, Divider, FormControlLabel, IconButton, List, ListItem, Switch, TextField, Typography } from "@mui/material";

type Answers = {
    answer: string;
    correct: boolean;
    order: number;
}

export function McqQuestion(props: any) {
    const { question, questionIndex, changeQuestion, isTimeBoxed } = props;

    const handleAddAnswer = () => {
        changeQuestion(questionIndex, { ...question, answers: [...question.answers, { answer: '', correct: false, order: question.answers.length + 1 }] });
    }

    const handleRemoveAnswer = (index: number) => {
        const x = question.answers;
        x.splice(index, 1);
        x.forEach((e: any, index: any) => {
            e.order = index + 1;
        });
        changeQuestion(questionIndex, { ...question, answers: [...x] });
    }

    const handleAnswerChange = (index: number, answer: any) => {
        const x = question.answers;
        x.splice(index, 1, answer);
        changeQuestion(questionIndex, { ...question, answers: [...x] });
    }

    const handleQuestionChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, question: e.target.value });
    }

    const handleMarksChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, marks: e.target.value });
    }

    const handleTimeChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, durationSeconds: e.target.value });
    }

    return (
        <Box >
            <TextField
                //error when not focused
                error={question.question === ''}
                multiline
                variant="filled"
                rows={3}
                fullWidth autoFocus value={question.question} label="Question" onChange={(e) => handleQuestionChange(e)} />
            <List >
                {question.answers.map((answer: any, index: number) => (
                    <ListItem sx={{ pl: 0 }} dense={true} autoFocus={true}>
                        <McqAnswers index={index} remove={handleRemoveAnswer} setAnswer={handleAnswerChange} answer={answer} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 3 }}>
                <Button color="primary" onClick={handleAddAnswer}>
                    <AddLocationAltOutlinedIcon color="primary" sx={{ transform: 'rotate(-90deg)' }} />
                    <Typography variant="subtitle2" sx={{ ml: 1, color: 'black' }}>
                        Add Answer
                    </Typography>
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        size="small"
                        label={
                            <Box sx={{ display: 'flex' }}>
                                <AccessTimeIcon />&nbsp;Seconds
                            </Box>
                        }
                        type="number"
                        defaultValue={0.0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '10ch', mr: 2 }}
                        InputProps={{ inputProps: { min: 0, max: 60 } }}
                        onChange={(e) => handleTimeChange(e)}
                        value={question.durationSeconds}
                        disabled={!isTimeBoxed}
                    />

                    <TextField
                        size="small"
                        id="outlined-number"
                        label={
                            <Box sx={{ display: 'flex' }}>
                                <RuleIcon />&nbsp;Marks
                            </Box>
                        }
                        type="number"
                        defaultValue={0.0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '10ch', }}
                        onChange={(e) => handleMarksChange(e)}
                        value={question.marks}
                    />
                </Box>
            </Box>
        </Box >
    )
}


function McqAnswers(props: any) {
    const { index, remove, answer, setAnswer } = props;

    const handleAnswerChange = (e: any) => {
        setAnswer(index, { ...answer, answer: e.target.value });
    }

    const handleCorrectChange = (e: any) => {
        setAnswer(index, { ...answer, correct: e.target.checked });
    }

    return (
        <Box sx={{ py: 1, px: 2, display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField fullWidth autoFocus value={answer.answer} size="small" label="answer" variant="outlined" sx={{ mr: 3 }} onChange={(e) => handleAnswerChange(e)} />
                <FormControlLabel
                    value="top"
                    control={<Switch color="primary" defaultChecked={answer.correct} onChange={(e) => handleCorrectChange(e)} />}
                    label={
                        <Typography variant="subtitle2" color={answer.correct ? "primary" : 'error'}>
                            Correct
                        </Typography>
                    }
                    labelPlacement="end"
                />
                <IconButton aria-label="delete" color="warning" onClick={() => remove(index)}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
        </Box >
    )
}

export function EssayQuestion(props: any) {
    const { question, questionIndex, changeQuestion, isTimeBoxed } = props;

    const handleQuestionChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, question: e.target.value });
    }

    const handleMarksChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, marks: e.target.value });
    }

    const handleTimeChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, durationSeconds: e.target.value });
    }

    return (
        <>
            <TextField
                id="filled-textarea"
                label="Question"
                placeholder="Placeholder"
                multiline
                variant="filled"
                rows={3}
                onChange={(e) => handleQuestionChange(e)}
                value={question.question}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pt: 3 }}>
                <TextField
                    size="small"
                    label={
                        <Box sx={{ display: 'flex' }}>
                            <AccessTimeIcon />&nbsp;Seconds
                        </Box>
                    }
                    type="number"
                    defaultValue={0.0}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: '10ch', mr: 2 }}
                    InputProps={{ inputProps: { min: 0, max: 60 } }}
                    onChange={(e) => handleTimeChange(e)}
                    value={question.durationSeconds}
                    disabled={!isTimeBoxed}
                />

                <TextField
                    size="small"
                    label={
                        <Box sx={{ display: 'flex' }}>
                            <RuleIcon />&nbsp;Marks
                        </Box>
                    }
                    type="number"
                    defaultValue={0.0}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: '10ch' }}
                    onChange={(e) => handleMarksChange(e)}
                    value={question.marks}
                />
            </Box>
        </>

    )
}
