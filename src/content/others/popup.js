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
        promoDetails:{}
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
          this.state.promoDetails=this.savedDetails;
          if(this.props.isAdd != undefined && this.props.isAdd =='true')
          {
            this.addPromoDetails();
          }
          else
          {
          this.updatePromoDetails();
          }
        }
        this.handleClose();
      };
  }



  render() {
    this.title='';
    if(this.props.isAdd !=undefined && this.props.isAdd=='true'){
      this.title=<AddIcon/>;
    }
    else{
      this.title=this.props.promoDetails.promo.PromoId;
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
          <DialogTitle id="alert-dialog-title"><span className="text-primary">{"Edit Promocode"}</span></DialogTitle>
          <DialogContent>
            
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
    let url='http://172.17.4.63/PromoService/PromoCodeManagement/UpdatePromoCode';
    fetch(url,{method:'POST',headers:{'Content-Type': 'application/json'},  mode: 'cors',body: JSON.stringify(this.state.promoDetails)}).then((res)=>res.json()).then((resp)=>{
      alert("Success");
    });
  }
  addPromoDetails(){
    //testing
    this.props.inProgressing();
    setTimeout(()=>{this.props.afterCompleted();},2000)
    
    // let url='http://172.17.4.63/PromoService/PromoCodeManagement/InsertPromoCode';
    // fetch(url,{method:'POST',headers:{'Content-Type': 'application/json'},  mode: 'cors',body: JSON.stringify(this.state.promoDetails)}).then((res)=>res.json()).then((resp)=>{
    //   alert("Success");
    //   debugger;
    //   this.props.afterCompleted();
    // });
  }
}

export default AlertDialog;