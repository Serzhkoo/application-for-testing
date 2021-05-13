import React from "react";

import {AnswersType, QuestionPropsType} from "../AppTypes";
import {Checkbox} from "@material-ui/core";

export const Question: React.FC<QuestionPropsType> = ({
                                                          questionIndex,
                                                          title,
                                                          answers,
                                                          changeAnswerStatus
                                                      }) => {

    const onChangeAnswerStatus = (answerIndex: number, checked: boolean): void => {
        changeAnswerStatus(answerIndex, questionIndex, checked);
    }

    return (
        <div>
            <div>
                <label><b>{title}</b></label>
            </div>
            <ul>
                {answers.map((answer: AnswersType, answerIndex: number) => <li key={answer.id}>
                        <Checkbox
                            checked={answer.checked}
                            onChange={() => onChangeAnswerStatus(answerIndex, answer.checked)}
                            size="small"
                            inputProps={{'aria-label': 'checkbox with small size'}}
                            color="primary"
                        />
                    <label>{answer.title}</label>
                    </li>
                )
                }
            </ul>
        </div>
    )
}