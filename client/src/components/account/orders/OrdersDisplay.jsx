import React from "react";
import { useSelector } from "react-redux";
import Order from "./Order";

const OrdersDisplay = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            {user.orders.length > 0 ? (
                <div className="mt-5">
                    <h1 className="text-2xl">Your Orders</h1>
                    {user.orders.map((order) => (
                        <Order order={order} />
                    ))}
                </div>
            ) : (
                <div className="mt-5 flex flex-col md:flex-row md:justify-between ">
                    <div className="w-full md:w-1/2 flex flex-col">
                        <h1 className="text-2xl">Your Orders</h1>
                        <h1 className="text-sm text-neutral-500 my-2">
                            You dont have any orders yet!
                        </h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrdersDisplay;
