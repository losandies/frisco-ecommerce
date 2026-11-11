import { useMediaQuery } from 'react-responsive';
import AltTopBar from '../components/checkout/AltTopBar';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { sizes } from '../screenSizes';

const CheckOut = () => {
    const isMobile = useMediaQuery({ maxWidth: sizes.md });

    return (
        <div className='w-screen min-h-screen flex flex-col overflow-x-hidden'>
            <AltTopBar />
            {isMobile ? (
                <div className='w-full justify-center flex flex-col md:flex-row p-5 sm:p-10 mt-3'>
                    <div>
                        <OrderSummary />
                    </div>
                    <div className='mt-10'>
                        <CheckoutForm />
                    </div>
                </div>
            ) : (
                <div className='w-full justify-center flex flex-col md:flex-row p-5 sm:p-10 mt-3'>
                    <CheckoutForm />
                    <OrderSummary />
                </div>
            )}
        </div>
    );
};

export default CheckOut;
