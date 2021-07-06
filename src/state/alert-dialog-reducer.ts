import { AlertDialogType, AlertSwitcherType } from '../AppTypes';
import { initialAlertDialog } from '../AppConst';

type ActionsType =
  SetAlertSwitcherActionType
  | AlertDialogToggleActionType

type SetAlertSwitcherActionType = {
  type: 'SET-ALERT-SWITCHER'
  alertSwitcherValue: AlertSwitcherType
}
type AlertDialogToggleActionType = {
  type: 'ALERT-DIALOG-TOGGLE'
  value: boolean
}

export const alertDialogReducer = (state: AlertDialogType = initialAlertDialog, action: ActionsType): AlertDialogType => {
  switch (action.type) {
    case 'SET-ALERT-SWITCHER': {
      return { ...state, alertSwitcher: action.alertSwitcherValue };
    }
    case 'ALERT-DIALOG-TOGGLE': {
      return { ...state, isAlertDialogActive: action.value };
    }
    default:
      return state;
  }
};

export const setAlertSwitcherAC = (alertSwitcherValue: AlertSwitcherType): SetAlertSwitcherActionType => {
  return { type: 'SET-ALERT-SWITCHER', alertSwitcherValue } as const;
};
export const alertDialogToggleAC = (value: boolean): AlertDialogToggleActionType => {
  return { type: 'ALERT-DIALOG-TOGGLE', value } as const;
};