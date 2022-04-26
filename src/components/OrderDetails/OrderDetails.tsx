import done from '../../images/done.png'
// import PropTypes from 'prop-types';
import { Iorder } from '../../utils/Interface'

export const OrderDetails = (props: Iorder) => (
    <>
        <p className={`text text_type_digits-large mb-8 mt-20`}>{props.orderNumber}</p>
        <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
        <img className={`bm-15`} src={done} alt="done" />
        <p className={`text text_type_main-default bm-2`}>Ваш заказ начали готовить</p>
        <p className={`text text_type_main-default mb-5 mt-5`}>{props.orderName}</p>
        <p className={`text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</p>
    </>
)

// OrderDetails.propTypes = {
//     orderNumber: PropTypes.number.isRequired,
//     orderName: PropTypes.string.isRequired,
// };
