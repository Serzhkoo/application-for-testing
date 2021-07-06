export type QuestionType = {
    id: string
    title: string
    answers: AnswersType[]
    correctAnswers: number[]
};

export type AnswersType = {
    id: string
    title: string
    checked: boolean
};

export type FormSwitcherType = 0 | 1 | 2 | 3 | 4 | 5;

export type FormDialogType = {
    formSwitcher: FormSwitcherType
    isFormDialogActive: boolean
}

export type AlertSwitcherType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type AlertDialogType = {
    alertSwitcher: AlertSwitcherType
    isAlertDialogActive: boolean
}

export type AlertDialogPropsType = {
    setNumbersOfWrongQuestions: (value: number[]) => void
    numbersOfWrongQuestions: number[]
    questions: QuestionType[]
};

export type QuestionPropsType = {
    questionIndex: number
    title: string
    answers: AnswersType[]
    changeAnswerStatus: (answerId: number, questionId: number, value: boolean) => void
};

export type QuestionsFormPropsType = {
    questions: QuestionType[]
    changeAnswerStatus: (answerId: number, questionId: number, value: boolean) => void
    sendAnswers: () => void
};

export type HeaderPropsType = {
    numberOfQuestions: number
    handleAddQuestion: () => void
    disabledButtons: boolean
    startTest: () => void
};