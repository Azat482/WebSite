import React from 'react'
import css from './css/sfprod.module.css'

const ShowFullProductInf = (props) =>{
    //КАТЕГОРИЯ
    //ПОДКАТЕГОРИЯ
    //ПРОИЗВОДИТЕЛЬ
    //НАЗВАНИЕ
    //АДРЕСА КАРТИНОК
    //КРАТКОЕ ОПИСАНИЕ - NONE
    //ПОЛНОЕ ОПИСАНИЕ 
    //ХАРАКТЕРИСТИКИ
    //ЦЕНА
    const {
        category, 
        characters, 
        id,
        price, 
        img_adress, 
        manufacturer, 
        mini_description, 
        full_description, 
        name_of_product, 
        subcategory} = props.data;
    console.log("ТОВАР: ",name_of_product);
    return(
        <div className = {css.wrapper}>
            <div>
                <div className = {css.name}>
                    <h>{name_of_product}</h>
                </div>
                <div className = {css.manufacturer}>
                    <h>{manufacturer}</h>
                </div>
                <div className = {css.slides}>
                    {img_adress.map((item, index, array)=>{
                        return(
                            <img src = {item}/>
                        );
                    })}
                </div>
                <div className = {css.price}>
                    <h>{price}</h>
                </div>
            </div>
            <div className = {css.aboutProduct}>
                <h className =  {css.aboutWord}>Описание</h>
                <p className = {css.full_description}>{full_description}</p>
                <h className = {css.charactersWord}>Характеристики</h>
                <p className = {css.characters}>{characters}</p>
            </div>
            <div className = {css.moreInfo}>
                Комментарии Отзывы Вопросы
            </div>
        </div>
    );
}

export default ShowFullProductInf;