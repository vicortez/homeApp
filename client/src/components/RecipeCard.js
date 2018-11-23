import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import "../index.css";


const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
  
});

class RecipeCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  deleteCard = () => {
    this.props.deleteRecipe(this.props.id);
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title={this.props.title} />

        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit className={"center-delete"}>
          <CardContent>
            <Typography paragraph>
              <b>Ingredientes:</b>
            </Typography>
            {this.props.ingredientsList.map(el => {
              return <p>{el}</p>;
            })}
            <hr class="style-two" />
            <Typography paragraph>
              <b>Método</b>:
            </Typography>
            <Typography>{this.props.method}</Typography>
          </CardContent>
          <Button
            variant="outlined"
            color="secondary"
            className={"center-delete"}
          >
            Delete
            <DeleteIcon className={classes.rightIcon} />
          </Button>
        </Collapse>
      </Card>
    );
  }
}

RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeCard);
