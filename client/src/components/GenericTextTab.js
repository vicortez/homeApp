import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import "../index.css";
import requests from "../requests";
import TextTabForm from "./TextTabForm";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Loading from "./Loading";
import SimpleTextList from "./SimpleTextList";

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

class GenericTextTab extends React.Component {
  state = {
    value: 0,
    [this.props.itemsKind]: [""],
    popUpOpen: false
  };

  fetchFromDatabase = () => {
    requests
      .getAll(this.props.itemsKind)
      .then(response => {
        let tasksArray = response.data.map(el => {
          return { text: el.text, _id: el._id, strikethroughed: false };
        });

        this.setState({
          [this.props.itemsKind]: tasksArray,
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
    let newarray = this.state[this.props.itemsKind].slice();
    newarray.forEach(el => {
      if (el._id == _id) {
        el.strikethroughed = !el.strikethroughed;
      }
    });
    this.setState({
      [this.props.itemsKind]: newarray
    });
    console.log("new state after toggling:");
    console.log(this.state);
  };

  removeStrikethroughs = () => {
    this.state[this.props.itemsKind].map(el => {
      if (el.strikethroughed) {
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
    console.log("rendering. state:");
    console.log(this.state);

    return (
      <div
        className={classNames(classes.root, classes.paddedList, "margin-auto")}
      >
        <TextTabForm
          addTask={this.addTask}
          itemsKind={this.props.itemsKind}
          removeStrikethroughs={this.removeStrikethroughs}
        />
        <Divider />
        {this.state.loaded ? (
          <div>
            <SimpleTextList
              itemsKind={this.props.itemsKind}
              textElements={this.state[this.props.itemsKind]}
              toggleStriketrough={this.toggleStriketrough}
            />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(GenericTextTab);
