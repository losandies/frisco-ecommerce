import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectItem } from "../../redux/items/itemsSlice";

export default function Carousel() {
    const { items, isLoading, isError } = useSelector((state) => state.items);
    const track = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (isLoading) return <p role="status">Loading collection…</p>;
    if (isError) return <p role="alert">Unable to load the collection. Please refresh to try again.</p>;
    return (
        <section aria-label="Newest collection" className="w-screen md:w-[800px] lg:w-[1000px] px-2">
            <div className="flex justify-end gap-3 mb-3">
                <button type="button" aria-label="Previous products" className="border rounded px-4 py-2" onClick={() => track.current?.scrollBy({ left: -400, behavior: 'smooth' })}>←</button>
                <button type="button" aria-label="Next products" className="border rounded px-4 py-2" onClick={() => track.current?.scrollBy({ left: 400, behavior: 'smooth' })}>→</button>
            </div>
            <div ref={track} className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4">
                {items.map(item => (
                    <button type="button" key={item.id} className="shrink-0 w-[30%] md:w-[19%] snap-start text-left" onClick={() => {
                        dispatch(selectItem(item));
                        navigate(`/${item.category}/${item.subcategory}/item/${item.id}`);
                    }}>
                        <img src={`/assets/${item.imgPath}`} alt={item.name} loading="lazy" className="w-full h-48 md:h-64 object-cover rounded-md" />
                        <p className="text-sm mt-2">{item.name}</p>
                        <p className="text-sm">${item.price}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}
