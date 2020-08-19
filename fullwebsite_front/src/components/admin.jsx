import React from 'react'
import css from './css/admin.module.css'
import axios from 'axios'

class Admin extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            user: {
                login: '',
                password: ''
            },
            add: 
            {
                cat: '',
                subC: '',
                manuf: '',
                name: '',
                minD: '',
                fullD: '',
                char: '',
                price: ''
            },
            pform: false,
            gadata: null
        }
        this.sender = this.sender.bind(this);
        this.chfield = this.chfield.bind(this);
        this.addprod = this.addprod.bind(this);
        this.chadding = this.chadding.bind(this);
        this.DeleteItem = this.DeleteItem.bind(this);
    }

    render()
    {
        let rec_prod = this.state.gadata;
        let products;
        if(rec_prod)
        {
            products = rec_prod.map((item)=>{
            const url_image = item.img_adress[0];
            //console.log("URL_IMAGE: ", url_image);
            return(
                <div id="div" alt = 'image' key = {item.id} className={css.item} >
                    <img className = {css.imgSub} src = {url_image}/>
                    <p className   = {css.name}>{item.name_of_product}</p>
                    <p className   = {css.minD}>{item.mini_description}</p>
                    <p className   = {css.price}>{item.price}</p>
                    <button className = {css.DeleteButton} id = {item.id} onClick = {() =>{this.DeleteItem(item)}}>
                        <h>Удалить товар</h>
                    </button>
                </div>
                )
            });
        }
        return(
            <div  className = {css.admin}>
                <div className={css.admfield}>

                    <form className={css.auth} method = 'post' onSubmit = {this.sender}>
                        <label>Логин<input name = 'login' type = 'text' value = {this.state.user.login} onChange = {this.chfield} /></label>
                        <label>Пароль<input name = 'password' type = 'password' value = {this.state.user.password} onChange = {this.chfield} /></label>
                        <input type = 'submit' value = 'Войти'></input>
                    </form>

                    <form className={css.post} method='post' onSubmit = {this.addprod}>
                        <label>
                            <h>Категория</h>
                            <input 
                            className={css.mini} 
                            name = 'cat'
                            value = {this.state.add.cat}
                            onChange = {this.chadding}
                            />
                        </label>

                        <label>
                            <h>Подкатегория</h>
                            <input 
                            className={css.mini} 
                            name = 'subC'
                            value = {this.state.add.subC}
                            onChange = {this.chadding}
                            />
                        </label>

                        <label>
                            <h>Производитель</h>
                            <input 
                            className={css.mini} 
                            name = 'manuf'
                            value = {this.state.add.manuf}
                            onChange = {this.chadding}
                            />
                        </label>

                        <label>
                            <h>Название</h>
                            <input 
                            className={css.mini} 
                            name = 'name'
                            value = {this.state.add.name}
                            onChange = {this.chadding}
                            />
                        </label>

                        <label>
                            <h>Картинки</h>
                            <input 
                            className={css.mini} 
                            type = 'file' 
                            name = 'img'
                            multiple
                            onChange = {this.chadding}
                            />
                        </label>

                        <label>
                            <h>Краткое описание</h>
                            <textarea 
                            className={css.bigtext} 
                            name = 'minD' 
                            type='text'
                            value = {this.state.add.minD}
                            onChange = {this.chadding}
                            />
                        </label>

                        <label>
                            <h>Полное описание  </h>                              
                            <textarea 
                            className={css.bigtext}   
                            type='text'
                            name = 'fullD'
                            value = {this.state.add.fullD}
                            onChange = {this.chadding}
                            />
                        </label>

                        <label>
                            <h>Характеристики</h>                             
                            <textarea 
                            className={css.bigtext}  
                            name = 'char' 
                            type='text'
                            value = {this.state.add.char}
                            onChange = {this.chadding}
                            />
                        </label>
                        
                        <label>
                            <h>Цена</h>                             
                            <input 
                            className={css.mini}  
                            name = 'price' 
                            value = {this.state.add.price}
                            onChange = {this.chadding}
                            />
                        </label>

                        <input className={css.sbmpost} type = 'submit' value = 'Добавить товар'/>

                    </form>
                </div>
                <div className = {css.catal}>
                    {products}
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        axios.get('http://localhost:4000/catalog').then(res =>{
            this.setState({gadata: res.data});
        })
        .catch(err =>{
            console.log("fuck: " + err);
        });
    }

    sender(event) 
    {
        //
        console.log(event.target)
        //
        event.preventDefault();
        console.log("Это отправится");
        const data = this.state.user;
        console.log(data);
        axios.post('http://localhost:4000/admin', data)
            .then((res)=>{
                console.log(res);
                if(res.data === 'y')
                {
                    this.setState({pform: true});
                }
                else{
                    this.setState({pform: false});
                    this.setState({user: {login:'', password: ''}});
                }
            })
            .catch((err)=>console.log('error: ', err));
    }

    chfield(event)
    {
        const {name, value} = event.target;
        this.setState({user: {...this.state.user, [name] : value}});
    }

    chadding(e)
    {
        const {name, value} = e.target;
        this.setState({add: {...this.state.add, [name] : value}});
    }

   
    
    addprod(event)
    {
        //this.setState({refresh: true});
        event.preventDefault();
        console.log(event.target);
        const formData = new FormData(event.target);
        formData.append('login', this.state.user.login);
        formData.append('password', this.state.user.password);
        axios.post('http://localhost:4000/addTovar', formData ,{
            headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log("ERROR SERVER!!!!!    ", err);
            });
     }

     DeleteItem(item)
     {
        let button = document.getElementById(item.id);
        button.style.backgroundColor = 'red';
        const user = this.state.user;
        const product = {...item, user};
        console.log("delete request: ", product);

        //product.push
        axios.post('http://localhost:4000/deleteTovar', product)
        .then((res)=> {
            console.log(res);
        })
        .catch((err)=>{
            console.log("ERROR DELETING", err);
        });
     }

}

export default Admin