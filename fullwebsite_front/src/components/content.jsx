import React from 'react'
import contCss from './css/content.module.css'
import ShowProduct from './show_product.jsx'

class Content extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            inCatalFlag: true,
            Content: null
        }
        this.setContent = this.setContent.bind(this);
    }

    render()
    {
        if(this.state.inCatalFlag){
            //console.log(this.state.inCatalFlag, this.props.ShowProductFull, "FYGVHBJNKML");
            //console.log(this.props.info);
            let rec_prod = this.props.info;
            let products;
            if(rec_prod)
            {
                products = rec_prod.map((item)=>{
                const url_image = item.img_adress[0];
                //console.log("URL_IMAGE: ", url_image);
                return(
                    <div id="div" alt = 'image' key = {item.id} className={contCss.item} onClick = {()=>{this.setContent(item)}}>
                        <img className = {contCss.imgSub} src = {url_image}/>
                        <p className = {contCss.name}>{item.name_of_product}</p>
                        <p className = {contCss.minD}>{item.mini_description}</p>
                        <p className = {contCss.price}>{item.price}</p>
                    </div>
                )
            });
            }
            return(
                <div className = {contCss.content}>
                    {products}    
                </div>
            );
        }
        
        else if(!this.state.inCatalFlag)
        {
            return(
                <ShowProduct data = {this.state.Content}/>
            );
        }
    }

    componentWillReceiveProps()
    {
        this.setState({inCatalFlag: this.props.ShowProductFull});
    }

    setContent(prod)
    {
        this.setState({inCatalFlag: false, Content: prod});
    }
}


export default Content