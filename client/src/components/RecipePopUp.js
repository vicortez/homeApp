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
  }

  handleChangeIngredient = ingregientTyped => event => {
    this.setState({
      [ingregientTyped]: event.target.value
    });
  };

  handleChangeMethod = methodTyped => event => {
    this.setState({
      [methodTyped]: event.target.value
    });
  };

  clearInputIngregient = () => {
    this.state.ingredientTyped = "";
  };

  callAddTaskIngredient = () => {
    this.props.addTask(this.state.ingredientTyped);
    this.clearInputIngredient();
  };

  clearInputMethod = () => {
    this.state.methodTyped = "";
  };

  callAddTaskMethod = () => {
    this.props.addTask(this.state.methodTyped);
    this.clearInputMethod();
  };

  render() {
    const { classes } = this.props;
    console.log("TITLE:");
    console.log(this.props.recipeTitle);
    return (
      <div>
        <Popup
          open={this.props.open}
          closeOnDocumentClick={false}
          onClose={this.props.togglePopUp}
        >
          <div className="modal">
            <Button className="close" onClick={this.props.onClose}>
              &times;
            </Button>
          </div>

          <div className={"center-childs-grid"}>
            {this.props.recipeTitle}

            <TextField
              id="outlined-name"
              label="Adicionar novo item"
              className={classNames(classes.textField, "auto-margin")}
              value={this.state.ingregientTyped}
              onChange={this.handleChangeIngredient("ingregientTyped")}
              margin="normal"
              variant="outlined"
            />
            <Button // add ingredientes
              variant="outlined"
              color="primary"
              className={classNames(styles.mybutton)}
              onClick={() => {
                this.callAddTaskIngredient();
              }}
            >
              Adicionar ingrediente
            </Button>

            <TextField
              id="outlined-name"
              label="Adicionar novo item"
              className={classNames(classes.textField, "auto-margin")}
              value={this.state.methodTyped}
              onChange={this.handleChangeMethod("methodTyped")}
              margin="normal"
              variant="outlined"
            />
            <Button // add method
              variant="outlined"
              color="primary"
              className={classNames(styles.mybutton)}
              onClick={() => {
                this.callAddTaskMethod();
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
