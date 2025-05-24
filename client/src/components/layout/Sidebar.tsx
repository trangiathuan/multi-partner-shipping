'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';
import { Box, ChartBar, House, MapPin, Menu, Settings, Truck } from 'lucide-react';

const Sidebar = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const pathname = usePathname();

    const menuItems = [
        { name: 'Trang chủ', href: '/', icon: <House /> },
        { name: 'Đơn hàng', href: '/orders', icon: <Box /> },
        { name: 'Đối tác', href: '/partners', icon: <Truck /> },
        { name: 'Theo dõi', href: '/tracking', icon: <MapPin /> },
        { name: 'Báo cáo', href: '/reports', icon: <ChartBar /> },
        { name: 'Cài đặt', href: '/settings', icon: <Settings /> },
    ];

    return (
        <div
            className={`bg-gray-800 text-white h-screen mt-16 top-16 left-0 ${isSidebarOpen ? 'w-44' : 'w-18'}`}
        >
            {/* Toggle Button */}
            <div className="flex p-4 ps-5 space-x-4">
                <button onClick={toggleSidebar} className="text-white focus:outline-none">
                    <Menu />
                </button>
                {isSidebarOpen && (<p>Menu</p>)}

            </div>

            {/* Menu Items */}
            <div className="flex flex-col space-y-2 px-3 ">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 hover:text-blue-400 transition ${pathname === item.href ? 'bg-gray-700 text-blue-400' : ''}`}
                    >
                        <span>{item.icon}</span>
                        {isSidebarOpen && <span className="text-base font-medium ">{item.name}</span>}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;