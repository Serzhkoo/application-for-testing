import { combineReducers, createStore } from 'redux';
import { questionsReducer } from './questions-reducer';
import { formDialogReducer } from './form-dialog-reducer';
import { alertDialogReducer } from './alert-dialog-reducer';

const rootReducer = combineReducers({
  questions: questionsReducer,
  formDialog: formDialogReducer,
  alertDialog: alertDialogReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);