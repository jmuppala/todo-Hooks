import React, { Component } from 'react';
import { postTodo } from '../redux/ActionCreators';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

  const useStyles = {
    root: {
      '& .MuiTextField-root': {
        margin: '30px 0',
        width: '100%',
      },
    },
  };
  const mapStateToProps = state => {
    return {};
  };

  const mapDispatchToProps = (dispatch) => ({
    postTodo: (todo) => dispatch(postTodo(todo))
  });

class AddTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todoItem: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
      event.preventDefault();
      this.props.postTodo({title: this.state.todoItem, completed: false});
      this.setState({
        todoItem: ''
      });
  }

  render() {
    const { classes } = this.props;
    return(
        <form className={classes.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField label="Add To Do Item Here" value={this.state.todoItem} onChange={event => this.setState({todoItem: event.target.value})} />
        </form>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AddTodo));
