import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
    getCartTotalItems,
    getCartTotalPrice,
} from '../../redux/cart/cartSlice';
import { sizes } from '../../screenSizes';
import ItemDivider from '../cart/ItemDivider';
import AccountReminder from './AccountReminder';

import { useSession } from '../../hooks/useSession';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CheckoutItem from './CheckoutItem';

const OrderSummary = () => {
    const { user } = useSession();
    const { cart, totalPrice, amountOfItems } = useAppSelector(
        (state) => state.cart,
    );

    const isMobile = useMediaQuery({ maxWidth: sizes.md });
    const dispatch = useAppDispatch();

    const subtotalCents = Math.round(Number(totalPrice) * 100);
    const salesTax = (Math.round(subtotalCents * 0.06) / 100).toFixed(2);
    const shippingCost = 5;

    const getTotal = (subtotal: number, shipping: number, tax: number) => {
        return (subtotal + tax + shipping).toFixed(2);
    };

    useEffect(() => {
        dispatch(getCartTotalPrice());
        dispatch(getCartTotalItems());
    }, [cart, dispatch]);

    return (
        <div className='h-full md:w-1/2 max-w-[600px] w-full'>
            {!isMobile && !user ? <AccountReminder /> : null}
            <div className='px-2 md:px-5 mt-12'>
                <h1 className='font-bold text-2xl md:text-base'>
                    Order Summary
                </h1>
                <div className='flex justify-between mt-3'>
                    <h1>Subtotal</h1>
                    <h1>${totalPrice}</h1>
                </div>
                <div className='flex justify-between mt-1'>
                    <h1>Standard Shipping</h1>
                    <h1>${shippingCost}.00</h1>
                </div>
                <div className='flex justify-between mt-1 mb-7'>
                    <h1>Demo Tax (6%)</h1>
                    <h1>${salesTax}</h1>
                </div>
                <ItemDivider />
                <div className='flex justify-between mt-5 mb-5 font-bold'>
                    <h1>Total</h1>
                    <h1>
                        $
                        {getTotal(
                            Number.parseFloat(totalPrice),
                            shippingCost,
                            Number.parseFloat(salesTax),
                        )}
                    </h1>
                </div>
                <ItemDivider />
                <div className='mt-5'>
                    <h2 className='font-bold'>Shopping Bag({amountOfItems})</h2>
                    <div className='md:max-h-[370px] overflow-scroll scrollbar-hide'>
                        {cart.map((item) => (
                            <CheckoutItem
                                item={item}
                                key={`${item.id}-${item.size}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
