"use client";

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Truck } from 'lucide-react';
import { motion } from "framer-motion";
import { loginService } from '../../services/authServices'
import toast, { Toaster } from 'react-hot-toast';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 1) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        const response = await loginService(formData)

        if (response.EC === 0) {
            setTimeout(() => {
                toast.success(response.message);
                setIsLoading(false);
            }, 500);
        } else {
            setTimeout(() => {
                toast.error(response.message);
                setIsLoading(false);
            }, 500);
        }

    };
    const sentence = "Đăng nhập tài khoản của bạn";

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-400 via-rose-500 to-red-600 relative overflow-hidden text-white">

            <Toaster />
            {/* Login Form */}
            <div className="relative z-10 w-full max-w-md">
                {/* Glassmorphism card */}
                <div className="backdrop-blur-xl bg-white/20 rounded-3xl p-8 shadow-2xl border border-red-800/40 transform hover:scale-102 transition-all duration-300">
                    {/* Header */}

                    <div className="text-center mb-5 ">
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-18 h-18 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                            <Truck className="w-10 h-10 text-white" />
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            TPost, Xin Chào
                        </motion.h2>
                        <p className="text-white flex flex-wrap justify-center ">
                            {sentence.split(" ").map((word, wordIndex) => (
                                <span key={wordIndex} className="flex">
                                    {word.split("").map((char, charIndex) => (
                                        <motion.span
                                            key={charIndex}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: wordIndex * 0.3 + charIndex * 0.01, // mỗi chữ delay tăng dần
                                            }}
                                            className="inline-block"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                    &nbsp;
                                </span>
                            ))}
                        </p>
                    </div>



                    {/* Form */}
                    <div className="space-y-6">
                        {/* Email Field */}
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 bg-white/20 border ${errors.email ? 'border-red-400' : 'border-white/20'
                                        } rounded-xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent backdrop-blur-sm transition-all duration-300`}
                                    placeholder="Nhập email"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm animate-pulse">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-3 py-3 bg-white/10 border ${errors.password ? 'border-red-400' : 'border-white/20'
                                        } rounded-xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-red-600  focus:border-transparent backdrop-blur-sm transition-all duration-300`}
                                    placeholder="Nhập mật khẩu"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center  hover:text-white transition-colors duration-200"
                                >
                                    {/* {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )} */}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm animate-pulse">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-400 focus:ring-2"
                                />
                                <span className="ml-2 text-sm">Ghi nhớ đăng nhập</span>
                            </label>
                            <button className="text-sm text-red-900 hover:text-red-600 transition-colors duration-200">
                                Quên mật khẩu?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full relative overflow-hidden bg-gradient-to-r from-red-600/15 via-red-600 to-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Đang đăng nhập...
                                    </>
                                ) : (
                                    <>
                                        Đăng nhập
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-200/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>

                    {/* Divider */}
                    {/* <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-white/20"></div>
                        <span className="px-4 text-sm text-gray-400">hoặc</span>
                        <div className="flex-1 border-t border-white/20"></div>
                    </div> */}

                    {/* Social Login */}
                    {/* <div className="space-y-3">
                        <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl border border-white/20 transition-all duration-300 backdrop-blur-sm">
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Đăng nhập với Google
                            </div>
                        </button>
                    </div> */}

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <p className="">
                            Chưa có tài khoản?{' '}
                            <button className=" text-red-800 hover:text-red-600 font-medium transition-colors duration-200">
                                Đăng ký ngay
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm">
                        © 2025 Đơn vị vận chuyển đa tối tác TPost
                    </p>
                </div>
            </div>
        </div>
    );
}