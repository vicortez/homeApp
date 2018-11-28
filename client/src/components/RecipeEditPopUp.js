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
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";

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

  handleChangeIngredient = ingredientTyped => event => {
    this.setState({
      [ingredientTyped]: event.target.value
    });
  };

  handleChangeMethod = methodTyped => event => {
    this.setState({
      [methodTyped]: event.target.value
    });
  };

  clearInputIngredient = () => {
    this.state.ingredientTyped = "";
  };

  clearInputMethod = () => {
    this.state.methodTyped = "";
  };

  callAddIngredient = () => {
    this.props.addIngredient(this.state.ingredientTyped);
    this.clearInputIngredient();
  };

  // clearInputRecipe = () => {
  //   this.state.RecipeTyped = "";
  // };

  callAddRecipe = () => {
    this.props.setCurrentMethod(this.state.methodTyped);
    this.props.addRecipe();
    this.setState({
      popUpOpen: false
    });
    this.clearInputMethod();
  };
  callEditRecipe = () => {
    this.props.setCurrentMethod(this.state.methodTyped);
    this.props.editRecipe();
    this.setState({
      popUpOpen: false
    });
    this.clearInputMethod();
  };

  render() {
    const { classes } = this.props;
    console.log("ingredients:");
    console.log(this.props.getAllIngredients());
    console.log("ingredients:");
    console.log(this.props.getAllIngredients());
    return (
      <div>
        <Popup
          open={this.props.open}
          closeOnDocumentClick={false}
          onClose={this.props.togglePopUp}
          className={classNames("pctscreen")}
        >
          <div className={"margin-auto"}>
            <Button className="close" onClick={this.props.onClose}>
              &times;
            </Button>
          </div>

          <div className={"popup-grid"}>
            {this.props.recipeTitle}
            <div>
              {this.props.getAllIngredients().map((ingred, pos) => {
                return (
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={"center-delete"}
                    onClick={() => {
                      this.props.deleteIngredient(pos);
                    }}
                  >
                    {ingred}
                    <DeleteIcon className={classes.rightIcon} />
                  </Button>
                );
              })}
            </div>

            <div>
              <TextField
                id="outlined-name"
                label="Adicionar novo ingrediente"
                // className={classNames(classes.textField, "auto-margin")}
                value={this.state.ingredientTyped}
                onChange={this.handleChangeIngredient("ingredientTyped")}
                margin="normal"
                variant="outlined"
              />
              <Button // add ingredientes
                variant="outlined"
                color="primary"
                // className={classNames(styles.mybutton)}
                onClick={() => {
                  this.callAddIngredient();
                }}
              >
                Adicionar ingrediente
              </Button>
            </div>

            <div>
              <TextField
                id="outlined-name"
                label="Modificar método de preparo"
                // className={classNames(classes.textField, "auto-margin")}
                value={this.state.methodTyped}
                onChange={this.handleChangeMethod("methodTyped")}
                margin="normal"
                variant="outlined"
              >
                {this.props.getMethod()}
              </TextField>
              <Button // add recipe
                variant="outlined"
                color="primary"
                // className={classNames(styles.mybutton)}
                onClick={() => {
                  this.callEditRecipe();
                }}
              >
                Confirmar modificações na Receita
              </Button>
            </div>
          </div>
          <br />
          <br />
        </Popup>
      </div>
    );
  }
}

export default withStyles(styles)(RecipePopUp);
