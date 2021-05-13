import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ReactHtmlParser from 'react-html-parser';

import {AlertDialogPropsType} from "../AppTypes";

export const AlertDialog: React.FC<AlertDialogPropsType> = ({
                                                                alertSwitcher,
                                                                onChangeAlertSwitcher,
                                                                setNumbersOfWrongQuestions,
                                                                formSwitcher,
                                                                onChangeFormSwitcher,
                                                                numbersOfWrongQuestions,
                                                                questions
                                                            }) => {
    const onOkClick = (): void => {
        onChangeAlertSwitcher(0);
        onChangeFormSwitcher(0);
        setNumbersOfWrongQuestions([]);
    };

   const createAlertDialogText = (): string => {
       let alertDialogText: string = '';

       switch (alertSwitcher) {
           case 1:
               alertDialogText = 'Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.';
               break;
           case 2:
               alertDialogText = `Вы не ввели текст ${formSwitcher - 1} варианта ответа. Попробуйте добавить вопрос заново.`;
               break;
           case 3:
               alertDialogText = 'Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.';
               break;
           case 4:
               alertDialogText = 'Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.';
               break;
           case 5:
               alertDialogText = `Ваш результат ${questions.length} из ${questions.length}. Вы молодец!`;
               break;
           case 6:
               alertDialogText = 'Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново.';
               break;
           case 7:
               alertDialogText = `<b>Вы неправильно ответили на вопросы:</b></br></br>
${numbersOfWrongQuestions.map(n => `${questions[n - 1].title}</br>`).join('')}
</br><b>Ваш результат ${questions.length - numbersOfWrongQuestions.length} из ${questions.length}.</b>`
               break;

       }
       return alertDialogText;
   }

    return (
        <div>
            <Dialog
                open={alertSwitcher !== 0}
                onClose={onOkClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
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
}