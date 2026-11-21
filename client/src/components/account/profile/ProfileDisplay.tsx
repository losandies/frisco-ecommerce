import type { CurrentUser } from '../../../types/user';

type ProfileDisplayProps = {
    user: CurrentUser;
};

const ProfileDisplay = ({ user }: ProfileDisplayProps) => {
    const userSinceYear = user.createdAt.slice(0, 4);
    const numOfOrders = user.orders.length;

    const totalMoneySpent = () =>
        user.orders.reduce((total, order) => total + order.total, 0).toFixed(2);

    return (
        <div className='mt-5'>
            <div>
                <h1 className='text-2xl'>Hi, {user.firstName} </h1>
                <h1 className='text-base text-neutral-400'>
                    User since {userSinceYear}
                </h1>
            </div>
            <div className='mt-5'>
                <h1 className='text-xl'>Your stats</h1>
                <h1 className='text-neutral-400'>
                    Orders placed: {numOfOrders} orders
                </h1>
                <h1 className='text-neutral-400'>
                    Total spent: ${totalMoneySpent()}
                </h1>
            </div>
        </div>
    );
};

export default ProfileDisplay;
