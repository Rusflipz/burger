import done from '../../images/done.png'

const OrderDetails = () => (
    <>
        <p className={`text text_type_digits-large mb-8 mt-20`}>034536</p>
        <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
        <img className={`bm-15`} src={done} alt="done" />
        <p className={`text text_type_main-default bm-2`}>Ваш заказ начали готовить</p>
        <p className={`text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</p>
    </>
)

export default OrderDetails;