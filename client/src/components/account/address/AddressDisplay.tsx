import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateAddressMutation } from '../../../api/apiSlice';
import type { Address } from '../../../types/address';
import { STATES } from '../../checkout/states';
import Map from './Map';

type AddressDisplayProps = {
    address: Address | null;
    latitude?: number;
    longitude?: number;
};

const AddressDisplay = ({
    address,
    latitude,
    longitude,
}: AddressDisplayProps) => {
    const [updateUserAddress, { isLoading }] = useUpdateAddressMutation();

    const [formData, setFormData] = useState<Address>({
        street: '',
        city: '',
        zipCode: '',
        state: '',
    });

    const { street, city, zipCode } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const saveAddress = async () => {
        await updateUserAddress(formData).unwrap();
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(formData).includes('')) {
            toast.error('Please enter a valid address');
            return;
        }
        try {
            await saveAddress();
            toast.success('Address updated');
        } catch {
            toast.error('Unable to save address. Please try again.');
        }
    };

    return (
        <>
            {address ? (
                <div className='mt-5 flex flex-col md:flex-row md:justify-between'>
                    <div className='w-full md:w-1/2 flex flex-col'>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl'>Your Address</h1>
                            <div>
                                <h1 className='text-sm text-neutral-500 my-2'>
                                    Current Saved Address
                                </h1>
                            </div>
                            <div>
                                <h1>{address.street}</h1>
                                <h1>
                                    {address?.city}, {address?.state}{' '}
                                    {address.zipCode}
                                </h1>
                            </div>
                        </div>
                        <div className='flex flex-col mt-5'>
                            <h1 className='text-sm text-neutral-500 my-2'>
                                Update Address
                            </h1>
                            <form
                                action=''
                                className='w-full  text-[#A4ACB7]'
                                onSubmit={onSubmit}
                            >
                                <div className='mb-2 w-[210px]'>
                                    <input
                                        type='text'
                                        className='w-full border-2 rounded-md pl-1'
                                        placeholder='Street'
                                        value={street}
                                        name='street'
                                        onChange={onChange}
                                    />
                                </div>
                                <div className='mb-2 w-[210px]'>
                                    <input
                                        type='text'
                                        className='w-full border-2 rounded-md pl-1'
                                        placeholder='City'
                                        value={city}
                                        name='city'
                                        onChange={onChange}
                                    />
                                </div>
                                <div className='mb-2 w-[210px] flex justify-between'>
                                    <select
                                        className='w-[60%] border-2 rounded-md bottom-2 px-1'
                                        name='state'
                                        value={formData.state}
                                        onChange={onChange}
                                    >
                                        <option disabled value=''>
                                            State
                                        </option>
                                        {STATES.map((state) => (
                                            <option value={state} key={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type='text'
                                        className='w-[38%] border-2 rounded-md pl-1'
                                        placeholder='Zip'
                                        value={zipCode}
                                        name='zipCode'
                                        onChange={onChange}
                                    />
                                </div>
                                <div className='flex w-[210px] justify-start mt-4'>
                                    <button
                                        type='submit'
                                        className='btn btn-sm'
                                        disabled={isLoading}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='w-full mt-3 md:w-1/2 flex justify-center'>
                        <Map latitude={latitude} longitude={longitude} />
                    </div>
                </div>
            ) : (
                <div className='mt-5 flex flex-col md:flex-row md:justify-between '>
                    <div className='w-full md:w-1/2 flex flex-col'>
                        <h1 className='text-2xl'>Your Address</h1>
                        <h1 className='text-sm text-neutral-500 my-2'>
                            You dont have an address saved currently
                        </h1>
                        <div className='flex flex-col mt-3'>
                            <h1 className='text-md text-neutral-500 my-2'>
                                Add an address
                            </h1>
                            <form
                                action=''
                                className='w-full  text-[#A4ACB7]'
                                onSubmit={onSubmit}
                            >
                                <div className='mb-2 w-[210px]'>
                                    <input
                                        type='text'
                                        className='w-full border-2 rounded-md pl-1'
                                        placeholder='Street'
                                        value={street}
                                        name='street'
                                        onChange={onChange}
                                    />
                                </div>
                                <div className='mb-2 w-[210px]'>
                                    <input
                                        type='text'
                                        className='w-full border-2 rounded-md pl-1'
                                        placeholder='City'
                                        value={city}
                                        name='city'
                                        onChange={onChange}
                                    />
                                </div>
                                <div className='mb-2 w-[210px] flex justify-between'>
                                    <select
                                        className='w-[60%] border-2 rounded-md bottom-2 px-1'
                                        name='state'
                                        value={formData.state}
                                        onChange={onChange}
                                    >
                                        <option disabled value=''>
                                            State
                                        </option>
                                        {STATES.map((state) => (
                                            <option value={state} key={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type='text'
                                        className='w-[38%] border-2 rounded-md pl-1'
                                        placeholder='Zip'
                                        value={zipCode}
                                        name='zipCode'
                                        onChange={onChange}
                                    />
                                </div>
                                <div className='flex w-[210px] justify-start mt-4'>
                                    <button
                                        type='submit'
                                        className='btn btn-sm'
                                        disabled={isLoading}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddressDisplay;
