import React from "react";
import { useSelector } from "react-redux";
import Map from "./Map";

const AddressDisplay = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="mt-5 flex justify-between">
            <div className="w-1/2 flex flex-col">
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
            <div className="w-1/2">
                <Map />
            </div>
        </div>
    );
};

export default AddressDisplay;
