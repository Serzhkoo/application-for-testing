import React from 'react';
import Button from '@material-ui/core/Button';

import { Question } from './Question';
import { QuestionsFormPropsType, QuestionType } from '../AppTypes';

export const QuestionsForm: React.FC<QuestionsFormPropsType> = React.memo(({
                                                                             questions,
                                                                             changeAnswerStatus,
                                                                             sendAnswers
                                                                           }) => {
  console.log('QuestionsForm');
  const onClickHandler = (): void => {
    sendAnswers();
  };

  return (
    <div>
      {questions.map((question: QuestionType, questionIndex: number) => {

        return (
          <Question key={question.id}
                    questionIndex={questionIndex}
                    title={question.title}
                    answers={question.answers}
                    changeAnswerStatus={changeAnswerStatus}
          />);
      })}
      <Button variant="contained"
              onClick={onClickHandler}>
        Отправить
      </Button>
    </div>
  );
});