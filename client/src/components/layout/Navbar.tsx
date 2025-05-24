'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSidebar } from '@/context/SidebarContext';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { toggleSidebar } = useSidebar();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gray-900 text-white fixed w-full z-10 top-0 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Image
                            src="/vercel.svg"
                            alt="Logo"
                            width={150}
                            height={50}
                            className="h-8 w-auto"
                        />
                        <span className="ml-3 text-xl font-semibold">Quản lý Vận chuyển</span>
                    </div>

                    {/* Menu Items */}
                    <div className="hidden md:flex space-x-8">
                        {/* <Link href="/orders" className="flex items-center space-x-2 hover:text-blue-400 transition">
                            <i className="fas fa-box"></i>
                            <span>Đơn hàng</span>
                        </Link> */}

                    </div>

                    {/* Search and Notifications */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm đơn hàng..."
                                className="bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                        </div>
                        <button className="relative">
                            <i className="fas fa-bell text-xl"></i>
                            <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                3
                            </span>
                        </button>
                        <div className="relative">
                            <Image
                                src="https://via.placeholder.com/32"
                                alt="User"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                        </div>
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={toggleSidebar} className="text-white focus:outline-none">
                            <i className="fas fa-bars text-2xl"></i>
                        </button>
                        <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                            <i className="fas fa-ellipsis-v text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/orders"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-blue-400"
                        >
                            <i className="fas fa-box mr-2"></i>Đơn hàng
                        </Link>
                        <Link
                            href="/partners"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-blue-400"
                        >
                            <i className="fas fa-truck mr-2"></i>Đối tác
                        </Link>
                        <Link
                            href="/tracking"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-blue-400"
                        >
                            <i className="fas fa-map-marker-alt mr-2"></i>Theo dõi
                        </Link>
                        <Link
                            href="/reports"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-blue-400"
                        >
                            <i className="fas fa-chart-bar mr-2"></i>Báo cáo
                        </Link>
                        <Link
                            href="/settings"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-blue-400"
                        >
                            <i className="fas fa-cog mr-2"></i>Cài đặt
                        </Link>
                        <div className="px-3 py-2">
                            <input
                                type="text"
                                placeholder="Tìm kiếm đơn hàng..."
                                className="w-full bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;