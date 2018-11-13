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

  handleChangeIngredient = ingredientTyped => event => {
    this.setState({
      [ingredientTyped]: event.target.value
    });
  };

  handleChangeRecipe = RecipeTyped => event => {
    this.setState({
      [RecipeTyped]: event.target.value
    });
  };

  clearInputIngredient = () => {
    this.state.ingredientTyped = "";
  };

  callAddIngredient = () => {
    this.props.addIngredient(this.state.ingredientTyped);
    this.clearInputIngredient();
  };

  // clearInputRecipe = () => {
  //   this.state.RecipeTyped = "";
  // };

  callAddRecipe = () => {
    this.props.addRecipe(this.state.RecipeTyped);
    this.setState({
      popUpOpen: false
    })
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
                label="Adicionar receita"
                // className={classNames(classes.textField, "auto-margin")}
                value={this.state.recipeTyped}
                onChange={this.handleChangeRecipe("recipeTyped")}
                margin="normal"
                variant="outlined"
              />
              <Button // add recipe
                variant="outlined"
                color="primary"
                // className={classNames(styles.mybutton)}
                onClick={() => {
                  this.callAddRecipe();
                }}
              >
                Adicionar receita
              </Button>
            </div>



          </div>
          <br></br>
          <br></br>
        </Popup>
      </div>
    );
  }
}

export default withStyles(styles)(RecipePopUp);