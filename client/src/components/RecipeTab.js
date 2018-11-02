import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import "../index.css";
import requests from "../requests";
import TabForm from "./TabForm";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Loading from "./Loading";
import SimpleTextList from "./SimpleTextList";
import RecipeList from "./RecipeList";
import Popup from "reactjs-popup";
import RecipePopUp from "./RecipePopUp";

import GenericTextTab from "./GenericTextTab";

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
    popupIsOpen: false
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

  toggleStriketrough = _id => {
    let newarray = this.state.recipes.slice();
    newarray.forEach(el => {
      if (el._id == _id) {
        el.strikethroughed = !el.strikethroughed;
      }
    });
    this.setState({
      recipes: newarray
    });
    console.log("new state after toggling:");
    console.log(this.state);
  };

  removeStrikethroughs = () => {
    this.state.recipes.map(el => {
      if (el.strikethroughed) {
        requests
          .deleteSome("recipes", el._id)
          .then(response => {
            this.setState({
              queryResponse: response.data,
              loaded: true
            });
            console.log(response.data);
            this.fetchFromDatabase();
          })
          .catch(error => console.log(error));
      }
    });
  };

  composeNewRecipe = ()=>{
    this.setState({popupIsOpen: !this.state.popupIsOpen})
    let body = {};
    this.addRecipe(body);
  }
  addRecipe = taskTyped => {
    let body = {
      title: taskTyped.title,
      ingredients: taskTyped.ingredients,
      method: taskTyped.method
    };
    requests.postOne("recipes", body).then(response => {
      this.setState({
        queryResponse: response.data
      });
      this.fetchFromDatabase();
    });
  };

  render() {
    const { classes } = this.props;
    console.log("rendering. state:");
    console.log(this.state);

    return (
      <div
        className={classNames(classes.root, classes.paddedList, "margin-auto")}
      >
        <RecipePopUp open={this.state.popupIsOpen} />
        <TabForm
          addTask={this.composeNewRecipe}
          itemsKind={"recipes"}
          removeStrikethroughs={this.removeStrikethroughs}
        />
        <Divider />
        {this.state.loaded ? (
          <RecipeList
            recipeElements={this.state.recipes}
            toggleStriketrough={this.toggleStriketrough}
          />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(RecipeTab);
