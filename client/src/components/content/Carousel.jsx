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
import { sizes } from "../../screenSizes";
import { useMediaQuery } from "react-responsive";

export default function Carousel() {
    const { items } = useSelector((state) => state.items);

    const isMobile = useMediaQuery({ maxWidth: sizes.sm });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let shuffledItems = items
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);

    return (
        <div className="w-screen md:w-[800px] lg:w-[1000px] md:h-[400px] 2xl:w-[1000px]">
            <Swiper
                slidesPerView={isMobile ? 3 : 5}
                spaceBetween={10}
                loop={true}
                navigation={true}
                autoplay={{
                    delay: 2000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                className="rounded-md flex"
            >
                {shuffledItems.map((item) => (
                    <SwiperSlide
                        className="cursor-pointer flex justify-center max-w-60 max-h-72"
                        key={item.id}
                        onClick={() => {
                            dispatch(selectItem(item));
                            navigate(
                                `/${item.category}/${item.subcategory}/item/${item.id}`
                            );
                        }}
                    >
                        <img
                            src={`assets/${item.imgPath}`}
                            alt="movie-img"
                            className=""
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
