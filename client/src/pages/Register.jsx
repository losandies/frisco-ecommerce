import React from "react";
import NavBar from "../components/navbar/NavBar";
import registerImg from "../assets/login_img.jpeg";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as EmailValidator from "email-validator";
import { register } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { sizes } from "../screenSizes";
import PageContainer from "../components/misc/PageContainer";

const Register = () => {
    const { isError, isLoading, user, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const isMobile = useMediaQuery({ maxWidth: sizes.md });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
    });

    const { firstName, lastName, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const validEmail = EmailValidator.validate(email);

        if (formData.name === "") {
            toast.error("Name field can not be empty");
        } else if (!validEmail) {
            toast.error("Please enter a valid email address");
        } else if (password != password2) {
            toast.error("Passwords do not match");
        } else {
            const userInfo = {
                firstName,
                lastName,
                email,
                password,
            };
            dispatch(register(userInfo));
        }
    };

    useEffect(() => {
        isError ? toast.error(message) : null;
        user ? navigate("/") : null;
    }, [isSuccess, isError]);

    return (
        <PageContainer>
            <NavBar />

            <div className="flex items-center justify-center w-full h-full md:h-screen">
                <div className="md:w-[1100px] w-full md:h-auto h-[600px] mb-20 md:mb-0 bg-gray-50 flex">
                    <form
                        className={`${
                            isMobile ? "w-full" : "w-1/2"
                        } flex flex-col items-center justify-center`}
                        onSubmit={onSubmit}
                    >
                        <h1 className="text-2xl mb-5">Register Now</h1>

                        <div className="input-container">
                            <h1>First Name:</h1>
                            <input
                                type="text"
                                name="firstName"
                                className="mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300"
                                onChange={onChange}
                                value={firstName}
                            />
                        </div>
                        <div className="input-container">
                            <h1>Last Name:</h1>
                            <input
                                type="text"
                                name="lastName"
                                className="mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300"
                                onChange={onChange}
                                value={lastName}
                            />
                        </div>
                        <div className="input-container">
                            <h1>Email:</h1>
                            <input
                                type="email"
                                name="email"
                                className="mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300"
                                onChange={onChange}
                                value={email}
                            />
                        </div>
                        <div className="input-container">
                            <h1>Password:</h1>
                            <input
                                type="password"
                                name="password"
                                className="mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300"
                                onChange={onChange}
                                value={password}
                            />
                        </div>
                        <div className="input-container">
                            <h1>Confirm Password:</h1>
                            <input
                                type="password"
                                name="password2"
                                className="mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300"
                                onChange={onChange}
                                value={password2}
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-5 w-72 p-3 bg-black rounded-sm text-white"
                        >
                            Register
                        </button>

                        <h3 className="text-xs mt-2">
                            Already have an account? Log in{" "}
                            <a href="/login" className="underline">
                                here
                            </a>
                        </h3>
                    </form>
                    {!isMobile ? (
                        <div className="w-1/2">
                            <img src={registerImg} alt="register_image" />
                        </div>
                    ) : null}
                </div>
            </div>
        </PageContainer>
    );
};

export default Register;
