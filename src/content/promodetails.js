import React from 'react';
import MouseOverPopover from './others/hover';
export default class PromoDetails extends React.Component{
    render(){
        return <div className="text-center">
                    <span className="text-danger">{this.props.promoId}</span>
                    <img style={{width:'132px',height:'135px'}} src={"/img/"+this.props.indexId+".png"}></img>
                    <span><img style={{width:'26px',height:'36px',float:'left'}} src="./img/pos.png"></img> <span style={{float:'left','padding-top':'8px' }}><MouseOverPopover promoDescription={this.props.promoDescription} mouseOverSalesMan={this.props.salesManName}></MouseOverPopover></span></span>
                </div>;
    }
}