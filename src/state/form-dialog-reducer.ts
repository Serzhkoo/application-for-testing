import { FormDialogType, FormSwitcherType } from '../AppTypes';
import { initialFormDialog } from '../AppConst';

type ActionsType =
  SetFormSwitcherActionType
  | FormDialogToggleActionType

type SetFormSwitcherActionType = {
  type: 'SET-FORM-SWITCHER'
  formSwitcherValue: FormSwitcherType
}
type FormDialogToggleActionType = {
  type: 'FORM-DIALOG-TOGGLE'
  value: boolean
}

export const formDialogReducer = (state: FormDialogType = initialFormDialog, action: ActionsType): FormDialogType => {
  switch (action.type) {
    case 'SET-FORM-SWITCHER': {
      return { ...state, formSwitcher: action.formSwitcherValue };
    }
    case 'FORM-DIALOG-TOGGLE': {
      return { ...state, isFormDialogActive: action.value };
    }
    default:
      return state;
  }
};

export const setFormSwitcherAC = (formSwitcherValue: FormSwitcherType): SetFormSwitcherActionType => {
  return { type: 'SET-FORM-SWITCHER', formSwitcherValue } as const;
};
export const formDialogToggleAC = (value: boolean): FormDialogToggleActionType => {
  return { type: 'FORM-DIALOG-TOGGLE', value } as const;
};