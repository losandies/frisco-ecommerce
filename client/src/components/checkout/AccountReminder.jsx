import React from "react";
import { Link } from "react-router-dom";

const AccountReminder = () => {
    return (
        <div className="w-full h-28 text-white flex flex-col justify-center px-5 bg-black rounded-sm">
            <h2 className="text-2xl">Have an account already?</h2>
            <span>
                <Link to="/login" className="underline">
                    Log In
                </Link>
                {""} now to make managing your orders easier.
            </span>
        </div>
    );
};

export default AccountReminder;
