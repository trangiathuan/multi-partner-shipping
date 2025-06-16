'use client'
import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Danh sách các trang KHÔNG cần Navbar + Sidebar
  const authPages = ['/login', '/register', '/forgot-password'];
  const isAuthPage = authPages.includes(pathname);

  return (
    <html lang="vi">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          title="Hệ Thống Vận Chuyển Đa Đối Tác"
        />
        <title>Hệ Thống Vận Chuyển Đa Đối Tác</title>
      </head>
      <body>
        {isAuthPage ? (
          // Layout cho auth pages - không có Navbar/Sidebar
          <div className="min-h-screen">
            {children}
          </div>
        ) : (
          // Layout cho các trang khác - có Navbar/Sidebar
          <SidebarProvider>
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="min-h-screen w-full">
                {children}
              </main>
            </div>
          </SidebarProvider>
        )}
      </body>
    </html>
  );
}