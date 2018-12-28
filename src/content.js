import React from 'react';
import GuttersGrid from './content/grid'
export default class Content extends React.Component{
    render(){
       return <div className="container special"><div className="jumbotron jumbotron-fulid"><GuttersGrid /> </div></div>;
    }
}