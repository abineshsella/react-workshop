import React from 'react';
import MouseOverPopover from './others/hover';
import AlertDialog from './others/popup';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
export default class PromoDetails extends React.Component {

    render() {
        return <div className="text-center">
            <AlertDialog promoDetails={this.props} inProgressing={this.props.inProgressing} afterCompleted={this.props.afterCompleted} />
            <img style={{ width: '132px', height: '135px' }} src={"/img/" + this.props.indexId + ".png"}></img>
            <span>
                <img style={{ width: '26px', height: '36px', float: 'left' }} src="./img/pos.png" />
                <span style={{ float: 'left', 'paddingTop': '8px' }}>
                    <MouseOverPopover promoDescription={this.props.promo.Description} mouseOverSalesMan={this.props.salesManName} ></MouseOverPopover>
                </span>
                <a onClick={(e) => { this.deleteClick(this.props.promo.PromoId) }} style={{ cursor: 'pointer', float: 'right', color: 'gray', paddingTop: '4px' }}><DeleteOutlinedIcon /></a>
            </span>
        </div>;
    }
    deleteClick(promoId) {
        this.props.inProgressing();
        // let url='http://172.17.4.63/PromoService/PromoCodeManagement/DeletePromoCode';
        let url = "https://json-request.firebaseio.com/.json";
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, mode: 'cors', body: JSON.stringify({ PromoId: promoId }) }).then((res) => res.json()).then((resp) => {
            this.props.afterCompleted();
        });
    }
}