import React from 'react';
import GuttersGrid from './content/grid'
export default class Content extends React.Component{
    render(){
       return <div className="special" ><div className="jumbotron jumbotron-fulid" style={{ height: 'calc(86vh)','margin-bottom': '0px'}}><GuttersGrid /> </div></div>;
    }
}