import React from "react";
import NavBar from "../components/navbar/NavBar";
import loginImg from "../assets/login_img2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import * as EmailValidator from "email-validator";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { sizes } from "../screenSizes";
import PageContainer from "../components/misc/PageContainer";

const Login = () => {
    const { readyToCheckOut } = useSelector((state) => state.cart);
    const { isError, user, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const isMobile = useMediaQuery({ maxWidth: sizes.md });

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const guestLogIn = () => {
        const guestInfo = {
            email: "guest365@gmail.com",
            password: "guest1234",
        };
        dispatch(login(guestInfo));

        if (readyToCheckOut) {
            setTimeout(() => navigate("/checkout"), [250]);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const validEmail = EmailValidator.validate(email);

        if (!validEmail) {
            toast.error("Please enter a valid email address");
        } else if (password === "") {
            toast.error("Please enter a valid password");
        } else {
            const userInfo = {
                email,
                password,
            };
            dispatch(login(userInfo));

            if (readyToCheckOut) {
                setTimeout(() => navigate("/checkout"), [250]);
            }
        }
    };

    useEffect(() => {
        isError ? toast.error(message.error) : null;
        user ? navigate("/") : null;
    }, [isError, isSuccess]);

    return (
        <PageContainer>
            <NavBar />
            <div className="flex items-center justify-center w-full md:h-screen">
                <div className="md:w-[1100px] w-full h-[400px] mb-20 md:mb-0 md:h-auto bg-gray-50 flex">
                    {!isMobile ? (
                        <div className="w-1/2">
                            <img src={loginImg} alt="login_image" />
                        </div>
                    ) : null}

                    <form
                        className={`${
                            isMobile ? "w-full" : "w-1/2"
                        } flex flex-col items-center justify-center`}
                        onSubmit={onSubmit}
                    >
                        <h1 className="text-2xl mb-3 md:mb-5">Welcome Back!</h1>

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
                        <button
                            type="button"
                            className="mt-2 w-72 p-3 bg-green-700 rounded-sm text-white"
                            onClick={() => guestLogIn()}
                        >
                            Guest Log In
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
        </PageContainer>
    );
};

export default Login;
