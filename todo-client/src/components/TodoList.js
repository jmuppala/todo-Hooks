import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { fetchTodos, putTodo, deleteTodo } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const useStyles = {
  root: {
    width: '100%'
  },
};

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchTodos: () => dispatch(fetchTodos()),
  putTodo: (todo) => dispatch(putTodo(todo)),
  deleteTodo: (todoId) => dispatch(deleteTodo(todoId))
});

class TodoList extends Component {

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  handleToggle(todo){

    if (todo.completed) {
      todo.completed = false;
    } else {
      todo.completed = true;
    }

    this.props.putTodo(todo);

  }

  handleDelete(todo){
    this.props.deleteTodo(todo._id);
  }

  render() {

    const { todos, classes } = this.props;

    if (todos.isLoading) {
        return(
            <div className={classes.root}>
              Loading . . .
            </div>
        );
    }
    else if (todos.errMess) {
        return(
          <div className={classes.root}>
            <h4>{todos.errMess}</h4>
          </div>
        );
    }
    else if (todos.todos !== null) {
      return (
        <React.Fragment>
          <List className={classes.root}>
            {todos.todos.filter((todo) => !todo.completed).map((todo) => {
              return (
                <ListItem key={todo._id} role={undefined} dense button onClick={() => this.handleToggle(todo)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': todo._id }}
                    />
                  </ListItemIcon>
                  <ListItemText id={todo._id} primary={todo.title} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments" onClick={() => this.handleDelete(todo)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
          <List className={classes.root}>
            {todos.todos.filter((todo) => todo.completed).map((todo) => {
              return (
                <ListItem key={todo._id} role={undefined} dense button onClick={() => this.handleToggle(todo)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': todo._id }}
                    />
                  </ListItemIcon>
                  <ListItemText id={todo._id} style={{textDecoration: 'line-through'}} primary={todo.title} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments" onClick={() => this.handleDelete(todo)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </React.Fragment>
      );
    }  
    else {
      return(
        <div className={classes.root}>
          <h4>Null</h4>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(TodoList));
