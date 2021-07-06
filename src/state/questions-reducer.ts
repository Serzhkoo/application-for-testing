import { QuestionType } from '../AppTypes';
import { initialNewQuestion, initialQuestions } from '../AppConst';
import {v1 as uuidv1} from "uuid";

type ActionsType =
  SetQuestionTitleActionType
  | SetAnswerTitleActionType
  | SetCorrectAnswersActionType
  | AddQuestionActionType
  | DeleteLastQuestionActionType
  | ChangeAnswerStatusActionType

type SetQuestionTitleActionType = {
  type: 'SET-QUESTION-TITLE'
  title: string
}
type SetAnswerTitleActionType = {
  type: 'SET-ANSWER-TITLE'
  title: string
  answerIndex: number
}
type SetCorrectAnswersActionType = {
  type: 'SET-CORRECT-ANSWERS'
  numbersOfCorrectAnswers: number[]
}
type AddQuestionActionType = {
  type: 'ADD-QUESTION'
}
type DeleteLastQuestionActionType = {
  type: 'DELETE-LAST-QUESTION'
}
type ChangeAnswerStatusActionType = {
  type: 'CHANGE-ANSWER-STATUS'
  answerIndex: number
  questionIndex: number
  value: boolean
}

export const questionsReducer = (state: QuestionType[] = initialQuestions, action: ActionsType): QuestionType[] => {
  const lastQuestion = state[state.length - 1];

  switch (action.type) {
    case 'SET-QUESTION-TITLE': {
      return state.slice(0, state.length - 1).concat({
        ...lastQuestion,
        title: `${state.length}. ${action.title}`
      });
    }
    case 'SET-ANSWER-TITLE': {
      return state.slice(0, state.length - 1).concat({
        ...lastQuestion,
        answers: [...lastQuestion.answers].map((answer, index) => index === action.answerIndex ? {
          ...answer,
          title: action.title
        } : answer)
      });
    }
    case 'SET-CORRECT-ANSWERS': {
      return state.slice(0, state.length - 1).concat({
        ...lastQuestion,
        correctAnswers: action.numbersOfCorrectAnswers
      });
    }
    case 'ADD-QUESTION': {
      return [...state, {...initialNewQuestion, id: uuidv1()}];
    }
    case 'DELETE-LAST-QUESTION': {
      return state.slice(0, state.length - 1);
    }
    case 'CHANGE-ANSWER-STATUS': {
      return state.map((question, questionIndex) => questionIndex === action.questionIndex ? { ...question,
        answers: [...question.answers].map((answer, answerIndex) => answerIndex === action.answerIndex ? {
          ...answer,
          checked: !action.value
        } : answer)
      } : question);
    }
    default:
      return state;
  }
};

export const setQuestionTitleAC = (title: string): SetQuestionTitleActionType => {
  return { type: 'SET-QUESTION-TITLE', title } as const;
};
export const setAnswerTitleAC = (title: string, answerIndex: number): SetAnswerTitleActionType => {
  return { type: 'SET-ANSWER-TITLE', title, answerIndex } as const;
};
export const setCorrectAnswersAC = (numbersOfCorrectAnswers: number[]): SetCorrectAnswersActionType => {
  return { type: 'SET-CORRECT-ANSWERS', numbersOfCorrectAnswers } as const;
};
export const addQuestionAC = (): AddQuestionActionType => {
  return { type: 'ADD-QUESTION' } as const;
};
export const deleteLastQuestionAC = (): DeleteLastQuestionActionType => {
  return { type: 'DELETE-LAST-QUESTION' } as const;
};
export const changeAnswerStatusAC = (answerIndex: number, questionIndex: number, value: boolean): ChangeAnswerStatusActionType => {
  return { type: 'CHANGE-ANSWER-STATUS', answerIndex, questionIndex, value } as const;
};