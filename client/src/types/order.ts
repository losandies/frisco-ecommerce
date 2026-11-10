import { Product } from './product';

export type Order = {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    createdAt: string;
};

export type OrderItem = Omit<Product, 'createdAt'> & {
    size: string;
    quantity: number;
};
