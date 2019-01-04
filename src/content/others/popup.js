import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import OutlinedTextFields from './text-fields';
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
        this.state.promoDetails=details;
        this.insertPromoDetails();
      };
      this.savePromoDetails=()=>{
        this.insertPromoDetails();
        this.handleClose();
      };
  }



  render() {
    return (
      <div>
        <a onClick={this.handleClickOpen} style={{cursor:'pointer',textDecoration:'underline'}}>
          {this.props.promoDetails.promo.PromoId}</a>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Edit Promocode"}</DialogTitle>
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
  insertPromoDetails(){
    let url='';
    fetch.url(url,this.state.promoDetails.json()).then((res)=>res.json()).then((resp)=>{

    });
   }
}

export default AlertDialog;