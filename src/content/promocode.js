import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PromoDetails from './promodetails';

export default class PromoCode extends React.Component {
   constructor(){
    super();
    this.state={
        list:[]
    };
   }
   componentWillMount(){
    this.bindPromoCode();
   }
    render() {
        return (<React.Fragment>{this.state.list.map(value => (
            <Grid key={value} item>
              <Paper className={ this.props.gridClass }><PromoDetails promoId={value.PromoId}/></Paper>
            </Grid>
          ))}</React.Fragment>);
    }

    

    bindPromoCode(){
        if(this.state!=undefined){
        let url="https://172.17.4.63/PromoService/PromoCodeManagement/GetAllPromoCodes";
        fetch(url).then(res=>res.json()).then((resp)=>{
                this.setState({list:resp});
         });
        }
    }
}
