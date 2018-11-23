import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import classNames from "classnames";
import "../index.css";
import RecipeTab from "./RecipeTab";
import RecipeCard from "./RecipeCard";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class RecipeList extends React.Component {
  state = {};

  render() {
    console.log("Recipes:");
    console.log(this.props.recipeElements);
    return (
      <List component="nav">
        {this.props.recipeElements.map(el => {
          console.log(el)
          return (
            <ListItem
              key={el._id}
              onClick={() => {
              }}
              button
              className={classNames("low-padding-vertically")}
            >
              <RecipeCard
                title = {el.title}
                ingredientsList = {el.ingredientsList}
                method = {el.method}
              />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default withStyles(styles)(RecipeList);