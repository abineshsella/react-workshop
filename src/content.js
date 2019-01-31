import React from 'react';
import GuttersGrid from './content/grid'
export default class Content extends React.Component{
    render(){
       return <div className="special container" >
                <div className="jumbotron jumbotron-fulid"
                    style={{ height: 'calc(86vh)','marginBottom': '0px' ,overflow:'auto',backgroundColor:'#ffffff'}}>
                    <GuttersGrid /> 
                </div>
              </div>;
    }
}