import React from "react";
import { Autoplay, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { selectItem } from "../../redux/items/itemsSlice";

export default function Carousel() {
    const { items } = useSelector((state) => state.items);

    let shuffledItems = items
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="w-[1100px] my-10">
            <Swiper
                slidesPerView={5}
                spaceBetween={40}
                loop={true}
                navigation={true}
                autoplay={{
                    delay: 4000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                className="rounded-md flex"
            >
                {shuffledItems.map((item) => (
                    <SwiperSlide
                        className="cursor-pointer flex justify-center w-60 h-72"
                        key={item.id}
                        onClick={() => {
                            dispatch(selectItem(item));
                            navigate(
                                `/${item.category}/${item.subcategory}/item/${item.id}`
                            );
                        }}
                    >
                        <img
                            src={`../../src/assets/${item.imgPath}`}
                            alt="movie-img"
                            className=""
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
