import React, { useEffect } from "react";

const Order = ({ order }) => {
    useEffect(() => console.log(order.createdAt));
    return (
        <div className="w-full h-52 border-2 rounded-md border-neutral-200 p-3">
            <div className="w-full h-auto flex justify-between">
                <div>{order.items.length} Item(s)</div>
                <div>Total: ${order.total}</div>
            </div>
            <div className="max-w-full overflow-x-auto flex h-32 mt-2">
                {order.items.map((item) => (
                    <img
                        src={`../../src/assets/${item.imgPath}`}
                        alt=""
                        className="w-24 pr-2"
                    />
                ))}
            </div>
            <div className="w-full h-auto flex justify-end mt-2">
                <p className="font-bold text-[11px]">Order ID: {order.id}</p>
            </div>
        </div>
    );
};

export default Order;
