'use client'
import { Image, MapPin, MapPinned, Phone, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const InforReceiver = () => {
    type Location = {
        code: number;
        name: string;
    };

    type District = Location & {
        wards: Location[];
    };

    type City = Location & {
        districts: District[];
    };

    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Location[]>([]);

    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [selectedWard, setSelectedWard] = useState<Location | null>(null);

    const [step, setStep] = useState<'city' | 'district' | 'ward'>('city');

    useEffect(() => {
        fetch('https://provinces.open-api.vn/api/?depth=1')
            .then(res => res.json())
            .then(setCities);
    }, []);

    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = parseInt(e.target.value);
        if (step === 'city') {
            const city = cities.find(c => c.code === code) || null;
            setSelectedCity(city);
            setSelectedDistrict(null);
            setSelectedWard(null);
            if (city) {
                const res = await fetch(`https://provinces.open-api.vn/api/p/${city.code}?depth=2`);
                const data = await res.json();
                setDistricts(data.districts);
                setStep('district');
            }
        } else if (step === 'district') {
            const district = districts.find(d => d.code === code) || null;
            setSelectedDistrict(district);
            setSelectedWard(null);
            if (district) {
                const res = await fetch(`https://provinces.open-api.vn/api/d/${district.code}?depth=2`);
                const data = await res.json();
                setWards(data.wards);
                setStep('ward');
            }
        } else if (step === 'ward') {
            const ward = wards.find(w => w.code === code) || null;
            setSelectedWard(ward);
        }
    };

    const getOptions = () => {
        if (step === 'city') return cities;
        if (step === 'district') return districts;
        if (step === 'ward') return wards;
        return [];
    };

    const getDisplayValue = () => {
        const parts = [];
        if (selectedCity) parts.push(selectedCity.name);
        if (selectedDistrict) parts.push(selectedDistrict.name);
        if (selectedWard) parts.push(selectedWard.name);
        return parts.length > 0 ? parts.join(' / ') : getPlaceholder();
    };

    const getPlaceholder = () => {
        if (step === 'city') return 'Chọn tỉnh/thành phố';
        if (step === 'district') return 'Chọn quận/huyện';
        if (step === 'ward') return 'Chọn phường/xã';
        return '';
    };


    return (
        <div className="rounded-3xl shadow-sm bg-white">
            {/* Header */}
            <div className="flex items-start justify-between mb-0 p-5 rounded-t-3xl bg-neutral-200">
                <div className="flex items-center space-x-3">
                    <div className="mt-1 p-2">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold mb-1">Địa chỉ lấy hàng</h2>
                        <p className="text-sm leading-relaxed">
                            Tân Phước, Tiền Giang, Xã Tân Hòa Thành, Huyện Tân Phước, Tỉnh Tiền Giang
                        </p>
                    </div>
                </div>
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white font-bold">
                    Thay đổi
                </button>
            </div>

            {/* Form */}
            <div className="p-5 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                    <User className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold">Thông tin người nhận</h3>
                </div>

                <div className="space-y-4">
                    {/* Số điện thoại & tên */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                            <label className="font-semibold">
                                Số điện thoại <span className="text-red-500">*</span>
                            </label>
                            <div className='relative'>
                                <input
                                    type="tel"
                                    placeholder="Số điện thoại"
                                    className="w-full bg-white border border-gray-300 rounded-2xl px-10 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                                <div className='absolute top-1/2 left-3 transform -translate-y-1/2'>
                                    <Phone className='w-4 h-4 text-gray-500' />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="font-semibold">
                                Tên người nhận <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tên người nhận"
                                    className="w-full bg-white border border-gray-300 rounded-2xl px-10 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <User className="w-4 h-4 text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Địa chỉ chi tiết */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">
                            Địa chỉ chi tiết <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Địa chỉ chi tiết"
                                className="w-full bg-white border border-gray-300 rounded-2xl px-10 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Chọn khu vực */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">
                            Khu vực <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                onChange={handleSelectChange}
                                value=""
                                className="w-full bg-white border border-gray-300 rounded-2xl px-10 py-3 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent cursor-pointer"
                            >
                                {/* option hiển thị giá trị đã chọn hoặc placeholder */}
                                <option value="" hidden>
                                    {getDisplayValue()}
                                </option>
                                {getOptions().map((item) => (
                                    <option key={item.code} value={item.code}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <div className='absolute top-1/2 left-3 -translate-y-2'>
                                <MapPinned className='w-4 h-4 text-gray-500' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InforReceiver;
