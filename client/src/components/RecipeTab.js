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
    recipeTitleTyped: ""
  };

  fetchFromDatabase = () => {
    requests
      .getAll("recipes")
      .then(response => {
        let tasksArray = response.data.map(el => {
          return { text: el.text, _id: el._id, strikethroughed: false };
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
    this.setRecipeTitle(title)
    this.togglePopUp();
    let body = {};
  };

  addRecipe = recipeTyped => {
    let body = {
      title: recipeTyped.title,
      ingredients: recipeTyped.ingredients,
      method: recipeTyped.method
    };
    requests.postOneRecipe(body).then(response => {
      this.setState({
        queryResponse: response.data
      });
      this.fetchFromDatabase();
    });
  };

  setRecipeTitle = title => {
    this.setState({
      recipeTitleTyped: title
    });
  };

  togglePopUp = () => {
    this.setState({ popupIsOpen: !this.state.popupIsOpen });
  };

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
          recipeTitle={this.state.recipeTitleTyped}
          addRecipe={this.addRecipe}
          onClose={this.togglePopUp}
        />
        <RecipeTabForm
          composeNewRecipe={this.composeNewRecipe}
          itemsKind={"recipes"}
          removeStrikethroughs={this.removeStrikethroughs}
        />
        <Divider />
        {this.state.loaded ? (
          <RecipeList recipeElements={this.state.recipes} />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(RecipeTab);
