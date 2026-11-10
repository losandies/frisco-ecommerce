import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../api/apiSlice';
import FilterBar from './FilterBar';
import Item from './Item';

type SortDirection = 'low' | 'high' | null;

const ItemList = () => {
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const { data: items = [], isLoading, isError } = useGetProductsQuery();
    const { subcategory = '' } = useParams();

    if (isLoading) {
        return <p role='status'>Loading products…</p>;
    }

    if (isError) {
        return <p role='alert'>Unable to load products. Please try again.</p>;
    }

    const selectedCategory = items.filter(
        (item) => item.subcategory === subcategory.toLowerCase(),
    );

    if (sortDirection === 'high') {
        selectedCategory.sort((a, b) => b.price - a.price);
    } else if (sortDirection === 'low') {
        selectedCategory.sort((a, b) => a.price - b.price);
    }

    return (
        <div className='h-full w-full flex flex-col justify-center px-10 md:pt-12 mb-[100px]'>
            <FilterBar onSortChange={setSortDirection} />
            <div className='items-container place-items-center grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-full mt-10 md:mb-[200px]'>
                {selectedCategory.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ItemList;
