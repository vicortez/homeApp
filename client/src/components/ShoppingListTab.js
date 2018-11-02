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
import MyGenericTab from "./MyGenericTab";
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

class ShoppingListTab extends React.Component {
  state = {
    value: 0,
    shoppingListItems: [""]
  };

  render() {
    const { classes } = this.props;
    //console.log(styles);

    return <GenericTextTab itemsKind={"shoppingListItems"} />;
  }
}

ShoppingListTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShoppingListTab);
