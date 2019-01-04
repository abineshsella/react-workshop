import React from 'react';
import MouseOverPopover from './others/hover';
import AlertDialog from './others/popup';

export default class PromoDetails extends React.Component{
    render(){
        return <div className="text-center">
                    <AlertDialog promoDetails={this.props}/>
                    <img style={{width:'132px',height:'135px'}} src={"/img/"+this.props.indexId+".png"}></img>
                    <span>
                        <img style={{width:'26px',height:'36px',float:'left'}} src="./img/pos.png"/> 
                        <span style={{float:'left','paddingTop':'8px' }}>
                            <MouseOverPopover promoDescription={this.props.promo.Description} mouseOverSalesMan={this.props.salesManName}></MouseOverPopover>
                        </span>
                    </span>
                </div>;
    }
}