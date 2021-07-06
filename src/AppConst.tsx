import {v1 as uuidv1} from "uuid";
import { AlertSwitcherType, FormSwitcherType } from './AppTypes';

export const initialNewQuestion = {
    id: uuidv1(),
    title: '',
    answers: [
        {id: uuidv1(), title: '', checked: false},
        {id: uuidv1(), title: '', checked: false},
        {id: uuidv1(), title: '', checked: false},
        {id: uuidv1(), title: '', checked: false}
    ],
    correctAnswers: []
};

export const initialQuestions = [
    {
        id: uuidv1(),
        title: '1. Что из перечисленного не является языком программирования?',
        answers: [
            {id: uuidv1(), title: 'HTML', checked: false},
            {id: uuidv1(), title: 'Java', checked: false},
            {id: uuidv1(), title: 'Python', checked: false},
            {id: uuidv1(), title: 'DevOps', checked: false}
        ],
        correctAnswers: [1, 4]
    },
    {
        id: uuidv1(),
        title: '2. Какие из перечисленных видов тестирования могут быть автоматизированы?',
        answers: [
            {id: uuidv1(), title: 'UI тестирование', checked: false},
            {id: uuidv1(), title: 'Юзабилити тестирование', checked: false},
            {id: uuidv1(), title: 'Тестирование совместимости', checked: false},
            {id: uuidv1(), title: 'Unit тестирование', checked: false}
        ],
        correctAnswers: [1, 3, 4]
    },
    {
        id: uuidv1(),
        title: '3. Выберите вариант, который соответствует следующему предложению: "Известно, что грымзик обязательно или полосат, или рогат, или то и другое вместе"',
        answers: [
            {id: uuidv1(), title: 'Грымзик не может быть безрогим', checked: false},
            {id: uuidv1(), title: 'Грымзик не может быть однотонным и безрогим одновременно', checked: false},
            {id: uuidv1(), title: 'Грымзик не может быть полосатым и безрогим одновременно', checked: false},
            {id: uuidv1(), title: 'Грымзик не может быть однотонным и рогатым одновременно', checked: false}
        ],
        correctAnswers: [2]
    },
    {
        id: uuidv1(),
        title: '4. Выберите типы алгоритмов, которых не существует',
        answers: [
            {id: uuidv1(), title: 'Алгоритм с ветвлением', checked: false},
            {id: uuidv1(), title: 'Циклический безусловный', checked: false},
            {id: uuidv1(), title: 'Циклический с параметром', checked: false},
            {id: uuidv1(), title: 'Алгоритм с углублением', checked: false}
        ],
        correctAnswers: [2, 4]
    },
    {
        id: uuidv1(),
        title: '5. Какая (какие) из следующих конструкций используется (используются) для ветвления?',
        answers: [
            {id: uuidv1(), title: 'switch case', checked: false},
            {id: uuidv1(), title: 'if else', checked: false},
            {id: uuidv1(), title: 'do while', checked: false},
            {id: uuidv1(), title: 'for', checked: false}
        ],
        correctAnswers: [1, 2]
    },
];

export const initialFormDialog = {
    formSwitcher: 0 as FormSwitcherType,
    isFormDialogActive: false
};

export const initialAlertDialog = {
    alertSwitcher: 1 as AlertSwitcherType,
    isAlertDialogActive: false
}