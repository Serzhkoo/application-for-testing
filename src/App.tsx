import React, {useState} from 'react';

import {FormDialog} from "./components/FormDialog";
import {QuestionsForm} from "./components/QuestionsForm";
import {AlertDialog} from "./components/AlertDialog";
import styles from './App.module.css';
import {AlertSwitcherType, AnswersType, QuestionsType, SwitcherFormType} from "./AppTypes";
import {Header} from "./components/Header";
import {initialNewQuestion, initialQuestions} from "./AppConst";

const App: React.FC = () => {
    const [newQuestion, setNewQuestion] = useState<QuestionsType>(initialNewQuestion); //Object for temporary storage of all entered data to create a new question
    const [questions, setQuestions] = useState<QuestionsType[]>(initialQuestions); //Array of all standard and added questions
    const [formSwitcher, setFormSwitcher] = useState<SwitcherFormType>(0); //Dialog box switcher
    const [title, setTitle] = useState<string>(''); //Variable for temporary storage of data entered in the dialog box
    const [disabledButtons, setDisabledButtons] = useState<boolean>(false); //Disabling the "Добавить вопрос" and "Начать тест" buttons
    const [alertSwitcher, setAlertSwitcher] = useState<AlertSwitcherType>(0); //System message switch
    const [numbersOfWrongQuestions, setNumbersOfWrongQuestions] = useState<number[]>([]); //Array of wrong answer numbers

    const handleAddQuestion = (): void => {
        setFormSwitcher(1);
    }

    const saveTitle = (): void => {
        let copyNewQuestion: QuestionsType;

        if (formSwitcher === 1) {
            copyNewQuestion = {...newQuestion, title: `${questions.length + 1}. ${title}`}; //A title is assigned to a new question.
        } else {
            const copyAnswers: AnswersType[] = [...newQuestion.answers]; //А title is assigned to one of the answer.
            copyAnswers[formSwitcher - 2] = {
                ...copyAnswers[formSwitcher - 2],
                title: title
            };
            copyNewQuestion = {...newQuestion,
                answers: [...copyAnswers]
            };
        }
        setNewQuestion(copyNewQuestion);
        setTitle(''); //The title is cleared so that there is an empty input in the dialog form.
    }

    const addQuestion = (): void => { //This function assigns an array of correct answer numbers to the "correctAnswers" field of a new question, and then adds the new question to the array of questions.
        const arrayOfStrings: string[] | null = title.match(/\d/g); //Title is the value that was entered in the window for entering the numbers of correct answers.
        if (arrayOfStrings && arrayOfStrings.length) {
            const arrayOfNumbers: number[] = arrayOfStrings.map(elem => Number(elem));
            const copyNewQuestion: QuestionsType = {...newQuestion, correctAnswers: arrayOfNumbers};
            setQuestions([...questions, copyNewQuestion]);
        }
        setNewQuestion(initialNewQuestion);
    }

    const changeAnswerStatus = (answerIndex: number, questionIndex: number, value: boolean): void => {
        questions[questionIndex].answers[answerIndex].checked = !value;
        setQuestions([...questions]);
    }

    const startTest = (): void => {
        setDisabledButtons(true);
    }

    const sendAnswers = (): void => { //The function determines whether all questions have been answered, and also determines the questions to which incorrect answers are given, and depending on this, it calls system messages No. 4, 5, 7.
        let doesTheQuestionHaveCheckedAnswers: boolean = true;

        const wrongQuestions: number[] = questions.reduce((acc: number[], question: QuestionsType, questionIndex: number): number[] => {
            let numberOfUncheckedAnswers: number = 0; //A variable that is assigned the number of unchecked answers.
            for (let i = 0; i < question.answers.length; i++) {
                !question.answers[i].checked && numberOfUncheckedAnswers++
                if ((question.answers[i].checked && !question.correctAnswers.includes(i + 1)) || (!question.answers[i].checked && question.correctAnswers.includes(i + 1))) { //If the answer is marked, but it is not in the correct answers, then the question is counted as incorrect. Also, if the answer is not marked, but it is in the correct answers, then the question is again considered incorrect.
                    !acc.includes(questionIndex + 1) && acc.push(questionIndex + 1); //If the question is not correct, then its number (starting from 1) is added to the array with serial numbers of incorrect questions.
                }
            }
            if (numberOfUncheckedAnswers === 4) { //If all the answers to at least one question are unmarked, then system message No. 4 is called
                setAlertSwitcher(4);
                doesTheQuestionHaveCheckedAnswers = false;
            }
            return acc;
        }, []);

        if (doesTheQuestionHaveCheckedAnswers) {
            !wrongQuestions.length ? setAlertSwitcher(5) : setAlertSwitcher(7);
            setNumbersOfWrongQuestions(wrongQuestions);
        }
    }

    return (
        <div className={styles.App}>
            <Header numberOfQuestions={questions.length}
                    handleAddQuestion={handleAddQuestion}
                    disabledButtons={disabledButtons}
                    startTest={startTest}
            />
            <FormDialog title={title}
                        onChangeTextField={setTitle}
                        formSwitcher={formSwitcher}
                        onChangeFormSwitcher={setFormSwitcher}
                        saveTitle={saveTitle}
                        addQuestion={addQuestion}
                        onChangeAlertSwitcher={setAlertSwitcher}
            />
            <AlertDialog alertSwitcher={alertSwitcher}
                         onChangeAlertSwitcher={setAlertSwitcher}
                         setNumbersOfWrongQuestions={setNumbersOfWrongQuestions}
                         formSwitcher={formSwitcher}
                         onChangeFormSwitcher={setFormSwitcher}
                         numbersOfWrongQuestions={numbersOfWrongQuestions}
                         questions={questions}
            />
            {disabledButtons && <QuestionsForm questions={questions}
                                               changeAnswerStatus={changeAnswerStatus}
                                               sendAnswers={sendAnswers}
            />}
        </div>
    )
}

export default App;

