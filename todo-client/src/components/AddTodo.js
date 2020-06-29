import React, { useState } from 'react';
import { postTodo } from '../redux/ActionCreators';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

  const useStyles = makeStyles({
    root: {
      '& .MuiTextField-root': {
        margin: '30px 0',
        width: '100%'
      }
    }
  });

  export default function  AddTodo () {
    const classes = useStyles();

    const [todoItem, setTodoItem] = useState('');

    const dispatch = useDispatch();


    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(postTodo({title: todoItem, completed: false}));
      setTodoItem('');
    }

    return(
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField label="Add To Do Item Here" value={todoItem} onChange={event => setTodoItem(event.target.value)} />
      </form>
    );

}
