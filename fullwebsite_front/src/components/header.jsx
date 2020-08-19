import React from 'react'
import css from './css/header.module.css'
import {Link} from 'react-router-dom'

class Header extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render()                                        
    {
        return(
            <div className = {css.header}>
                <Link to = '/'>
                    <div className = {css.logo} onClick = {() => {this.props.chan(true); }}>Electronic</div>
                </Link>
                <div className = {css.about}>
                    <Link className = {css.navlink} to = '/offers'><h>Акции</h></Link>
                    <Link className = {css.navlink} to = '/shops'><h>Магазины</h></Link>
                    <Link className = {css.navlink} to = '/link'><h>Связь</h></Link>
                </div>
            </div>
        );
    }
    
}

export default Header;