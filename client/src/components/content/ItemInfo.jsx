import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProductsQuery } from '../../api/apiSlice';
import { addToCart } from '../../redux/cart/cartSlice';

const clothingSizes = ['sm', 'md', 'lg', 'xl'];
const shoeSizes = [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13].map(String);
const pantsSizes = [28, 30, 32, 34, 36, 38, 42, 44, 46].map(String);
const accessorySize = '1SZ';

const ItemInfo = () => {
    const { data: items = [], isLoading, isError } = useGetProductsQuery();
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const { id } = useParams();
    const dispatch = useDispatch();

    const selectedItem = items.find((item) => item.id === Number(id));

    if (isLoading) {
        return <p role='status'>Loading Item</p>;
    } else if (isError) {
        return <p role='alert'>Unable to load item. Please try again.</p>;
    } else if (!selectedItem) {
        return <p role='alert'>Product not found</p>;
    }

    const isClothing =
        selectedItem.subcategory === 'shirts' ||
        selectedItem.subcategory === 'hoodies';
    const isShoes = selectedItem.category === 'shoes';
    const isPants = selectedItem.subcategory === 'pants';

    let availableSizes = [];
    let sizeButtonSpacing = 'mr-2 my-2';

    if (isClothing) {
        availableSizes = clothingSizes;
        sizeButtonSpacing = 'mr-2 mb-4';
    } else if (isShoes) {
        availableSizes = shoeSizes;
        sizeButtonSpacing = 'md:mr-2 my-2';
    } else if (isPants) {
        availableSizes = pantsSizes;
        sizeButtonSpacing = 'md:mr-2 my-2';
    } else if (selectedItem.category === 'accessories') {
        availableSizes = [accessorySize];
    }

    const addItemToCart = () => {
        if (selectedSize === '') return toast.error('Please Select Your Size');

        const itemInfo = {
            ...selectedItem,
            size: selectedSize,
            quantity: selectedQuantity,
        };

        dispatch(addToCart(itemInfo));
        toast.success('Item Added To Cart');
    };

    const selectNewSize = (size) => {
        setSelectedSize(size);
        setSelectedQuantity(1);
    };

    return (
        <div className='h-full w-full flex justify-center md:px-10 pt-5 md:pt-16 md:mb-[200px]'>
            <div className='flex flex-col md:flex-row h-[700px] w-full md:w-[1100px]'>
                <div
                    id='picture'
                    className='flex justify-center items-center w-full md:w-[20%] md:min-w-[500px]'
                >
                    <img
                        src={`/assets/${selectedItem.imgPath}`}
                        alt={selectedItem.name}
                        className='h-[300px] w-[200px] md:h-[600px] md:w-[400px] rounded-lg'
                    />
                </div>
                <div className='w-full h-[400px] md:h-[700px] md:w-[50%] md:min-w-[500px] px-6 mt-8 md:mt-0 flex flex-col items-center md:items-start md:justify-center'>
                    <div className='w-full md:w-[400px] md:ml-10'>
                        <div className='name'>
                            <h1 className='text-xl md:text-3xl'>
                                {selectedItem.name}
                            </h1>
                            <h2 className='text-lg md:text-xl font-bold uppercase'>
                                {selectedItem.brand}
                            </h2>
                        </div>
                        <div className='price'>
                            <h3 className='text-md'>
                                ${selectedItem.price.toFixed(2)}
                            </h3>
                        </div>
                        <div className='sizing mt-5 md:mt-10'>
                            <h1 className='mb-2'>Choose Size</h1>
                            <div className='sizing-buttons flex flex-wrap md:max-w-[85%] justify-between md:justify-start'>
                                {availableSizes.map((size) => (
                                    <button
                                        type='button'
                                        key={size}
                                        aria-pressed={selectedSize === size}
                                        className={`h-10 rounded-lg border border-black ${
                                            isShoes ? 'w-[6.93rem] md:w-24' : 'w-24'
                                        } ${sizeButtonSpacing} ${
                                            selectedSize === size ? 'bg-black text-white' : ''
                                        }`}
                                        onClick={() => selectNewSize(size)}
                                    >
                                        <span className={isClothing ? 'uppercase' : ''}>
                                            {size}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='add-to-cart mt-2 md:mt-10 flex flex-col md:flex-row md:items-center'>
                            <div className='w-full md:w-[6.25rem] h-10 border-black border-[1px] flex justify-around rounded-lg'>
                                <button
                                    className={
                                        selectedQuantity === 1
                                            ? 'disabled'
                                            : null
                                    }
                                    onClick={() => {
                                        if (selectedQuantity != 1) {
                                            setSelectedQuantity(
                                                selectedQuantity - 1,
                                            );
                                        }
                                    }}
                                >
                                    <p className='text-xl'>-</p>
                                </button>
                                <input
                                    className='product-quantity text-center text-xl md:text-base caret-transparent cursor-default'
                                    type='number'
                                    value={selectedQuantity}
                                    min='1'
                                    max='5'
                                    step='1'
                                    readOnly
                                />
                                <button
                                    onClick={() =>
                                        setSelectedQuantity(
                                            selectedQuantity + 1,
                                        )
                                    }
                                >
                                    <p className='text-xl'>+</p>
                                </button>
                            </div>
                            <button
                                className='uppercase text-xs w-full md:w-[46%] h-12 md:h-10 bg-black text-white mt-4 md:mt-0 md:ml-5'
                                onClick={addItemToCart}
                            >
                                add to bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ItemInfo;
