import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Button, Divider, FormControlLabel, IconButton, List, ListItem, Switch, TextField, Typography } from "@mui/material";

type Answers = {
    answer: string;
    correct: boolean;
}

export function McqQuestion(props: any) {
    const { question, questionIndex, changeQuestion } = props;

    const handleAddAnswer = () => {
        changeQuestion(questionIndex, { ...question, answers: [...question.answers, { answer: '', correct: false }] });
    }

    const handleRemoveAnswer = (index: number) => {
        const x = question.answers;
        x.splice(index, 1);
        changeQuestion(questionIndex, { ...question, answers: [...x] });
    }

    const handleAnswerChange = (index: number, answer: any) => {
        const x = question.answers;
        x.splice(index, 1, answer);
        changeQuestion(questionIndex, { ...question, answers: [...x] });
        console.log(question);
    }

    const handleQuestionChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, question: e.target.value });
    }

    const handleMarksChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, marks: e.target.value });
    }
    
    const handleTimeChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, time: e.target.value });
    }
    
    return (
        <Box >
            <TextField 
            //error when not focused
            error= {question.question === '' }
            fullWidth autoFocus value={question.question} label="Question" variant="filled" onChange={(e) => handleQuestionChange(e)} />
            <List >
                {question.answers.map((answer: any, index: number) => (
                    <>
                        <ListItem sx={{ pl: 0 }} dense={true} autoFocus={true}>
                            <McqAnswers index={index} remove={handleRemoveAnswer} setAnswer={handleAnswerChange} answer={answer} />
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button color="primary" onClick={handleAddAnswer}>
                    <AddLocationAltOutlinedIcon color="primary" sx={{ transform: 'rotate(-90deg)' }} />
                    <Typography variant="subtitle2" sx={{ ml: 1, color: 'black' }}>
                        Add Answer
                    </Typography>
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        size="small"
                        label="seconds"
                        type="number"
                        defaultValue={0.0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '10ch', mr: 2 }}
                        InputProps={{ inputProps: { min: 0, max: 60 } }}
                        onChange={(e) => handleTimeChange(e)}
                        value={question.time}
                    />

                    <TextField
                        size="small"
                        id="outlined-number"
                        label="Marks"
                        type="number"
                        defaultValue={0.0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '10ch', }}
                        onChange={(e) => handleMarksChange(e)}
                    />
                </Box>
            </Box>
        </Box>
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
            <TextField fullWidth autoFocus value={answer.answer} size="small" label="answer" variant="standard" sx={{ mr: 3 }} onChange={(e) => handleAnswerChange(e)} />
            <FormControlLabel
                value="top"
                control={<Switch color="primary" onChange={(e) => handleCorrectChange(e)} />}
                label="Correct"
                labelPlacement="end"
            />
            <IconButton aria-label="delete" color="warning" onClick={() => remove(index)}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </Box >
    )
}

export function EssayQuestion(props: any) {
    const { question, questionIndex, changeQuestion } = props;

    const handleQuestionChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, question: e.target.value });
    }

    const handleMarksChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, marks: e.target.value });
    }

    const handleTimeChange = (e: any) => {
        changeQuestion(questionIndex, { ...question, time: e.target.value });
    }

    return (
        <>
            <TextField
                id="filled-textarea"
                label="Multiline Placeholder"
                placeholder="Placeholder"
                multiline
                variant="filled"
                rows={3}
                onChange={(e) => handleQuestionChange(e)}
                value={question.question}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
                <TextField
                    size="small"
                    label="seconds"
                    type="number"
                    defaultValue={0.0}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: '10ch', mr: 2 }}
                    InputProps={{ inputProps: { min: 0, max: 60 } }}
                    onChange={(e) => handleTimeChange(e)}
                    value={question.time}
                />

                <TextField
                    size="small"
                    label="Marks"
                    type="number"
                    defaultValue={0.0}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: '10ch' }}
                    onChange={(e) => handleMarksChange(e)}
                />
            </Box>
        </>

    )
}
