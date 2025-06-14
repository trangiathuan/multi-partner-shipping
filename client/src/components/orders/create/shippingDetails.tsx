import React from 'react'
import { Package, DollarSign, Weight, Banknote, X } from 'lucide-react';

const ShippingDetails = () => {
    return (
        <div>
            <div className='rounded-3xl bg-amber-200 p-5'>
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                            <Package className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-gray-800 font-medium text-lg">Chi tiết hàng gửi</h2>
                    </div>

                    {/* Radio buttons */}
                    <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-gray-800">Nhập liệu thủ công</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                            <span className="text-gray-800">Chọn từ danh sách</span>
                        </label>
                    </div>
                </div>

                {/* Form Grid */}
                <div className='grid grid-cols-2 gap-4 mb-6'>
                    <div className="space-y-4">
                        <div className='flex flex-col space-y-2'>
                            <label className="text-gray-700 text-sm">
                                Tên sản phẩm <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    className='w-full bg-gray-700 border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    placeholder='Tên sản phẩm'
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <Package className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label className="text-gray-700 text-sm flex items-center space-x-1">
                                <span>Giá trị</span>
                                <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">i</span>
                                </div>
                            </label>
                            <div className="relative">
                                <input
                                    className='w-full bg-gray-700 border border-gray-600 rounded-lg px-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
                            <label className="text-gray-700 text-sm">
                                Khối lượng <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    className='w-full bg-blue-600 border border-blue-500 rounded-lg px-10 pr-16 py-3 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'
                                    placeholder='500'
                                    defaultValue="500"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <Weight className="w-4 h-4 text-white" />
                                </div>
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                    <span className="text-white text-sm">gr</span>
                                </div>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <X className="w-4 h-4 text-white cursor-pointer" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label className="text-gray-700 text-sm">
                                Thu hộ <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    className='w-full bg-gray-700 border border-gray-600 rounded-lg px-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
                <div>
                    <div className='flex justify-between items-center mb-4'>
                        <p className="text-gray-800">
                            Kích thước <span className="text-red-500">(Không bắt buộc)</span>
                        </p>
                        <div className="flex items-center space-x-1">
                            <p className="text-gray-800">
                                Khối lượng quy đổi: <span className="font-medium">0 gr</span>
                            </p>
                            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">i</span>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='flex flex-col space-y-2'>
                            <label className="text-gray-700 text-sm">Chiều dài</label>
                            <div className="relative">
                                <input
                                    className='w-full bg-blue-600 border border-blue-500 rounded-lg px-4 pr-16 py-3 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'
                                    placeholder='0'
                                    defaultValue="0"
                                />
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                    <span className="text-white text-sm">cm</span>
                                </div>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <X className="w-4 h-4 text-white cursor-pointer" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label className="text-gray-700 text-sm">Chiều rộng</label>
                            <div className="relative">
                                <input
                                    className='w-full bg-blue-600 border border-blue-500 rounded-lg px-4 pr-16 py-3 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'
                                    placeholder='0'
                                    defaultValue="0"
                                />
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                    <span className="text-white text-sm">cm</span>
                                </div>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <X className="w-4 h-4 text-white cursor-pointer" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label className="text-gray-700 text-sm">Chiều cao</label>
                            <div className="relative">
                                <input
                                    className='w-full bg-blue-600 border border-blue-500 rounded-lg px-4 pr-16 py-3 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'
                                    placeholder='0'
                                    defaultValue="0"
                                />
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                    <span className="text-white text-sm">cm</span>
                                </div>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <X className="w-4 h-4 text-white cursor-pointer" />
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