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

class MyGenericTab extends React.Component {
  state = {
    value: 0,
    [this.props.itemsKind]: [""]
  };

  fetchFromDatabase = () => {
    requests
      .getAll(this.props.itemsKind)
      .then(response => {
        let tasksArray = response.data.map(el => {
          this.state[el._id] = false;
          return { text: el.text, _id: el._id };
        });
        this.setState({
          [this.props.itemsKind]: tasksArray,
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
    this.state[this.props.itemsKind].map(el => {
      if (this.state[el._id] === true) {
        requests
          .deleteSome(this.props.itemsKind, el._id)
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

  addTask = taskTyped => {
    let body = {
      text: taskTyped
    };
    requests
      .postOne(this.props.itemsKind, body)
      .then(response => {
        this.setState({
          queryResponse: response.data
        });
        this.fetchFromDatabase();
      })
      .catch(error => console.log(error));
  };

  render() {
    const { classes } = this.props;
    console.log(this.state);

    return(
    <div
      className={classNames(classes.root, classes.paddedList, "margin-auto")}
    >
      <TabForm
        addTask={this.addTask}
        itemsKind={this.props.itemsKind}
        removeStrikethroughs={this.removeStrikethroughs}
        ivider
      />


      {this.state.loaded ?
        <List component="nav">
        {this.state[this.props.itemsKind].map(el => {
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
                    
      : <Loading/>
                }




      
      
    </div>
    );
  }
}

export default withStyles(styles)(MyGenericTab);
