import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import PromoDetails from './promodetails';
import CircularIndeterminate from './others/loading';
import AlertDialog from './others/popup';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import  '../style.css';
export default class PromoCode extends React.Component {
   
   constructor(){
    super();
    this.productDetail;
    this.salesManDetail;
    this.state={
        list:[],
        extra:[],
        isProcessing:null
    };
    this.getSalesManList();
    this.getProductList();
    this.promoCodeProcessCompleted=()=>{
        this.setState({
            ['isProcessing']:false
        })
    }
    this.promocodeProcessing=()=>{
        this.setState({
            ['isProcessing']:true
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
        // debugger;
        let renderValue="";
        let addedData="";
        let promoCodeData="";
        if(this.state.isProcessing == null)
        {
            addedData=<ReactCSSTransitionGroup transitionName = "example"
            transitionAppear = {true} transitionAppearTimeout = {500}
            transitionEnter = {false} transitionLeave = {false}><Fab variant="extended" aria-label="Add"  style={{ marginTop: '45%', marginLeft: '30%'}} >
            <AlertDialog promoDetails={this.emptyPopupData} isAdd='true' inProgressing={this.promocodeProcessing} afterCompleted={this.promoCodeProcessCompleted}/>
            </Fab></ReactCSSTransitionGroup>;
            promoCodeData=this.state.list.map((value,index) => (
                <Grid key={value.PromoId}  item>
                  <span className={"badge badge-"+(this.state.extra[index].daysRemaining>0 ?"primary":"danger")} style={{float:'right'}}>{this.state.extra[index].daysRemaining}</span>
                  <ReactCSSTransitionGroup transitionName = "grid"
            transitionAppear = {true} transitionAppearTimeout = {500}
            transitionEnter = {false} transitionLeave = {false}>
                  <Paper className={ this.props.gridClass }>
                    <PromoDetails promo={value} indexId={index}  salesManName={this.state.extra[index].salesManName} salesManDetail={this.salesManDetail} productDetail={this.productDetail} inProgressing={this.promocodeProcessing} afterCompleted={this.promoCodeProcessCompleted}/>
                  </Paper>
                  </ReactCSSTransitionGroup>
                </Grid>
              ));
        }
        else if(this.state.isProcessing == true){
            addedData=<ReactCSSTransitionGroup transitionName = "example"
            transitionAppear = {true} transitionAppearTimeout = {500}
            transitionEnter = {false} transitionLeave = {false}><CircularIndeterminate/></ReactCSSTransitionGroup>;
            promoCodeData='';
        }
        else{
            addedData=<ReactCSSTransitionGroup transitionName = "example"
            transitionAppear = {true} transitionAppearTimeout = {500}
            transitionEnter = {false} transitionLeave = {false}><DoneOutlineOutlinedIcon style={{ color: 'green',marginTop:'54%',marginLeft:'40%' }}/></ReactCSSTransitionGroup>;
            setTimeout(()=>{this.setState({['isProcessing']:null});this.bindPromoCode();},2000);
            promoCodeData='';
        }

        if(this.state.list.length>0)
        {
            renderValue=(<React.Fragment><Grid key='addPromo' item>
                <Paper className={ this.props.gridClass }>
                {addedData}
                </Paper>
              </Grid>{promoCodeData}</React.Fragment>);
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
        // let url="https://json-request.firebaseio.com/.json";
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
