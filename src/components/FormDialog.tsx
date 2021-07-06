import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { FormDialogType, FormSwitcherType } from '../AppTypes';
import {
  deleteLastQuestionAC,
  setAnswerTitleAC,
  setCorrectAnswersAC,
  setQuestionTitleAC
} from '../state/questions-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { formDialogToggleAC, setFormSwitcherAC } from '../state/form-dialog-reducer';
import { alertDialogToggleAC, setAlertSwitcherAC } from '../state/alert-dialog-reducer';

export const FormDialog: React.FC = React.memo(() => {
  console.log('FormDialog');
  const dispatch = useDispatch();
  const formDialog = useSelector<AppRootStateType, FormDialogType>(state => state.formDialog);

  const [title, setTitle] = useState<string>('');

  const saveTitle = useCallback((formSwitcher: FormSwitcherType, title: string): void => {
    switch (formSwitcher) {
      case 0: {
        dispatch(setQuestionTitleAC(title));
        break;
      }
      case 5: {
        const arrayOfStrings: string[] | null = title.match(/\d/g);
        if (arrayOfStrings && arrayOfStrings.length) {
          const arrayOfNumbers: number[] = arrayOfStrings.map(elem => Number(elem));
          dispatch(setCorrectAnswersAC(arrayOfNumbers));
        }
        break;
      }
      default: {
        dispatch(setAnswerTitleAC(title, formSwitcher - 1));
        break;
      }
    }
    setTitle('');
  }, [dispatch]);

  const handleClose = useCallback((): void => {
    dispatch(formDialogToggleAC(false));
    dispatch(deleteLastQuestionAC());
  },[dispatch]);

  const onCancelClick = useCallback((): void => {
    handleClose();
    setTitle('');
  },[handleClose]);

  const createDialogFormText = useCallback(() => {
    const formDialogMessages = {
      0: 'Введите текст вопроса',
      1: 'Введите текст 1 варианта ответа',
      2: 'Введите текст 2 варианта ответа',
      3: 'Введите текст 3 варианта ответа',
      4: 'Введите текст 4 варианта ответа',
      5: 'Введите номера правильных ответов через запятую. Нумерация начинается с 1'
    };
    return formDialogMessages[formDialog.formSwitcher];
  },[formDialog.formSwitcher]);

  const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    e.key === 'Enter' && onOkClick();
  };

  const onOkClick = useCallback((): void => {
    let isTitleCorrect: boolean = true;

    if (!/^[1-4](?:,[1-4]){0,3}$/g.test(title) || /(\d).*\1/.test(title)) {
      isTitleCorrect = false;
    }

    if (title.length && formDialog.formSwitcher === 5 && !isTitleCorrect) {
      handleClose();
      dispatch(setAlertSwitcherAC(6));
      dispatch(alertDialogToggleAC(true));
      setTitle('');
      return;
    }

    if (!title.trim().length) {
      switch (formDialog.formSwitcher) {
        case 0:
          dispatch(setAlertSwitcherAC(1));
          break;
        case 5:
          dispatch(setAlertSwitcherAC(3));
          break;
        default:
          dispatch(setAlertSwitcherAC(2));
          break;
      }
      handleClose();
      dispatch(alertDialogToggleAC(true));
      setTitle('');
      return;
    }

    if (formDialog.formSwitcher === 5) { //The actions of the program after clicking the OK button in the dialog box for entering the correct answer options in case of correct input.
      dispatch(formDialogToggleAC(false));
      dispatch(setFormSwitcherAC(0));
      setTitle('');
    } else {
      dispatch(setFormSwitcherAC(formDialog.formSwitcher + 1 as FormSwitcherType));
    }
    saveTitle(formDialog.formSwitcher, title);
  },[dispatch, formDialog.formSwitcher, handleClose, saveTitle, title]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div>
      <Dialog
        open={formDialog.isFormDialogActive}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
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
  );
});