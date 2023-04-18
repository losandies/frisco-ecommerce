import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "./Map";
import { STATES } from "../../checkout/states";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateUserAddress } from "../../../redux/user/userSlice";

const AddressDisplay = ({ latitude, longitude }) => {
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        street: "",
        city: "",
        zip: "",
        state: "",
    });

    const { street, city, zip, state } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const saveAddress = async () => {
        const token = user.token;
        const newAddressInfo = formData;
        dispatch(updateUserAddress(token, newAddressInfo));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (Object.values(formData).some((x) => x === "")) {
            toast.error("Please enter a valid address");
            return;
        }
        saveAddress();

        setTimeout(() => {
            toast.success("Address Updated");
            navigate("/");
        }, 1000);
    };

    return (
        <>
            {user.address !== null ? (
                <div className="mt-5 flex flex-col md:flex-row md:justify-between">
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="flex flex-col">
                            <h1 className="text-2xl">Your Address</h1>
                            <div>
                                <h1 className="text-sm text-neutral-500 my-2">
                                    Current Saved Address
                                </h1>
                            </div>
                            <div>
                                <h1>{user.address.street}</h1>
                                <h1>
                                    {user.address.city}, {user.address.state}{" "}
                                    {user.address.zipCode}
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5">
                            <h1 className="text-sm text-neutral-500 my-2">
                                Update Address
                            </h1>
                            <form
                                action=""
                                className="w-full  text-[#A4ACB7]"
                                onSubmit={onSubmit}
                            >
                                <div className="mb-2 w-[210px]">
                                    <input
                                        type="text"
                                        className="w-full border-2 rounded-md pl-1"
                                        placeholder="Street"
                                        value={street}
                                        name="street"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-2 w-[210px]">
                                    <input
                                        type="text"
                                        className="w-full border-2 rounded-md pl-1"
                                        placeholder="City"
                                        value={city}
                                        name="city"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-2 w-[210px] flex justify-between">
                                    <select
                                        type="text"
                                        className="w-[60%] border-2 rounded-md bottom-2 px-1"
                                        name="state"
                                        onChange={onChange}
                                    >
                                        <option disabled selected value="State">
                                            State
                                        </option>
                                        {STATES.map((state) => (
                                            <option value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        className="w-[38%] border-2 rounded-md pl-1"
                                        placeholder="Zip"
                                        value={zip}
                                        name="zip"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="flex w-[210px] justify-start mt-4">
                                    <button className="btn btn-sm">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w-full mt-3 md:w-1/2 flex justify-center">
                        <Map latitude={latitude} longitude={longitude} />
                    </div>
                </div>
            ) : (
                <div className="mt-5 flex flex-col md:flex-row md:justify-between ">
                    <div className="w-full md:w-1/2 flex flex-col">
                        <h1 className="text-2xl">Your Address</h1>
                        <h1 className="text-sm text-neutral-500 my-2">
                            You dont have an address saved currently
                        </h1>
                        <div className="flex flex-col mt-3">
                            <h1 className="text-md text-neutral-500 my-2">
                                Add an address
                            </h1>
                            <form
                                action=""
                                className="w-full  text-[#A4ACB7]"
                                onSubmit={onSubmit}
                            >
                                <div className="mb-2 w-[210px]">
                                    <input
                                        type="text"
                                        className="w-full border-2 rounded-md pl-1"
                                        placeholder="Street"
                                        value={street}
                                        name="street"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-2 w-[210px]">
                                    <input
                                        type="text"
                                        className="w-full border-2 rounded-md pl-1"
                                        placeholder="City"
                                        value={city}
                                        name="city"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-2 w-[210px] flex justify-between">
                                    <select
                                        type="text"
                                        className="w-[60%] border-2 rounded-md bottom-2 px-1"
                                        name="state"
                                        onChange={onChange}
                                    >
                                        <option disabled selected value="State">
                                            State
                                        </option>
                                        {STATES.map((state) => (
                                            <option value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        className="w-[38%] border-2 rounded-md pl-1"
                                        placeholder="Zip"
                                        value={zip}
                                        name="zip"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="flex w-[210px] justify-start mt-4">
                                    <button className="btn btn-sm">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddressDisplay;
