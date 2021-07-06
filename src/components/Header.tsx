import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import Button from '@material-ui/core/Button';
import { HeaderPropsType } from '../AppTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(2)
      }
    }
  })
);

const defaultProps = {
  color: 'secondary' as 'secondary',
  children: <QuestionAnswerTwoToneIcon/>
};

export const Header: React.FC<HeaderPropsType> = React.memo(({
                                                               numberOfQuestions,
                                                               handleAddQuestion,
                                                               disabledButtons,
                                                               startTest
                                                             }) => {
  console.log('Header');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge badgeContent={numberOfQuestions} {...defaultProps} />
      <Button variant="contained"
              onClick={handleAddQuestion}
              disabled={disabledButtons}>
        Добавить вопрос
      </Button>
      <Button variant="contained"
              disabled={disabledButtons}
              onClick={startTest}>
        Начать тест
      </Button>
    </div>
  );
});