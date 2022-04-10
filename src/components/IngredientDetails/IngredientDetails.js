import styles from './IngredientDetails.module.css';
import { dataPropTypes } from '../../utils/types';
import { useEffect, useState } from "react";
import { Route, Redirect, StaticRouter, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ingredientsSelector } from '../../services/slice/ingredients';

export function IngredientDetails(props) {
    console.log(props)
    console.log(useParams())
    const { ingredients } = useSelector(ingredientsSelector);
    const { id } = useParams();
    console.log(id)
    const currentIngredient = ingredients.find((item) => item._id === id);
    console.log(currentIngredient)
    return (

        <>
            {currentIngredient && (
                < div >
                    <p className={`${styles.title} text text_type_main-large`}>Детали ингридиента</p>
                    <img className={`${styles.image} mb-4`} src={currentIngredient.image_large} alt={currentIngredient.name}></img>
                    <p className={`${styles.name} mb-8 text_type_main-medium`}>{currentIngredient.name}</p>
                    <div className={`${styles.conteiner} mb-15`}>
                        <div className={`${styles.infoBlock} mr-5`}>
                            <p className={`text text_type_main-default text_color_inactive mb-2`}>Калории, ккал</p>
                            <span className={`text text_type_main-default text_color_inactive`}>{currentIngredient.calories}</span>
                        </div>
                        <div className={`${styles.infoBlock} mr-5`}>
                            <p className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</p>
                            <span className={`text text_type_main-default text_color_inactive`}>{currentIngredient.proteins}</span>
                        </div>
                        <div className={`${styles.infoBlock} mr-5`}>
                            <p className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</p>
                            <span className={`text text_type_main-default text_color_inactive`}>{currentIngredient.fat}</span>
                        </div>
                        <div className={`${styles.infoBlock}`}>
                            <p className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</p>
                            <span className={`text text_type_main-default text_color_inactive`}>{currentIngredient.carbohydrates}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

IngredientDetails.propTypes = {
    value: dataPropTypes.isRequired
};
