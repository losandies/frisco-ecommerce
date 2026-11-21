import { useEffect } from 'react';
import ShoppingCart from '../components/cart/ShoppingCart';
import PageContainer from '../components/misc/PageContainer';
import NavBar from '../components/navbar/NavBar';
import SideBar from '../components/sidebar/SideBar';
import { getCartTotalPrice } from '../redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Cart = () => {
    const { amountOfItems } = useAppSelector((state) => state.cart);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCartTotalPrice());
    }, [amountOfItems, dispatch]);

    return (
        <PageContainer>
            <NavBar />
            <div className='h-full w-full flex flex-row md:mb-[150px] justify-between'>
                <div>
                    <SideBar />
                </div>
                <ShoppingCart />
            </div>
        </PageContainer>
    );
};

export default Cart;
