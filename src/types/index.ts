import { categoryMap } from "../utils/constants";

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export type TPayment = 'card' | 'cash' | '';

export interface IProductListResponse {
    total: number;
    items: IProduct[];
}

export interface IOrderRequest extends IBuyer {
    total: number;
    items: IProduct['id'][];
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export interface IHeader {
    counter: number;
}

export interface IGallery {
    catalog: HTMLElement[];
}

export interface IModal {
    content: HTMLElement;
}

export interface ISuccess {
    description: string;
}

export interface IBasket {
    list: HTMLElement[];
    price: number | null;
    valid: boolean;
}

export interface ICard {
    title: string;
    price: number | null;
}

export interface ICardCatalog extends ICard {
    category: string;
    image: string;
}

export interface ICardBasket extends ICard {
    index: number;
}

export interface ICardPreview extends ICard {
    category: string;
    image: string;
    text: string;
    inCart: boolean;
}

export interface ICardActions {
    onClick?: () => void;
}

export interface IForm {
    errors: string;
    valid: boolean;
}

export interface IFormOrder extends IForm {
    payment: TPayment;
    address: string;
}

export interface IFormContact extends IForm {
    email: string;
    phone: string;
}

export type CategoryKey = keyof typeof categoryMap