import { useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const FilterBar = ({ onSortChange }) => {
    const [menuDisplay, setmenuDisplay] = useState(true);
    const [displayMenuStyle, setdisplayMenuStyle] = useState('');

    const { category, subcategory } = useSelector((state) => state.nav);

    const showMenu = () => {
        setmenuDisplay(!menuDisplay);
        if (menuDisplay) {
            setdisplayMenuStyle('');
        } else {
            setdisplayMenuStyle('none');
        }
        return menuDisplay;
    };

    const capitalizeFirstLetter = (word) => {
        const firstLetter = subcategory.charAt(0).toUpperCase();
        const remainingLetters = word.slice(1);

        return firstLetter + remainingLetters;
    };

    return (
        <div className='h-16 flex md:flex-row 2xl:px-8 justify-between items-center md:items-center'>
            <div className='text-md md:text-xl font-bold'>
                {category} ⌁ {capitalizeFirstLetter(subcategory)}
            </div>
            <div className='toggles flex'>
                <button
                    onClick={showMenu}
                    className='dropdown bg-neutral-800 text-white h-10 w-20 md:w-[7.5rem] md:h-12 border-2 rounded-xl flex justify-center items-center'
                >
                    <label tabIndex={0} className='ml-1'>
                        Sort
                    </label>
                    <FaSort tabIndex={0} className='ml-1' />
                    <ul
                        style={{ display: displayMenuStyle }}
                        tabIndex={0}
                        className='dropdown-content bg-neutral-800 menu p-2 shadow rounded-box w-36 mt-40 mr-[25px] text-xs'
                    >
                        <li onClick={() => onSortChange('low')}>
                            <p>Price low to high</p>
                        </li>
                        <li onClick={() => onSortChange('high')}>
                            <p>Price high to low</p>
                        </li>
                    </ul>
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
