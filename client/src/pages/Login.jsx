import React from "react";
import NavBar from "../components/navbar/NavBar";
import loginImg from "../assets/login_img2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login, reset } from "../redux/auth/authSlice";
import { toast } from "react-toastify";
import * as EmailValidator from "email-validator";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, isLoading, user, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const { readyToCheckOut } = useSelector((state) => state.cart);

    useEffect(() => {
        isError ? toast.error(message.error) : null;
        user ? navigate("/") : null;
    }, [isError, isSuccess]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const validEmail = EmailValidator.validate(email);

        if (!validEmail) {
            toast.error("Please enter a valid email address");
        } else {
            const userInfo = {
                email,
                password,
            };
            dispatch(login(userInfo));

            if (readyToCheckOut) {
                setTimeout(() => navigate("/checkout"), [250]);
            } else {
                navigate("/");
            }
        }
    };

    return (
        <div className="flex flex-col h-[100vh] w-full">
            <NavBar />
            <div className="flex items-center justify-center w-full h-[100%]">
                <div className="w-[1100px] h-auto bg-gray-50 flex">
                    <div className="w-1/2">
                        <img src={loginImg} alt="login_image" />
                    </div>
                    <form
                        className="w-1/2 flex flex-col items-center justify-center"
                        onSubmit={onSubmit}
                    >
                        <h1 className="text-2xl mb-5">Welcome Back!</h1>

                        <div className="input-container">
                            <h1>Email:</h1>
                            <input
                                onChange={onChange}
                                type="text"
                                name="email"
                                value={email}
                                className="mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300"
                            />
                        </div>
                        <div className="input-container">
                            <h1>Password:</h1>
                            <input
                                onChange={onChange}
                                type="password"
                                name="password"
                                value={password}
                                className="mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-5 w-72 p-3 bg-black rounded-sm text-white"
                        >
                            Log In
                        </button>

                        <h3 className="text-xs mt-2">
                            Don't have an account? Register{" "}
                            <a href="/register" className="underline">
                                here
                            </a>
                        </h3>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
