import React from 'react'
import axios from 'axios'
import css from './css/container_grid.module.css'
import Content from './content.jsx'

//let list = ['dungeun master', 'billy herrington', 'jabroni', 'aibulat', 'full master'];
class Container extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            gadata: null,
            page: 'all'

        };
        this.changeList = this.changeList.bind(this);
        
    }

    componentDidMount()
    {
        axios.get('http://localhost:4000/catalog').then(res =>{
            this.setState({gadata: res.data});
        })
        .catch(err =>{
            console.log("fuck: " + err);
        });

        //if(this.props.show) {this.setState({page: 'all'}); console.log("МЕНЯЮ ЗДЕСЬ")}
    }

    
    
    render()
    {
        let Nlist = [];
        const catal = this.state.gadata;   
        if(catal != null){
            catal.forEach((item, i, arr)=>{
                let ctg = item.subcategory;
                if(!Nlist.includes(ctg))
                {
                    Nlist.push(ctg);
                }
            });
        }
        
        let contentboxCatal;
        if(this.props.show) {contentboxCatal = catal; this.state.page = 'all'} //тут так нужно кароч, так чтоб не перерисовывало 
        if(!this.props.show)
        {
            contentboxCatal = catal.filter((item, i, arr)=>{
                if(this.state.page === item.subcategory)
                {
                    return true;
                }
                else return false;
            });
        }

        return(
           
            <div className = {css.container}>
                <div className = {css.sidenav}>
                    <div className = {css.headerName}> <h key = "Head">Ваш выбор</h> </div>
                    {
                       Nlist.map( (item) =>
                       {
                        if(item === this.state.page)
                        {
                            //console.log("состояние, но", this.state.page);
                            return(
                                <div key = {item} className = {css.prItemActive} onClick = { () => {this.props.chan(false); this.changeList(item); } } >
                                    <h> {item} </h>
                                </div>
                            );
                        }
                        else return(
                            <div key = {item} className = {css.prItem} onClick = { () => {this.props.chan(false); this.changeList(item); } } >
                                    <h> {item} </h>
                            </div>
                        );
                       })
                    }
                </div>
                
                <Content info = {contentboxCatal} ShowProductFull = {true}/>
            </div>
        );
    }

    changeList(item)
    {
        this.setState({page: item});
    }
}

export default Container

