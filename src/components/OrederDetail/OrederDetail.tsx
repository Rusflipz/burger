import styles from './OrederDetail.module.css';
// import { dataPropTypes } from '../../utils/types';
import { useEffect, useState } from "react";
import { Route, Redirect, StaticRouter, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { ingredientsSelector } from '../../services/slice/ingredients';
import { orderSelector } from '../../services/slice/order';
import { ImageUrl } from '../../images/imagesForOrders/images'
import {
    CurrencyIcon,
    Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserOrders } from '../../services/WebSocet';
import { getOrders } from '../../services/WebSocet'
import { Iorder } from '../../utils/Interface'



function Ingredient(array: { item: { [x: string]: number; }; }) {
    const { ingredients } = useSelector(ingredientsSelector);
    if (array.item) {
        let id = Object.keys(array.item)[0];
        let value = array.item[`${id}`];
        let img = ImageUrl.find(item => item.id == id);
        let info = ingredients.find((item: { _id: string; }) => item._id == id);
        if (img) {
            return <div className={`${styles.ingredientConteiner} mr-6 mb-4`}>
                <img className={`${styles.image} mr-4`} src={img.url}></img>
                <p className={`${styles.ingredienrName} text text_type_main-default`}>{info.name}</p>
                <div className={`${styles.priceConteiner}`}>
                    <span className={`${styles.ingredientPrice} text text_type_digits-default`}>{`${value} x${info.price}`}</span>
                    <CurrencyIcon type={'primary'} />
                </div>
            </div>
        } else return <></>
    } else return <></>
}

function Time(props: { item: Iorder; massage: string }) {
    const { ingredients } = useSelector(ingredientsSelector);
    let currentOrder = props.item
    let totalPrice = 0
    if (currentOrder) {
        currentOrder.ingredients.map((id: string | null) => {
            if (id !== null) {
                let info = ingredients.find((item: { _id: string; }) => item._id == id)
                totalPrice = totalPrice + info.price
            }
        })
    }
    return <>
        <p className={`${styles.time} text text_type_main-default text_color_inactive`}>{props.massage}</p>
        <div className={`${styles.totalPriceConteiner}`}>
            <p className={`${styles.totalPrice} text text_type_digits-default`}>{totalPrice}</p>
            <CurrencyIcon type={'primary'} />
        </div>
    </>
}

export function OrederDetail(props: { item: Array<Iorder> }) {

    const { id }: { id: string } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();

    const { dataSuccess, userDataSuccess, orders1, userOrders1 } = useSelector(orderSelector);
    const { ingredients } = useSelector(ingredientsSelector);


    let a = false;
    if (dataSuccess || userDataSuccess) {
        a = true;
    }

    let currentOrder = props.item.find((item) => item.number == id);
    if (a && currentOrder) {

        let totalCost = 0;

        let status = ''

        if (currentOrder) {
            if (currentOrder.status == 'done') {
                status = 'Выполнен'
            } else {
                status = 'Готовиться'
            }
        }

        //Тут ругается на формат Date, а typeof пишет, что это обьект, поэтому тут any, тк тут ничего сломаться не может
        let orderDate: any = new Date(currentOrder.createdAt);
        let orderDateHours = orderDate.getHours()
        let orderDateMinutes = orderDate.getMinutes()
        let now: any = new Date();
        let diff: number = now - orderDate;
        let result = Math.round(diff / (1000 * 60 * 60 * 24) % 30);
        let day;


        if (result == 0) {
            day = "Сегодня"
        } else if (result == 1) {
            day = "Вчера"
        }
        else if (result >= 2 && result < 5) {
            day = `${result} дня назад`
        }
        else if (result >= 5) {
            day = `${result} дней назад`
        }
        let massage = `${day}, ${orderDateHours}:${orderDateMinutes} i-GMT+3`

        let resultReduce = currentOrder.ingredients.reduce(function (acc: { hash: { [x: string]: { [x: string]: any; }; }; map: { set: (arg0: any, arg1: number) => void; }; result: any[]; }, cur: string | number) {
            if (!acc.hash[cur]) {
                acc.hash[cur] = { [cur]: 1 };
                acc.map.set(acc.hash[cur], 1);
                acc.result.push(acc.hash[cur]);
            } else {
                acc.hash[cur][cur] += 1;
                acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
            }
            return acc;
        }, {
            hash: {},
            map: new Map(),
            result: []
        });

        let res = resultReduce.result.sort(function (a: object, b: object) {
            return resultReduce.map.get(b) - resultReduce.map.get(a);
        });

        return (
            <>
                {a && (
                    <div className={`${styles.mainConteiner}`} >
                        <p className={`text text_type_digits-default mb-10`}>{`#${currentOrder.number}`}</p>
                        <p className={`text text_type_main-medium mb-3 ${styles.name}`}>{currentOrder.name}</p>
                        <p className={`text text_type_main-small mb-3 mb-15 ${styles.status}`}>{status}</p>
                        <p className={`text text_type_main-medium mb-3 mb-6 ${styles.structureText}`}>Состав:</p>
                        <div className={`${styles.ingredientsConteiner} mb-10`}>
                            {a && res.map((imageId: {}) => <Ingredient item={imageId} key={Object.keys(imageId)[0]} />)}
                        </div>
                        <div className={`${styles.bottomInfo} mb-10`}>
                            {a && <Time item={currentOrder} massage={massage} />}

                        </div>
                    </div>
                )
                }
            </>
        )
    } else return <></>
}

// IngredientDetails.propTypes = {
//     value: dataPropTypes.isRequired
// };
