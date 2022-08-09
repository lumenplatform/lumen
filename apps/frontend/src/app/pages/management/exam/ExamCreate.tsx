import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Button, ButtonGroup, Card, IconButton, List, ListItem, Typography } from "@mui/material";
import { useState , useEffect} from "react";
import { EssayQuestion, McqQuestion } from "../../../components/Questions";

export type Questions = {
    question: string;
    type?: string;
    marks?: number;
    answers?: any[];
    durationSeconds? : number;
}

export default function ExamCreate(props: any) {
    const { changeQuestions , examQuestions } = props;
    const [questions, setQuestions] = useState<Questions[]>(examQuestions || []);

    useEffect(() => {
        changeQuestions(questions);
    } , [questions]);

    const handleAddQuestion = (type: string) => {
        setQuestions(prevState => [...prevState, { question: '', type: type, marks: 0, answers: [] , durationSeconds: 0}]);
    }

    const handleRemoveQuestion = (index: number) => {
        const x = questions;
        x.splice(index, 1);
        setQuestions([...x]);
    }

    const handleQuestionChange = (index: number, question: any) => {
        const x = questions;
        x.splice(index, 1, question);
        setQuestions([...x]);
    }

    return (
        <Box>
            <List sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} >
                {questions.map((question, index) => (
                    <ListItem key={index} dense={true} autoFocus={true}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%', py: 2, px: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle2" sx={{ mx: 1, color: 'black' }}>
                                    Question {index + 1}
                                </Typography>
                                <IconButton aria-label="delete" color="warning" onClick={() => handleRemoveQuestion(index)}>
                                    <DeleteOutlineOutlinedIcon />
                                </IconButton>
                            </Box>
                            {question.type === 'mcq' && <McqQuestion changeQuestion={handleQuestionChange} question={question} questionIndex={index} />}
                            {question.type === 'essay' && <EssayQuestion changeQuestion={handleQuestionChange} question={question} questionIndex={index} />}
                        </Card>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <AddLocationAltOutlinedIcon color="primary" sx={{ transform: 'rotate(-90deg)' }} />
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={() => handleAddQuestion('mcq')}>
                        <Typography variant="subtitle2" sx={{ ml: 1, color: 'black' }}>
                            Add MCQ Question
                        </Typography>
                    </Button>
                    <Button onClick={() => handleAddQuestion('essay')}>
                        <Typography variant="subtitle2" sx={{ ml: 1, color: 'black' }}>
                            Add Essay Question
                        </Typography>
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>

    );
}