import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PromoDetails from './promodetails';

export default class PromoCode extends React.Component {
   salesManDetail;
   constructor(){
    super();
    this.state={
        list:[],
        extra:[]
    };
    this.getSalesManList();
   }
   componentWillMount(){
    let inter= setInterval(()=>{
        if(this.salesManDetail!=undefined){
            this.bindPromoCode();
            clearInterval(inter);
        }
    },1000);
    
   }
    render() {
        return (<React.Fragment>{this.state.list.map((value,index) => (
            <Grid key={value.PromoId} item>
              <span className={"badge badge-"+(this.state.extra[index].daysRemaining>0 ?"primary":"danger")} style={{float:'right'}}>{this.state.extra[index].daysRemaining}</span><Paper className={ this.props.gridClass }><PromoDetails promoId={value.PromoId} indexId={index} promoDescription={value.Description} salesManName={this.state.extra[index].salesManName}/></Paper>
            </Grid>
          ))}</React.Fragment>);
    }

    

    bindPromoCode(){
        if(this.state!=undefined){
        let url="https://172.17.4.63/PromoService/PromoCodeManagement/GetAllPromoCodes";
        fetch(url).then(res=>res.json()).then((resp)=>{
                let extraDetails=[],detail;
                for(let promoId in resp)
                {
                    detail={}
                    detail.imgName=promoId;
                    detail.daysRemaining=this.getDaysRemaining(resp[promoId]);
                    detail.salesManName=this.getSalesManName(resp[promoId].SalesMan_Id)
                    extraDetails.push(detail);
                }
                this.setState({list:resp,extra:extraDetails});
         });
        }
    }
    getDaysRemaining(promo){
        let today=(new Date()).getTime();
        let oneDay=1000*60*60*24;
        let validityTo=(new Date(promo.Validty_To)).getTime();
        let difference=validityTo-today;
        return (difference > 0)? Math.ceil(difference/oneDay) :0;
    }
    
    getSalesManList(){
        let url="https://tewebservices.bansel.it/axerve/api/salesman";
        fetch(url).then((rsp)=>rsp.json()).then((resp)=>{
            this.salesManDetail=resp;
        })
    }
    getSalesManName(salesManId){
        if(salesManId==undefined)
        {
            return "";
        }
        else{
                let salesMan=this.salesManDetail.salesManList.find(val=>{
                    if(val.id==salesManId)
                        return val.name;
                });
            return salesMan.name;
        }
    }
}
