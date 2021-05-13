export type QuestionsType = {
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

export type SwitcherFormType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type AlertSwitcherType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type FormDialogPropsType = {
    title: string
    onChangeTextField: (value: string) => void
    formSwitcher: SwitcherFormType
    onChangeFormSwitcher: (value: SwitcherFormType) => void
    saveTitle: () => void
    addQuestion: () => void
    onChangeAlertSwitcher: (value: AlertSwitcherType) => void
};

export type AlertDialogPropsType = {
    alertSwitcher: AlertSwitcherType
    onChangeAlertSwitcher: (value: AlertSwitcherType) => void
    setNumbersOfWrongQuestions: (value: number[]) => void
    formSwitcher: SwitcherFormType
    onChangeFormSwitcher: (value: SwitcherFormType) => void
    numbersOfWrongQuestions: number[]
    questions: QuestionsType[]
};

export type QuestionPropsType = {
    questionIndex: number
    title: string
    answers: AnswersType[]
    changeAnswerStatus: (answerId: number, questionId: number, value: boolean) => void
};

export type QuestionsFormPropsType = {
    questions: QuestionsType[]
    changeAnswerStatus: (answerId: number, questionId: number, value: boolean) => void
    sendAnswers: () => void
};

export type HeaderPropsType = {
    numberOfQuestions: number
    handleAddQuestion: () => void
    disabledButtons: boolean
    startTest: () => void
};