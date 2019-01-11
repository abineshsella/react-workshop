import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import PromoDetails from './promodetails';
import CircularIndeterminate from './others/loading';
import AlertDialog from './others/popup';


export default class PromoCode extends React.Component {
   
   constructor(){
    super();
    this.productDetail;
    this.salesManDetail;
    this.state={
        list:[],
        extra:[],
        isInserted:false
    };
    this.getSalesManList();
    this.getProductList();
    this.promoCodeInsertedSuccessfully=()=>{
        debugger;
        this.setState({
            ['isInserted']:true
        })
    }
   }
   componentWillMount(){
    let inter= setInterval(()=>{
        if(this.salesManDetail!=undefined && this.productDetail != undefined){
            this.bindPromoCode();
            this.initializeEmptyPromocode();
            clearInterval(inter);
        }
    },1000);
    
   }

    render() {
        debugger;
        let renderValue="";
        let addedData="";
        if(this.state.isInserted)
        addedData=<CircularIndeterminate/>;
        else
        {
            addedData=<Fab variant="extended" aria-label="Add"  style={{ marginTop: '45%', marginLeft: '30%'}} >
            {/* <AddIcon/> */}
            <AlertDialog promoDetails={this.emptyPopupData} isAdd='true' afterCompleted={this.promoCodeInsertedSuccessfully}/>
                </Fab>;
        }

        if(this.state.list.length>0)
        {
            renderValue=(<React.Fragment><Grid key='addPromo' item>
                <Paper className={ this.props.gridClass }>
                {addedData}
                </Paper>
              </Grid>{this.state.list.map((value,index) => (
                <Grid key={value.PromoId} item>
                  <span className={"badge badge-"+(this.state.extra[index].daysRemaining>0 ?"primary":"danger")} style={{float:'right'}}>{this.state.extra[index].daysRemaining}</span>
                  <Paper className={ this.props.gridClass }>
                    <PromoDetails promo={value} indexId={index}  salesManName={this.state.extra[index].salesManName} salesManDetail={this.salesManDetail} productDetail={this.productDetail}/>
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

    initializeEmptyPromocode(){
        this.emptyPopupData={
            productDetail:this.productDetail,
            promo:{
                PromoId:'',
                Description:'',
                Validty_From:new Date(),
                Validty_To:new Date(),
                Product_Details:[]
            },
            salesManDetail:this.salesManDetail,
            salesManName:''
        }
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
            this.salesManDetail=resp.salesManList.map((data)=>({id:data['id'],name:data['name']}));

        })
    }
    getProductList(){
        let url="http://tewebservices.bansel.it/axerve/api/products";
        fetch(url).then((rsp)=>rsp.json().then((resp)=>{
            this.productDetail=resp.productsList.map((data)=>({id:data['id'],name:data['name']}));
        }))
    }

    getSalesManName(salesManId){
        if(salesManId==null || salesManId=="")
        {
            return "";
        }
        else{
                let salesMan=this.salesManDetail.find(val=>{
                    if(val.id==salesManId)
                        return val.name;
                });
            return salesMan.name;
        }
    }

}
