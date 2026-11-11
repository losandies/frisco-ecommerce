import type { ChangeEvent, FormEvent } from "react";
import type { ApiError } from "../types/apiError";
import * as EmailValidator from 'email-validator';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginMutation, useRegisterMutation } from '../api/apiSlice';
import PageContainer from '../components/misc/PageContainer';
import NavBar from '../components/navbar/NavBar';
import { useSession } from '../hooks/useSession';
import { sizes } from '../screenSizes';
import loginImg from '/assets/login_img2.jpg';

const Login = () => {
    const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation();
    const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
    const { status } = useSession();
    const { readyToCheckOut } = useAppSelector((state) => state.cart);

    const isMobile = useMediaQuery({ maxWidth: sizes.md });

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const guestLogIn = async () => {
        const demoEmail = `demo-${crypto.randomUUID()}@example.test`;
        const demoPassword = crypto.randomUUID().slice(0, 20);

        try {
            await registerUser({
                firstName: 'Guest',
                lastName: 'Shopper',
                email: demoEmail,
                password: demoPassword,
            }).unwrap();

            await loginUser({
                email: demoEmail,
                password: demoPassword,
            }).unwrap();
        } catch (error) {
            toast.error(
                (error as ApiError)?.data?.error ||
                    'Unable to start a demo session. Please try again.',
            );
        }
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validEmail = EmailValidator.validate(email);

        if (!validEmail) {
            toast.error('Please enter a valid email address');
        } else if (password === '') {
            toast.error('Please enter a valid password');
        } else {
            const userInfo = {
                email,
                password,
            };
            try {
                await loginUser(userInfo).unwrap();
            } catch (error) {
                toast.error(
                    (error as ApiError)?.data?.error || 'Unable to log in. Please try again.',
                );
            }
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            void navigate(readyToCheckOut ? '/checkout' : '/');
        }
    }, [status, readyToCheckOut, navigate]);

    return (
        <PageContainer>
            <NavBar />
            <div className='flex items-center justify-center w-full md:h-screen'>
                <div className='md:w-[1100px] w-full h-[400px] mb-20 md:mb-0 md:h-auto bg-gray-50 flex'>
                    {!isMobile ? (
                        <div className='w-1/2'>
                            <img src={loginImg} alt='login_image' />
                        </div>
                    ) : null}

                    <form
                        className={`${
                            isMobile ? 'w-full' : 'w-1/2'
                        } flex flex-col items-center justify-center`}
                        onSubmit={onSubmit}
                    >
                        <h1 className='text-2xl mb-3 md:mb-5'>Welcome Back!</h1>

                        <div className='input-container'>
                            <h1>Email:</h1>
                            <input
                                onChange={onChange}
                                type='text'
                                name='email'
                                value={email}
                                className='mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300'
                            />
                        </div>
                        <div className='input-container'>
                            <h1>Password:</h1>
                            <input
                                onChange={onChange}
                                type='password'
                                name='password'
                                value={password}
                                className='mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300'
                            />
                        </div>

                        <button
                            type='submit'
                            className='mt-5 w-72 p-3 bg-black rounded-sm text-white'
                            disabled={isRegistering || isLoggingIn}
                        >
                            Log In
                        </button>
                        <button
                            type='button'
                            className='mt-2 w-72 p-3 bg-green-700 rounded-sm text-white'
                            disabled={isRegistering || isLoggingIn}
                            onClick={() => guestLogIn()}
                        >
                            Try Demo Account
                        </button>

                        <h3 className='text-xs mt-2'>
                            Don't have an account? Register{' '}
                            <a href='/register' className='underline'>
                                here
                            </a>
                        </h3>
                    </form>
                </div>
            </div>
        </PageContainer>
    );
};

export default Login;
