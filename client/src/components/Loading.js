import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loading extends React.Component {

  render() {
    return (
      <div className={'centered'}>
        <CircularProgress className={'centered'}/>
        <p>Carregando</p>
      </div>
    );
  }

}

//CircularIndeterminate.propTypes = {
//  classes: PropTypes.object.isRequired,
//};

export default Loading