import { ReactNode } from "react";

export interface Iingredients {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
    item: {
        calories: number;
        carbohydrates: number;
        fat: number;
        image: string;
        image_large: string;
        image_mobile: string;
        name: string;
        price: number;
        proteins: number;
        type: string;
        __v: number;
        _id: string;
    }
}

export interface Iorder{
    createdAt: string | number | Date;
    ingredients: any;
    name: ReactNode;
    status: string;
    number: string;
    orderNumber: ReactNode;
    orderName: ReactNode;
}