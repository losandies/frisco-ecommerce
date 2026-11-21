import { Link } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import { setReadyToCheckOut } from '../../redux/cart/cartSlice';
import { useAppDispatch } from '../../redux/hooks';

const AccountReminder = () => {
    const { user } = useSession();
    const dispatch = useAppDispatch();

    return (
        <div
            className={`w-full h-28 text-white flex flex-col justify-center px-5 bg-black rounded-sm ${
                user ? 'hidden' : null
            }`}
        >
            <h2 className='text-2xl'>Have an account already?</h2>
            <span>
                <Link
                    to='/login'
                    className='underline'
                    onClick={() => dispatch(setReadyToCheckOut(true))}
                >
                    Log In
                </Link>
                {''} now to make managing your orders easier.
            </span>
        </div>
    );
};

export default AccountReminder;
