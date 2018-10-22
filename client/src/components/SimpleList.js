import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import "../index.css";
import requests from "../requests";
import TabForm from "./TabForm";

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
  }
});

class SimpleList extends React.Component {
  state = {
    value: 0,
    shoppingListItems: [""]
  };

  fetchFromDatabase = () => {
    requests
      .getAll("todoTasks")
      .then(response => {
        let tasksArray = response.data.map(el => {
          this.state[el._id] = false;
          return { text: el.text, _id: el._id };
        });
        this.setState({
          shoppingListItems: tasksArray,
          loaded: true
        });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.fetchFromDatabase();
  }

  toggleStriketrough = _id => {
    this.setState({
      [_id]: this.state[_id] === true ? false : true
    });
    console.log(this.state);
  };

  removeStrikethroughs = () => {
    this.state.shoppingListItems.map(el => {
      if (this.state[el._id] === true) {
        requests
          .deleteSome("todoTasks", el._id)
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

  render() {
    const { classes } = this.props;
    //console.log(styles);
    return (
      <div
        className={classNames(classes.root, classes.paddedList, "margin-auto")}
      >
        <TabForm
          removeStrikethroughs={this.removeStrikethroughs}
          fetchFromDatabase={this.fetchFromDatabase}
        />
        <Divider />
        <List component="nav">
          {this.state.shoppingListItems.map(el => {
            return (
              <ListItem
                onClick={() => {
                  this.toggleStriketrough(el._id);
                }}
                button
                className={classNames("low-padding-vertically")}
              >
                <ListItemText
                  className={
                    this.state[el._id] === true
                      ? "strikethrough-text"
                      : "normal-text"
                  }
                  primary={el.text}
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleList);
