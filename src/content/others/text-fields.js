import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon  from '@material-ui/icons/DeleteOutlined';
import Autocomplete from 'react-autocomplete';

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
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  }
});


class OutlinedTextFields extends React.Component {
   
  
  constructor(props){
    super();
    this.state = {};
    this.product;
    this.handleChange=(name)=>event=>{
      this.setState({
        [name]:event.target.value
      });
      // if(name=='SalesMan_Name')
      // {
        // document.getElementsByTagName('input')[8].style.display='block';
        // document.getElementsByTagName('input')[8].focus();
        // document.getElementsByTagName('input')[8].click();
        // document.getElementsByTagName('input')[8].style.display='block';
        // event.target.focus();
      // }
    }
    this.insertPromoCodeToTextField(props);
    this.completeSalesManDetails(props);
  }
  
 

  addProduct(){
      this.state.Product_Details.push({Product_Id:'',ProdValid_From:new Date(),ProdValid_To:new Date()});
      this.setState({
        ['Product_Details']:this.state.Product_Details
      })
  }

  deleteProduct(index){
    this.state.Product_Details.splice(index,1);
    this.setState({
      ['Product_Details']:this.state.Product_Details
    })
  }
  handleProductChange(name,index){
    if (name == "Product_Id")
      this.state.Product_Details[index][name] = event.target.dataset.value
    else
      this.state.Product_Details[index][name] = event.target.value;
    this.setState({
      ['Product_Details']: this.state.Product_Details
    })
  }

  
  completeSalesManDetails(props){
    this.salesManDetails=props.promoDetails.salesManDetail;
    this.renderSalesManDetails=this.salesManDetails;
    this.productDetails=props.promoDetails.productDetail;
    this.searchAutoComplete(this.state.SalesMan_Name);
  }

  componentDidMount(){
    document.getElementById("salesman").childNodes[0].childNodes[0].style.width='506px'
  }
  
  handleChangeAutoComplete(value){
    
    name='SalesMan_Name'
    this.setState({
      [name]:value
    })
    let selectedId=this.salesManDetails.filter(salesMan=>{if(salesMan.name==value.toUpperCase()){ return true} else {return false}});
    this.setState({
      ['SalesMan_Id']:selectedId[0].id
    })
  }
  searchAutoComplete(value){
    this.renderSalesManDetails=this.salesManDetails.filter(salesMan=>{if(salesMan.name.search(value.toUpperCase())==0){ return true} else {return false}});
    name='SalesMan_Name'
    this.setState({
      [name]:value
    })
    
  }
  insertPromoCodeToTextField(props){
    this.state = {
      Description:props.promoDetails.promo.Description,
      Product_Details:props.promoDetails.promo.Product_Details,
      PromoId:props.promoDetails.promo.PromoId,
      SalesMan_Id:props.promoDetails.promo.SalesMan_Id,
      SalesMan_Name:props.promoDetails.salesManName,
      Validty_From:this.formatDate(props.promoDetails.promo.Validty_From),
      Validty_To:this.formatDate(props.promoDetails.promo.Validty_To),  
    };
  }
  formatDate(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  render() {
    const { classes } = this.props;
    this.props.editPromoDetails(this.state);
    if(this.state.Product_Details != null && this.state.Product_Details.length>0)
    {
      this.product= <React.Fragment>{ this.state.Product_Details.map((product,index)=>(<React.Fragment><TextField
      id="standard-select-currency"
      select
      style={{width:'80px'}}
      className={classes.textField}
      value={product.Product_Id}
      onChange={(e)=>{ this.handleProductChange('Product_Id',index)}}
      SelectProps={{
        MenuProps: {
          className: classes.menu,
        },
      }}
      helperText="Please select your product"
      margin="normal"
    >
      {this.productDetails.map(option => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
    <TextField style={{width:'170px'}} type="date"  id="outlined-name" label="Validity from" className={classes.textField} value={this.formatDate(product.ProdValid_From)} 
        margin="normal" variant="outlined"  onChange={(e)=>{this.handleProductChange('ProdValid_From',index)}}   InputLabelProps={{
          shrink: true,
        }} required/>
        
        <TextField style={{width:'170px'}} type="date" id="outlined-name" label="Validity To" className={classes.textField} value={this.formatDate(product.ProdValid_To)} 
        margin="normal" variant="outlined"  onChange={(e)=>{this.handleProductChange('ProdValid_To',index)}}
        InputLabelProps={{
          shrink: true,
      }} required/>
      <DeleteOutlinedIcon  className={classes.iconHover} color="error" style={{ fontSize: 30,cursor:'pointer' }} onClick={(e)=>{this.deleteProduct(index)}} >   
          </DeleteOutlinedIcon>
      </React.Fragment>))}</React.Fragment>;
    }
    else
    {
      this.product="";
    }
    return (
      <form className={classes.container}  >
        <TextField id="outlined-name" label="PromoCode Title" className={classes.textField} value={this.state.PromoId} 
          margin="normal" variant="outlined" onChange={this.handleChange('PromoId')} style={{width:'245px'}} required/>
         <TextField id="outlined-name" label="Description" className={classes.textField} value={this.state.Description} 
          margin="normal" variant="outlined" onChange={this.handleChange('Description')}  style={{width:'245px'}} required/>
          <TextField type="date" id="outlined-name" label="Validity from" className={classes.textField} value={this.state.Validty_From} 
          margin="normal" variant="outlined" onChange={this.handleChange('Validty_From')}   InputLabelProps={{
            shrink: true,
          }} style={{width:'245px'}} required/>
          
          <TextField  type="date" id="outlined-name" label="Validity To" className={classes.textField} value={this.state.Validty_To} 
          margin="normal" variant="outlined" onChange={this.handleChange('Validty_To')}
          InputLabelProps={{
            shrink: true,
          }}  style={{width:'245px'}} required/>
          {/* <TextField id="outlined-full-width" label="SalesMan"  style={{ margin: 8 }}  value={this.state.SalesMan_Name} placeholder="Placeholder"  fullWidth margin="normal"           variant="outlined"
           InputLabelProps={{
            shrink: true,
          }} onChange={this.handleChange('SalesMan_Name')} required/> */}
          <div style={{zIndex:'1000',width:'100%',paddingLeft:'8px'}} id="salesman">
        <Autocomplete  getItemValue={(salesman)=>salesman.name}
        items={this.renderSalesManDetails}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} >
            {item.name}
          </div>
        }
        value={this.state.SalesMan_Name}
        onChange={(e)=>this.searchAutoComplete(e.target.value)}
        onSelect={(val)=>{this.handleChangeAutoComplete(val)}}
        />
        </div>
          <div style={{width:'100%'}}><div  style={{width:'162px',cursor:'pointer'}} onClick={(e)=>this.addProduct(e.target.value)}><AddIcon className={classes.iconHover} color="error" style={{ fontSize: 30 }} >   
          </AddIcon>
         <span className="text-primary">Add Product</span>
         </div>
          </div>
          {this.product}
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);