import React, { useCallback, useState } from 'react';

import { FormDialog } from './components/FormDialog';
import { QuestionsForm } from './components/QuestionsForm';
import { AlertDialog } from './components/AlertDialog';
import styles from './App.module.css';
import { QuestionType } from './AppTypes';
import { Header } from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { formDialogToggleAC, setFormSwitcherAC } from './state/form-dialog-reducer';
import { addQuestionAC, changeAnswerStatusAC } from './state/questions-reducer';
import { alertDialogToggleAC, setAlertSwitcherAC } from './state/alert-dialog-reducer';

const App: React.FC = () => {
  console.log('App');
  const dispatch = useDispatch();
  const questions = useSelector<AppRootStateType, QuestionType[]>(state => state.questions);

  const [disabledButtons, setDisabledButtons] = useState<boolean>(false);
  const [numbersOfWrongQuestions, setNumbersOfWrongQuestions] = useState<number[]>([]);

  const handleAddQuestion = useCallback((): void => {
    dispatch(setFormSwitcherAC(0));
    dispatch(formDialogToggleAC(true));
    dispatch(addQuestionAC());
  },[dispatch]);

  const changeAnswerStatus = useCallback( (answerIndex: number, questionIndex: number, value: boolean): void => {
    dispatch(changeAnswerStatusAC(answerIndex, questionIndex, value));
  },[dispatch]);

  const startTest = useCallback((): void => {
    setDisabledButtons(true);
  },[]);

  const sendAnswers = useCallback((): void => {
    let doesTheQuestionHasCheckedAnswers: boolean = true;

    const wrongQuestions: number[] = questions.reduce((acc: number[], question: QuestionType, questionIndex: number): number[] => {
      let numberOfUncheckedAnswers: number = 0;
      for (let i = 0; i < question.answers.length; i++) {
        !question.answers[i].checked && numberOfUncheckedAnswers++;
        if ((question.answers[i].checked && !question.correctAnswers.includes(i + 1)) || (!question.answers[i].checked && question.correctAnswers.includes(i + 1))) {
          !acc.includes(questionIndex + 1) && acc.push(questionIndex + 1);
        }
      }
      if (numberOfUncheckedAnswers === 4) {
        dispatch(setAlertSwitcherAC(4));
        doesTheQuestionHasCheckedAnswers = false;
      }
      return acc;
    }, []);

    if (doesTheQuestionHasCheckedAnswers) {
      !wrongQuestions.length ? dispatch(setAlertSwitcherAC(5)) : dispatch(setAlertSwitcherAC(7));
      setNumbersOfWrongQuestions(wrongQuestions);
    }
    dispatch(alertDialogToggleAC(true));
  },[dispatch, questions]);

  return (
    <div className={styles.App}>
      <Header numberOfQuestions={questions.length}
              handleAddQuestion={handleAddQuestion}
              disabledButtons={disabledButtons}
              startTest={startTest}
      />
      <FormDialog/>
      <AlertDialog setNumbersOfWrongQuestions={setNumbersOfWrongQuestions}
                   numbersOfWrongQuestions={numbersOfWrongQuestions}
                   questions={questions}
      />
      {disabledButtons && <QuestionsForm questions={questions}
                                         changeAnswerStatus={changeAnswerStatus}
                                         sendAnswers={sendAnswers}
      />}
    </div>
  );
};

export default App;

