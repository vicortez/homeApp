import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import "../index.css";
import requests from "../requests";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Loading from "./Loading";
import SimpleTextList from "./SimpleTextList";
import RecipeList from "./RecipeList";
import Popup from "reactjs-popup";

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


class RecipePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
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
      <div>
        <Popup
          open={this.props.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          {/* <div className="modal">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
             {this.props.recipeTitle}
          </div> */}

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
            <Button                             // add ingredientes
                variant="outlined"
                color="primary"
                className={classNames(styles.mybutton)}
                onClick={() => {
                  this.callAddTask();
                }}
              >
                Adicionar ingrediente
              </Button>

              <TextField
                id="outlined-name"
                label="Adicionar novo item"
                className={classNames(classes.textField, "auto-margin")}
                value={this.state.taskTyped}
                onChange={this.handleChange("taskTyped")}
                margin="normal"
                variant="outlined"
              />
              <Button                           // add method
                variant="outlined"
                color="primary"
                className={classNames(styles.mybutton)}
                onClick={() => {
                  this.callAddTask();
                }}
              >
                Adicionar método de preparo
              </Button>

          </div>
          
          
        </Popup>
      </div>
    );
  }
}

export default withStyles(styles)(RecipePopUp);
