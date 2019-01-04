import React from 'react';
import SearchAppBar from './header/header-bar'
import { withTheme } from '@material-ui/core';
export default class Header extends React.Component{
    render(){
        // return <div className="jumbotron jumbotron-fulid text-center">
        //              <div className="container">
        //                 <h1>Promocode</h1>
        //              </div>
        //         </div>;
        return <SearchAppBar/>;
    }
}