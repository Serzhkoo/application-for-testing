import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ReactHtmlParser from 'react-html-parser';

import { AlertDialogPropsType, AlertDialogType, FormDialogType } from '../AppTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { alertDialogToggleAC } from '../state/alert-dialog-reducer';

export const AlertDialog: React.FC<AlertDialogPropsType> = React.memo(({

                                                                         setNumbersOfWrongQuestions,

                                                                         numbersOfWrongQuestions,
                                                                         questions
                                                                       }) => {
  console.log('AlertDialog');
  const dispatch = useDispatch();
  const formDialog = useSelector<AppRootStateType, FormDialogType>(state => state.formDialog);
  const alertDialog = useSelector<AppRootStateType, AlertDialogType>(state => state.alertDialog);

  const onOkClick = useCallback((): void => {
    dispatch(alertDialogToggleAC(false));
    setNumbersOfWrongQuestions([]);
  },[dispatch, setNumbersOfWrongQuestions]);

  const createAlertDialogText = useCallback((): string => {
    let alertDialogMessages = {
      1: 'Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.',
      2: `Вы не ввели текст ${formDialog.formSwitcher} варианта ответа. Попробуйте добавить вопрос заново.`,
      3: 'Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.',
      4: 'Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.',
      5: `Ваш результат ${questions.length} из ${questions.length}. Вы молодец!`,
      6: 'Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново.',
      7: `<b>Вы неправильно ответили на вопросы:</b></br></br>
${numbersOfWrongQuestions.map(n => `${questions[n - 1].title}</br>`).join('')}
</br><b>Ваш результат ${questions.length - numbersOfWrongQuestions.length} из ${questions.length}.</b>`
    };

    return alertDialogMessages[alertDialog.alertSwitcher];
  },[alertDialog.alertSwitcher, formDialog.formSwitcher, numbersOfWrongQuestions, questions]);

  return (
    <div>
      <Dialog
        open={alertDialog.isAlertDialogActive}
        onClose={onOkClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ReactHtmlParser(createAlertDialogText())}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onOkClick} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});