import type { Address } from './address';
import type { Order } from './order';

export type CurrentUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: Address | null;
    orders: Order[];
    createdAt: string;
};
