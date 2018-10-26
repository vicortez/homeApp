import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ShoppingListTab from "./ShoppingListTab";
import classNames from "classnames";
import NoticesTab from "./NoticesTab";
import TabForm from "./TabForm";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 2 }}>
      {props.children}
    </Typography>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value2}
    </button>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
    shoppingListItems: ["nada"]
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classNames(classes)}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="Lista de Compras" />
            <Tab label="Avisos" />
            <Tab label="Cardapio" />
            <Tab label="Receitas" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <ShoppingListTab />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <NoticesTab />
          </TabContainer>
        )}
        {value === 2 && (<Square>hi</Square>
        )}
        {value === 3 && <Square>Item Two</Square>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
