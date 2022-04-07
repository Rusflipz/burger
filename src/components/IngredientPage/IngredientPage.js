import styles from './IngredientPage.module.css';
import { ingredientsSelector, } from '../../services/slice/ingredients';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export function IngredientPage() {
    const { ingredients } = useSelector(ingredientsSelector);
    const [mainElement, setMainElement] = useState(null);
    useEffect(() => {
        console.log(ingredients)
        let actualId = window.location.href.split('http://localhost:3000/ingredients/:id')[1]
        ingredients.forEach(element => {
            let id = element._id
            if (element._id == actualId) {
                setMainElement(element)
                console.log('Что-то работает')
            }
        });
    }, [ingredients]);

    if (mainElement !== null) {
        return (
            <>
                <div className={`${styles.main}`}>
                    <p className={`${styles.title} text text_type_main-large`}>Детали ингридиента</p>
                    <img className={`${styles.image} mb-4`} src={mainElement.image_large} alt={mainElement.name}></img>
                    <p className={`${styles.name} mb-8 text_type_main-medium`}>{mainElement.name}</p>
                    <div className={`${styles.conteiner} mb-15`}>
                        <div className={`${styles.infoBlock} mr-5`}>
                            <p className={`text text_type_main-default text_color_inactive mb-2`}>Калории, ккал</p>
                            <span className={`text text_type_main-default text_color_inactive`}>{mainElement.calories}</span>
                        </div>
                        <div className={`${styles.infoBlock} mr-5`}>
                            <p className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</p>
                            <span className={`text text_type_main-default text_color_inactive`}>{mainElement.proteins}</span>
                        </div>
                        <div className={`${styles.infoBlock} mr-5`}>
                            <p className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</p>
                            <span className={`text text_type_main-default text_color_inactive`}>{mainElement.fat}</span>
                        </div>
                        <div className={`${styles.infoBlock}`}>
                            <p className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</p>
                            <span className={`text text_type_main-default text_color_inactive`}>{mainElement.carbohydrates}</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else return (<></>)
}

export default IngredientPage;
