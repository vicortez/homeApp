import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import "../index.css";
import requests from "../requests";
import RecipeTabForm from "./RecipeTabForm";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Loading from "./Loading";
import SimpleTextList from "./SimpleTextList";
import RecipeList from "./RecipeList";
import Popup from "reactjs-popup";
import RecipePopUp from "./RecipePopUp";
import RecipeEditPopUp from "./RecipeEditPopUp";


const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paddedList: {
    marginTop: "1vh"
  },
  centerChilds: {
    display: "grid",
    flexDirection: "column",
    justifyContent: "center"
  }
});

class RecipeTab extends React.Component {
  state = {
    value: 0,
    recipes: [""],
    popupIsOpen: false,
    editPopupIsOpen: false,
    recipeTitleTyped: "",
    currentRecipe: {
      title: "",
      ingredientsList: [],
      method: ""
    }
  };

  fetchFromDatabase = () => {
    requests
      .getAll("recipes")
      .then(response => {
        let tasksArray = response.data.map(el => {
          return {
            title: el.title,
            _id: el._id,
            ingredientsList: el.ingredientsList,
            method: el.method
          };
        });

        this.setState({
          recipes: tasksArray,
          loaded: true
        });
        console.log("fetched, state:");
        console.log(this.state);
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.fetchFromDatabase();
  }

  composeNewRecipe = title => {
    this.setRecipeTitle(title);
    this.togglePopUp();
    let body = {};
  };

  addRecipe = () => {
    requests.postOneRecipe(this.state.currentRecipe).then(response => {
      this.setState({
        queryResponse: response.data
      });
      this.fetchFromDatabase();
      let recipe = this.state.currentRecipe;
      recipe["ingredientsList"] = [];
      recipe["method"] = "";
      this.setState({
        currentRecipe: recipe
      });
    });
    console.log("method:");
    console.log(this.state.currentRecipe);
  };

  addIngredient = ingredientTyped => {
    let currentIngredientsArray = this.state.currentRecipe.ingredientsList;
    currentIngredientsArray.push(ingredientTyped);
    let recipe = this.state.currentRecipe;
    recipe["ingredientsList"] = currentIngredientsArray;
    this.setState({
      currentRecipe: recipe
    });
    console.log("current recipe updated:");
    console.log(this.state.currentRecipe);
  };

  setRecipeTitle = title => {
    let recipe = this.state.currentRecipe;
    recipe["title"] = title;
    this.setState({
      currentRecipe: recipe
    });
  };

  setCurrentMethod = methodTyped => {
    let recipe = this.state.currentRecipe;
    recipe["method"] = methodTyped;
    this.setState({
      currentRecipe: recipe
    });
  };

  togglePopUp = () => {
    this.setState({ popupIsOpen: !this.state.popupIsOpen });
  };
  toggleEditPopUp = () => {
    this.setState({ editPopupIsOpen: !this.state.editPopupIsOpen });
  };

  deleteOneRecipe = id => {
    requests.deleteOne("recipes", id).then(response => {
      this.setState({
        requestResponse: response
      });
      this.fetchFromDatabase();
    });
  };
  editOneRecipe = recipe => {
    this.setState({
      currentRecipe: recipe
    })
    this.toggleEditPopUp();
  };
  requestEditPopUp = (id)=> {
    let recipe = this.state.currentRecipe;
    requests.editOneRecipe(id, recipe).then(response => {
      this.setState({
        requestResponse: response
      });
      this.fetchFromDatabase();
    });    
  }

  render() {
    const { classes } = this.props;
    console.log("rendering. state:");
    console.log(this.state);

    return (
      <div
        className={classNames(classes.root, classes.paddedList, "margin-auto")}
      >
        <RecipePopUp
          open={this.state.popupIsOpen}
          recipeTitle={this.state.currentRecipe.title}
          addRecipe={this.addRecipe}
          onClose={this.togglePopUp}
          addIngredient={this.addIngredient}
          setCurrentMethod={this.setCurrentMethod}
        />
        <RecipeEditPopUp
          open={this.state.editPopupIsOpen}
          recipeTitle={this.state.currentRecipe.title}
          editRecipe={this.editOneRecipe}
          onClose={this.toggleEditPopUp}
          addIngredient={this.addIngredient}
          editIngredient={this.editIngredient}
          setCurrentMethod={this.setCurrentMethod}
        />
        <RecipeTabForm
          composeNewRecipe={this.composeNewRecipe}
          itemsKind={"recipes"}
          removeStrikethroughs={this.removeStrikethroughs}
        />
        <Divider />
        {this.state.loaded ? (
          <RecipeList
            recipeElements={this.state.recipes}
            deleteRecipe={this.deleteOneRecipe}
            editRecipe={this.editOneRecipe}
          />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(RecipeTab);
