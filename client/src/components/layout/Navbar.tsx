import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 text-white flex gap-4">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        </nav>
    );
}
