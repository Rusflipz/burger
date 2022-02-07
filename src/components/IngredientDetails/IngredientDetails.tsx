import styles from './IngredientDetails.module.css';
import React, { useRef, useState } from 'react';

import {} from '@ya.praktikum/react-developer-burger-ui-components'

function IngredientDetails(props: any) {
if (props.data !== null){
    return (
        <>
<p className={`${styles.title} text text_type_main-large`}>Детали ингридиента</p>
<img className={`${styles.image} mb-4`} src={props.data.image_large}></img>
<p className={`${styles.name} mb-8 text_type_main-medium`}>{props.data.name}</p>
<div className={`${styles.conteiner} mb-15`}>
<div className={`${styles.infoBlock} mr-5`}>
    <p className={`text text_type_main-default text_color_inactive mb-2`}>Калории, ккал</p>
    <span className={`text text_type_main-default text_color_inactive`}>{props.data.calories}</span>
</div>
<div className={`${styles.infoBlock} mr-5`}>
    <p className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</p>
    <span className={`text text_type_main-default text_color_inactive`}>{props.data.proteins}</span>
</div>
<div className={`${styles.infoBlock} mr-5`}>
    <p className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</p>
    <span className={`text text_type_main-default text_color_inactive`}>{props.data.fat}</span>
</div>
<div className={`${styles.infoBlock}`}>
    <p className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</p>
    <span className={`text text_type_main-default text_color_inactive`}>{props.data.carbohydrates}</span>
</div>
</div>
</>
    )
    } else {
        return (<></>)
    }

}

export default IngredientDetails;