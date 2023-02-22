import React from "react";
import NavBar from "../components/navbar/NavBar";
import loginImg from "../assets/login_img2.jpg";

const Login = () => {
    return (
        <div className="flex flex-col h-full">
            <NavBar />

            <div className="flex items-center justify-center w-full h-full">
                <div className="w-[1100px] h-auto bg-gray-50 flex">
                    <div className="w-1/2">
                        <img src={loginImg} alt="login_image" />
                    </div>
                    <div className="w-1/2 flex flex-col items-center justify-center">
                        <h1 className="text-2xl mb-5">Welcome Back!</h1>

                        <div className="input-container">
                            <h1>Email:</h1>
                            <input
                                type="text"
                                name="email"
                                className="mb-4 mt-1 border-2 p-1 w-72 rounded-sm outline-slate-300"
                            />
                        </div>
                        <div className="input-container">
                            <h1>Password:</h1>
                            <input
                                type="password"
                                name="email"
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
