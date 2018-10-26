import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import classNames from "classnames";
import "../index.css";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class SimpleList extends React.Component {
  state = {};
  render() {
    console.log(this.props.shoppingListItems)
    return (
      <List component="nav">
        {this.props.shoppingListItems.map(el => {
          return (
            <ListItem
              onClick={() => {
                this.props.toggleStriketrough(el._id);
              }}
              button
              className={classNames("low-padding-vertically")}
            >
              <ListItemText
                className={
                  this.props[el._id] === true
                    ? "strikethrough-text"
                    : "normal-text"
                }
                primary={el.text}
              />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default withStyles(styles)(SimpleList);
