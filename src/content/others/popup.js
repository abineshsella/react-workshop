import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import OutlinedTextFields from './text-fields';
import AddIcon from '@material-ui/icons/Add';
class AlertDialog extends React.Component {
  constructor(){
      super();
      this.state = {
        open: false,
        promoDetails:{},
        errorMessage:''
      };
      this.handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      this.handleClose = () => {
        this.setState({ open: false });
      };
      this.editedPromoDetails=(details)=>{
        this.savedDetails=details;
      };
      this.savePromoDetails=()=>{
        if(this.savedDetails!=null && this.savedDetails != undefined)
        {
          this.errorMessage="";
          this.validatePromoCodeDetails();
          
          if (this.errorMessage != "")
          {
            this.setState({["errorMessage"]:this.errorMessage});
            return;
          }
          this.state.promoDetails = this.savedDetails;

          if (this.props.isAdd != undefined && this.props.isAdd == 'true') {
            this.addPromoDetails();
          } else {
            this.updatePromoDetails();
          }
        }
        this.handleClose();
      };
  }
  validatePromoCodeDetails(){
    if(this.savedDetails.PromoId ==undefined || this.savedDetails.PromoId == "")
      this.errorMessage="Enter Promocode";
    else if(this.savedDetails.Description ==undefined || this.savedDetails.Description == "")
      this.errorMessage="Enter Description";
    else if(this.savedDetails.Validty_From>this.savedDetails.Validty_To)
      this.errorMessage="Invalid Date";
    else if(this.savedDetails.SalesMan_Id ==undefined || this.savedDetails.SalesMan_Id == "")
      this.errorMessage="Enter salesman";
    else if(this.savedDetails.Product_Details!=undefined || this.savedDetails.Product_Details.length>0)
    {
      for(let productId in this.savedDetails.Product_Details)
      {
        let product=this.savedDetails.Product_Details[productId];
        if(product.Product_Id  == undefined || product.Product_Id == "")
            this.errorMessage="Select Product";
        else if(product.ProdValid_From>product.ProdValid_To)
            this.errorMessage="Invalid Product Date";
        else if(this.savedDetails.Product_Details.map((a)=>{if(a.Product_Id=product.Product_Id){return a}}).length>1)
          this.errorMessage="Duplicate Product";
      }
    }
  }


  render() {
    let dialogTitle="";
    let validationError="";
    this.title='';
    if(this.props.isAdd !=undefined && this.props.isAdd=='true'){
      this.title=<AddIcon/>;
      dialogTitle="Add Promocode";
    }
    else{
      this.title=this.props.promoDetails.promo.PromoId;
      dialogTitle="Edit Promocode";
    }
    if(this.errorMessage!= undefined && this.errorMessage!="")
    {
      validationError=<div className="alert alert-danger"><small>{this.errorMessage}</small></div>;
    }
    return (
      
      <div>
        <a onClick={this.handleClickOpen} style={{cursor:'pointer',textDecoration:'underline'}}>
            {this.title}</a>
         
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"><span className="text-primary">{dialogTitle}</span></DialogTitle>
          <DialogContent>
            {validationError}
             <OutlinedTextFields  editPromoDetails={this.editedPromoDetails} promoDetails={this.props.promoDetails}/>
            
          </DialogContent>
          <DialogActions>
          <Button onClick={this.savePromoDetails} color="primary">
              Ok
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  updatePromoDetails(){
    this.props.inProgressing();
    // let url='http://172.17.4.63/PromoService/PromoCodeManagement/UpdatePromoCode';
    let url="https://json-request.firebaseio.com/.json";
    fetch(url,{method:'POST',headers:{'Content-Type': 'application/json'},  mode: 'cors',body: JSON.stringify(this.state.promoDetails)}).then((res)=>res.json()).then((resp)=>{
      this.props.afterCompleted();
    });
  }
  addPromoDetails(){
    //testing
    this.props.inProgressing();
    // let url='http://172.17.4.63/PromoService/PromoCodeManagement/InsertPromoCode';
    let url="https://json-request.firebaseio.com/.json";
    fetch(url,{method:'POST',headers:{'Content-Type': 'application/json'},  mode: 'cors',body: JSON.stringify(this.state.promoDetails)}).then((res)=>res.json()).then((resp)=>{
       this.props.afterCompleted();
    });
  }
}

export default AlertDialog;