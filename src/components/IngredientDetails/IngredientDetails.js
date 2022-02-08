import styles from './IngredientDetails.module.css';

const IngredientDetails = (props) => (
    <>
        <p className={`${styles.title} text text_type_main-large`}>Детали ингридиента</p>
        <img className={`${styles.image} mb-4`} src={props.image_large} alt={props.name}></img>
        <p className={`${styles.name} mb-8 text_type_main-medium`}>{props.name}</p>
        <div className={`${styles.conteiner} mb-15`}>
            <div className={`${styles.infoBlock} mr-5`}>
                <p className={`text text_type_main-default text_color_inactive mb-2`}>Калории, ккал</p>
                <span className={`text text_type_main-default text_color_inactive`}>{props.calories}</span>
            </div>
            <div className={`${styles.infoBlock} mr-5`}>
                <p className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</p>
                <span className={`text text_type_main-default text_color_inactive`}>{props.proteins}</span>
            </div>
            <div className={`${styles.infoBlock} mr-5`}>
                <p className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</p>
                <span className={`text text_type_main-default text_color_inactive`}>{props.fat}</span>
            </div>
            <div className={`${styles.infoBlock}`}>
                <p className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</p>
                <span className={`text text_type_main-default text_color_inactive`}>{props.carbohydrates}</span>
            </div>
        </div>
    </>
)

export default IngredientDetails;