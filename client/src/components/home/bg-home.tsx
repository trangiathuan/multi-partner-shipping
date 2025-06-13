import React from 'react'

import { Plus, ScanBarcode, Search } from "lucide-react";
import { motion } from "framer-motion";

export const BGhome = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Video Background */}
            <video
                className="absolute top-0 left-0 w-full h-full object-fill"
                autoPlay
                muted
                playsInline
                loop
            >
                <source src="/assets/background/bgtpost.mp4" type="video/mp4" />
            </video>

            {/* Overlay Content */}
            <div className="relative z-10 flex justify-center min-h-screen">
                <div className="mt-20 space-y-1">

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-4xl text-center font-bold"
                    >
                        HỆ THỐNG QUẢN LÝ <span className="text-red-600">VẬN CHUYỂN ĐA ĐỐI TÁC</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-xl text-center font-bold">
                        Nền tảng liên kết vận chuyển đa đối tác hàng đầu <span className="text-red-600">Việt Nam</span>
                    </motion.div>

                    <div className="text-center mt-20">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 2 }}
                            className="mb-2 text-lg font-semibold text-gray-400">Bạn đã sẵn sàng cho đơn hàng mới ?</motion.p>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="bg-red-600 text-white text-xl h-14 w-auto rounded-4xl p-3 px-6 flex mx-auto font-semibold hover:bg-red-700 cursor-pointer">
                            <Plus className="mr-2" size={30} /> Tạo đơn hàng
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="relative mt-5 flex justify-center">
                            <label className="border-2 border-red-400 outline-none h-13 w-72 p-3 rounded-full absolute"></label>
                            <input

                                type="text"
                                placeholder="Tra cứu đơn hàng "
                                className=" ms-2 outline-none h-13 w-52 p-3 rounded-full absolute font-semibold text-gray-600"
                            />
                            <button className="w-11 h-11 mt-[4px] rounded-full absolute z-10 -ms-56 ">
                                <ScanBarcode className="ms-1 text-gray-400" />
                            </button>
                            <button className="w-11 h-11 mt-[4px] bg-red-600 hover:bg-red-700 rounded-full absolute z-10 ms-[235px] cursor-pointer">
                                <Search className="ms-[10px] text-white" />
                            </button>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="mt-20 text-xl font-semibold"><span className="text-red-600">Lựa chọn đớn vị vận chuyển </span>với cước phí siêu rẻ</motion.p>

                    </div>
                </div>
            </div>
        </div>
    )
}
