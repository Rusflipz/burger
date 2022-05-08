import { Key, ReactNode } from "react";

export interface Iingredients {
    uniqueID?: Key | null | undefined;
    calories?: number;
    carbohydrates?: number;
    fat?: number;
    image: string;
    image_large?: string;
    image_mobile?: string;
    name: string;
    price: number;
    proteins?: number;
    type: string;
    __v?: number;
    _id: string;
    id?: string;
}


export interface Iorder {
    _id?: string;
    createdAt?: any | undefined | string;
    ingredients?: any;
    name?: ReactNode;
    status?: string;
    number?: string;
    orderNumber?: string;
    orderName?: string;
    currentOrder?: {
        createdAt?: string;
    }
}