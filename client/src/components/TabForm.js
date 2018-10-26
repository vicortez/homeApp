import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import "../index.css";
import requests from "../requests";

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

class TabForm extends React.Component {
  state = {
    taskTyped: ""
  };

  addTask = taskTyped => {
    console.log(taskTyped);
    let body = {
      text: this.state.taskTyped
    };
    requests
      .postOne(this.props.itemsKind, body)
      .then(response => {
        this.setState({
          queryResponse: response.data
        });
        this.props.fetchFromDatabase();
      })
      .catch(error => console.log(error));
    this.clearInput();
  };

  handleChange = taskTyped => event => {
    this.setState({
      [taskTyped]: event.target.value
    });
  };

  clearInput = () => {
    this.state.taskTyped = "";
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
          <div>
            <Button
              variant="outlined"
              color="primary"
              className={classNames(
                classes.button,
                styles.mybutton
              )}
              onClick={() => {
                this.addTask(this.state.taskTyped);
              }}
            >
              Adicionar item
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              containerViewStyle={{ width: "100%", marginLeft: 0 }}
              className={classNames(
                classes.button,
                classes.centered,
                styles.mybutton
              )}
              onClick={() => {
                this.props.removeStrikethroughs(this.props);
              }}
            >
              Remover riscados
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(TabForm);
