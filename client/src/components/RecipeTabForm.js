import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import "../index.css";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paddedList: {
    marginTop: "2vh"
  },
  centerChilds: {
    display: "grid",
    flexDirection: "column",
    justifyContent: "center"
  },
  mybutton: {
    width: "100%"
  }
});

class RecipeTabForm extends React.Component {
  state = {
    taskTyped: ""
  };

  handleChange = taskTyped => event => {
    this.setState({
      [taskTyped]: event.target.value
    });
  };

  clearInput = () => {
    this.state.taskTyped = "";
  };

  callAddTask = () => {
    this.props.addTask(this.state.taskTyped);
    this.clearInput();
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div className={"center-childs-grid"}>
          <TextField
            id="outlined-name"
            label="Adicionar novo item"
            className={classNames(classes.textField, "auto-margin")}
            value={this.state.taskTyped}
            onChange={this.handleChange("taskTyped")}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="outlined"
            color="primary"
            className={classNames(classes.button, styles.mybutton)}
            onClick={() => {
              this.callAddTask();
            }}
          >
            Adicionar item
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(RecipeTabForm);
