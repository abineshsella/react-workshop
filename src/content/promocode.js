import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PromoDetails from './promodetails';
import CircularIndeterminate from './others/loading';
export default class PromoCode extends React.Component {
   
   constructor(){
    super();
    this.salesManDetail=undefined;
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
        let renderValue="";
        if(this.state.list.length>0)
        {
            renderValue=(<React.Fragment>{this.state.list.map((value,index) => (
                <Grid key={value.PromoId} item>
                  <span className={"badge badge-"+(this.state.extra[index].daysRemaining>0 ?"primary":"danger")} style={{float:'right'}}>{this.state.extra[index].daysRemaining}</span>
                  <Paper className={ this.props.gridClass }>
                    <PromoDetails promo={value} indexId={index}  salesManName={this.state.extra[index].salesManName}/>
                  </Paper>
                </Grid>
              ))}</React.Fragment>);
        }
        else
        {
            renderValue=<CircularIndeterminate/>;
        }
        return renderValue;
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
                    detail.salesManName=this.getSalesManName(resp[promoId].SalesMan_Id);
                    detail.PromoId=resp[promoId].PromoId;
                    detail.SalesMan_Id=resp[promoId].SalesMan_Id;
                    detail.Validty_From=resp[promoId].Validty_From;
                    detail.Validty_To=resp[promoId].Validty_To;
                    detail.Product_Details=resp[promoId].Product_Details;
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
        if(salesManId==null || salesManId=="")
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
