import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = (props) => (
    <>
        <p className={`${styles.title} text text_type_main-large`}>Детали ингридиента</p>
        <img className={`${styles.image} mb-4`} src={props.value.image_large} alt={props.value.name}></img>
        <p className={`${styles.name} mb-8 text_type_main-medium`}>{props.value.name}</p>
        <div className={`${styles.conteiner} mb-15`}>
            <div className={`${styles.infoBlock} mr-5`}>
                <p className={`text text_type_main-default text_color_inactive mb-2`}>Калории, ккал</p>
                <span className={`text text_type_main-default text_color_inactive`}>{props.value.calories}</span>
            </div>
            <div className={`${styles.infoBlock} mr-5`}>
                <p className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</p>
                <span className={`text text_type_main-default text_color_inactive`}>{props.value.proteins}</span>
            </div>
            <div className={`${styles.infoBlock} mr-5`}>
                <p className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</p>
                <span className={`text text_type_main-default text_color_inactive`}>{props.value.fat}</span>
            </div>
            <div className={`${styles.infoBlock}`}>
                <p className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</p>
                <span className={`text text_type_main-default text_color_inactive`}>{props.value.carbohydrates}</span>
            </div>
        </div>
    </>
)

IngredientDetails.propTypes = {
    // image_large: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    // calories: PropTypes.string.isRequired,
    // proteins: PropTypes.string.isRequired,
    // fat: PropTypes.string.isRequired,
    // carbohydrates: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
};

export default IngredientDetails;