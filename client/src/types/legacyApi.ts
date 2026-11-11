// Existing Express contracts, retained until their session-based replacements are wired.
import type { Address } from './address';
import type { CartItem } from './cart';
import type { Order, OrderItem } from './order';
import type { CurrentUser } from './user';

export type LegacyAddress = Address & { userId: string };
export type LegacyOrderItem = Omit<OrderItem, 'price' | 'size'> & {
    price: string;
    size: string | number;
};
export type LegacyOrder = Omit<Order, 'items' | 'total'> & {
    items: LegacyOrderItem[];
    total: string;
};
export type LegacyUser = Omit<CurrentUser, 'address' | 'orders'> & {
    address: LegacyAddress | null;
    orders: LegacyOrder[];
    token: string;
    isAdmin?: boolean | null;
};
export type LegacyAddressRequest = {
    token: string;
    street: string;
    city: string;
    state: string;
    zip: string;
};
export type PlaceOrderInfo = {
    user: Pick<LegacyUser, 'token'>;
    items: CartItem[];
};
