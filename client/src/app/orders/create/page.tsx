import FeePayer from '@/components/orders/create/feePayer'
import Freight from '@/components/orders/create/freight'
import InforReceiver from '@/components/orders/create/inforReceiver'
import ShippingDetails from '@/components/orders/create/shippingDetails'
import { Box } from 'lucide-react'
import React from 'react'

const createOrder = () => {
    return (
        <div className='mt-14 p-7 bg-gray-100'>
            <div className=' mt-1 rounded-3xl p-10 shadow-lg bg-gray-50'>
                <p className='text-2xl mb-4 font-bold flex items-center -mt-3'>Tạo đơn hàng <span className='ms-2 translate-y-0.5'><Box className='w-7 h-7 animate-bounce' /></span></p>
                <div className='grid grid-cols-3 min-h-screen gap-8'>
                    <div className='col-span-2 space-y-5'>
                        <div>
                            <InforReceiver />
                        </div>

                        <div>
                            <ShippingDetails />
                        </div>
                    </div>
                    <div className='col-span-1 space-y-5'>
                        <div>
                            <FeePayer />
                        </div>
                        <div>
                            <Freight />
                        </div>
                        <div>
                            Button tạo đơn
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default createOrder