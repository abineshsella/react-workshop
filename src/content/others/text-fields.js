import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

class OutlinedTextFields extends React.Component {
   
  
  constructor(){
    super();
    this.state = {
     
    };
    this.handleChange=(name)=>event=>{
      this.setState({
        [name]:event.target.value
      })
      this.props.editPromoDetails(this.state);
    }
  }
  
  insertPromoCodeToTextField(){
    this.state = {
      Description:this.props.promoDetails.promo.Description,
      // Product_Details:this.props.promoDetails.Product_Details,
      PromoId:this.props.promoDetails.promo.PromoId,
      // SalesMan_Id:this.props.promoDetails.SalesMan_Id,
      SalesMan_Name:this.props.promoDetails.salesManName,
      // Validty_From:this.props.promoDetails.Validty_From,
      // Validty_To:this.props.promoDetails.Validty_To,  
    };
  }
  

  render() {
    this.insertPromoCodeToTextField();

    const { classes } = this.props;

    return (
      <form className={classes.container}  >
        <TextField id="outlined-name" label="PromoCode Title" className={classes.textField} value={this.state.PromoId} 
          margin="normal" variant="outlined" onChange={this.handleChange('PromoId')} required/>
         <TextField id="outlined-name" label="Description" className={classes.textField} value={this.state.Description} 
          margin="normal" variant="outlined" onChange={this.handleChange('Description')} required/>
          <TextField type="date" id="outlined-name" label="Validity from" className={classes.textField} value={this.state.Validty_From} 
          margin="normal" variant="outlined" onChange={this.handleChange('Validty_From')}   InputLabelProps={{
            shrink: true,
          }} required/>
          
          <TextField  type="date" id="outlined-name" label="Validity To" className={classes.textField} value={this.state.Validty_To} 
          margin="normal" variant="outlined" onChange={this.handleChange('Validty_To')}
          InputLabelProps={{
            shrink: true,
          }} required/>
          <TextField id="outlined-full-width" label="SalesMan"  style={{ margin: 8 }}  value={this.state.SalesMan_Name} placeholder="Placeholder"  fullWidth margin="normal"           variant="outlined"
           InputLabelProps={{
            shrink: true,
          }} onChange={this.handleChange('SalesMan_Name')} required/>
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);