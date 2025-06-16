import React from 'react'
import { Package, DollarSign, Weight, Banknote, X } from 'lucide-react';

const ShippingDetails = () => {
    return (
        <div>
            <div className='rounded-3xl bg-white shadow-sm border border-neutral-200'>
                {/* Header */}
                <div className="bg-neutral-200 rounded-t-3xl p-5">
                    <div className="flex items-center space-x-2 p-2">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                            <Package className="w-4 h-4 text-white" />
                        </div>
                        <h2 className=" font-bold ms-2">Chi tiết hàng gửi</h2>
                    </div>
                </div>

                {/* Form Grid */}
                <div className='grid grid-cols-2 gap-4 p-5'>
                    <div className="space-y-4">
                        <div className='flex flex-col space-y-2'>
                            <label className="font-semibold">
                                Tên sản phẩm <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    className='w-full border border-gray-300 rounded-2xl px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                                    placeholder='Tên sản phẩm'
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <Package className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label className="font-semibold">
                                Giá trị
                            </label>
                            <div className="relative">
                                <input
                                    className='w-full border border-gray-300 rounded-2xl px-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                                    placeholder='Giá trị'
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <DollarSign className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <span className="text-gray-400 text-sm">đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className='flex flex-col space-y-2'>
                            <label className="font-semibold">
                                Khối lượng <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    className='w-full border border-gray-300 rounded-2xl px-10 pr-16 py-3 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                                    placeholder='500'
                                    defaultValue="500"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <Weight className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                    <span className="text-gray-400 text-sm">gr</span>
                                </div>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <X className="w-4 h-4 text-gray-400 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label className="font-semibold">
                                Thu hộ <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    className='w-full border border-gray-300 rounded-2xl px-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                                    placeholder='Thu hộ'
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <Banknote className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <span className="text-gray-400 text-sm">đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dimensions Section */}
                <div className='p-5 pt-2'>
                    <div className='flex justify-between items-center mb-2 '>
                        <p className="font-semibold">
                            Kích thước <span className="text-red-500 font-normal">(Không bắt buộc)</span>
                        </p>
                        <div className="flex items-center space-x-1">
                            <p className="font-semibold">
                                Khối lượng quy đổi: <span className="font-normal">0 gr</span>
                            </p>
                            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">i</span>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='flex flex-col space-y-2'>
                            <label className="font-semibold">Chiều dài</label>
                            <div className="relative">
                                <input
                                    className='w-full border border-gray-300 rounded-2xl px-4 pr-16 py-3 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                                    placeholder='0'
                                    defaultValue="0"
                                />
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                    <span className="text-sm text-gray-400">cm</span>
                                </div>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <X className="w-4 h-4 text-white cursor-pointer" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label className="font-semibold">Chiều rộng</label>
                            <div className="relative">
                                <input
                                    className='w-full border border-gray-300 rounded-2xl px-4 pr-16 py-3 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                                    placeholder='0'
                                    defaultValue="0"
                                />
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                    <span className=" text-sm text-gray-400">cm</span>
                                </div>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <X className="w-4 h-4  cursor-pointer" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label className="font-semibold">Chiều cao</label>
                            <div className="relative">
                                <input
                                    className='w-full border border-gray-300 rounded-2xl px-4 pr-16 py-3  placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                                    placeholder='0'
                                    defaultValue="0"
                                />
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                    <span className="text-sm text-gray-400">cm</span>
                                </div>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <X className="w-4 h-4 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShippingDetails