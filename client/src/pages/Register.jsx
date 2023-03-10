import React from "react";
import NavBar from "../components/navbar/NavBar";
import registerImg from "../assets/login_img.jpeg";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as EmailValidator from "email-validator";
import { register } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, isLoading, user, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        isError ? toast.error(message) : null;
        isSuccess || user ? navigate("/") : null;
    }, [user, isError, isSuccess, message, isLoading, navigate, dispatch]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

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
                name,
                email,
                password,
            };
            dispatch(register(userInfo));
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <div className="flex flex-col h-full">
            <NavBar />

            <div className="flex items-center justify-center w-full h-full">
                <div className="w-[1100px] h-auto bg-gray-50 flex">
                    <form
                        className="w-1/2 flex flex-col items-center justify-center"
                        onSubmit={onSubmit}
                    >
                        <h1 className="text-2xl mb-5">Register Now</h1>

                        <div className="input-container">
                            <h1>Name:</h1>
                            <input
                                type="text"
                                name="name"
                                className="mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300"
                                onChange={onChange}
                                value={name}
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
                    <div className="w-1/2">
                        <img src={registerImg} alt="login_image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
