import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PromoCode from './promocode';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 200,
    width: 150,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class GuttersGrid extends React.Component {
  constructor(){
    super();
    this.state = {
      spacing: '16',
    }
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            <PromoCode gridClass={classes.paper} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);