import { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/default-avatar.jpg';
import type { CurrentUser } from '../../types/user';

type AccountMenuProps = {
    user: CurrentUser;
    onLogout: () => Promise<void>;
    isLoggingOut: boolean;
};

const AccountMenu = ({ user, onLogout, isLoggingOut }: AccountMenuProps) => {
    const [menuIsHovered, setMenuIsHovered] = useState(false);

    return (
        <div
            className='flex flex-col bg-neutral-200 w-[10rem] h-10 hover:h-[7rem] px-1 md:px-2 rounded-lg cursor-default transform duration-[200ms] relative z-50'
            onMouseEnter={() => setMenuIsHovered(true)}
            onMouseLeave={() => setMenuIsHovered(false)}
        >
            <div className='flex flex-row justify-center'>
                <div className='w-8 mt-[5px]'>
                    <img
                        src={defaultAvatar}
                        alt='Account avatar'
                        className='w-[40px] h-[30px] rounded-2xl'
                    />
                </div>
                <h1 className='mx-2 mt-[10px] text-[10px] md:text-sm'>
                    Hi, {user.firstName}
                </h1>
            </div>
            <ul
                className={`w-full flex items-center flex-col ease-in text-sm ${
                    menuIsHovered ? 'flex h-20' : 'opacity-0'
                }`}
            >
                <li
                    className={`my-1 duration-[200ms] w-full ${
                        menuIsHovered ? 'h-8' : 'h-1'
                    } border-[2px] bg-black text-white flex items-center justify-center rounded-md cursor-pointer`}
                >
                    <Link to='/account'>
                        {' '}
                        <h1 className=''>Account</h1>
                    </Link>
                </li>
                <li
                    className={`duration-[200ms] w-full ${
                        menuIsHovered ? 'h-8' : 'h-1'
                    } border-[2px] bg-black text-white flex items-center justify-center rounded-md`}
                >
                    <button
                        type='button'
                        disabled={isLoggingOut}
                        onClick={() => void onLogout()}
                        className='w-full h-full disabled:cursor-wait disabled:opacity-50'
                    >
                        {isLoggingOut ? 'Logging out…' : 'Log Out'}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AccountMenu;
