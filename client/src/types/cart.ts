import type { Product } from './product';

export type CartItem = Product & {
    size: string;
    quantity: number;
};

export type CartState = {
    cart: CartItem[];
    amountOfItems: number;
    totalPrice: string;
    orderPlaced: boolean;
    readyToCheckOut: boolean;
};

export type CartItemKey = Pick<CartItem, 'id' | 'size'>;
