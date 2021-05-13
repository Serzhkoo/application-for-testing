import React, {ChangeEvent, KeyboardEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import {FormDialogPropsType, SwitcherFormType} from "../AppTypes";

export const FormDialog: React.FC<FormDialogPropsType> = ({
                                                              title,
                                                              onChangeTextField,
                                                              formSwitcher,
                                                              onChangeFormSwitcher,
                                                              saveTitle,
                                                              addQuestion,
                                                              onChangeAlertSwitcher
                                                          }) => {

    const handleClose = (): void => {
        onChangeFormSwitcher(0);
    };

    const onCancelClick = (): void => {
        handleClose();
        onChangeTextField('');
    }

    const createDialogFormText = () => {
        let dialogFormText: string = '';

        switch (formSwitcher) {
            case 0:
                dialogFormText = '';
                break;
            case 1:
                dialogFormText = 'Введите текст вопроса';
                break;
            case 6:
                dialogFormText = 'Введите номера правильных ответов через запятую. Нумерация начинается с 1';
                break;
            default:
                dialogFormText = `Введите текст ${formSwitcher - 1} варианта ответа`;
                break;
        } return dialogFormText;
    }

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        e.key === 'Enter' && onOkClick();
    }

    const onOkClick = (): void => {
        let isTitleCorrect: boolean = true;

        if (!/^[1-4](?:,[1-4]){0,3}$/g.test(title) || /(\d).*\1/.test(title)) { //The first part of the logical expression is a check that only numbers 1-4 and commas can be entered. Also, all digits must be separated by a comma, the first and last characters are a digit, in total no more than 4 digits can be entered. The second part is to check that no identical numbers have been entered.
            isTitleCorrect = false;
        }

        if (title.length && formSwitcher === 6 && !isTitleCorrect) {
            onChangeAlertSwitcher(6);
            onChangeTextField('');
            return
        }

        if (!title.trim().length) { //System messages are called depending on which field was not entered.
            switch (formSwitcher) {
                case 1:
                    onChangeAlertSwitcher(1); //System message for the case when the question text was not entered
                    break;
                case 6:
                    onChangeAlertSwitcher(3); //System message for the case when the correct answer options were not entered
                    break;
                default:
                    onChangeAlertSwitcher(2); //System message for the case when the text of the answer option was not entered.
                    break;
            } onChangeTextField('');
            return;
        }

        if (formSwitcher === 6) { //The actions of the program after clicking the OK button in the dialog box for entering the correct answer options in case of correct input.
            handleClose();
            addQuestion();
            onChangeTextField('');
        } else {
            saveTitle();
            onChangeFormSwitcher(formSwitcher + 1 as SwitcherFormType);
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChangeTextField(e.currentTarget.value);
    }

    return (
        <div>
            <Dialog open={formSwitcher !== 0} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        {createDialogFormText()}
                    </DialogContentText>
                    <TextField
                        value={title}
                        onChange={onChange}
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        onKeyPress={onEnterPressHandler}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onOkClick} color="primary">
                        OK
                    </Button>
                    <Button onClick={onCancelClick} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}