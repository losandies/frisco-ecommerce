import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';

type ItemProps = {
    item: Product;
};

const Item = ({ item }: ItemProps) => {
    return (
        <div className='max-w-[300px] md:max-w-[278.5px] flex flex-col lg:ml-7 sm:ml-15 md:pl-0 mb-10'>
            <div>
                <Link
                    to={`/${item.category}/${item.subcategory}/item/${item.id}`}
                >
                    <img
                        src={`/assets/${item.imgPath}`}
                        className='item-photo h-68 rounded-lg'
                    ></img>
                    <div className='item-description pl-3 pt-2 flex flex-col items-start'>
                        <h1>{item.name}</h1>
                        <h1 className='text-xs'>{item.brand}</h1>
                        <h3 className='text-xs text-neutral-500'>
                            ${Number(item.price.toFixed(2))}
                        </h3>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Item;
