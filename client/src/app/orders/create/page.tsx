import InforReceiver from '@/components/orders/create/inforReceiver'
import ShippingDetails from '@/components/orders/create/shippingDetails'
import React from 'react'

const createOrder = () => {
    return (
        <div className='mt-14 p-12 bg-gray-100'>
            <div className=' mt-1 rounded-3xl p-10 shadow-lg bg-gray-50'>
                <p className='text-3xl mb-4 font-semibold'>Tạo đơn hàng</p>
                <div className='grid grid-cols-3 min-h-screen gap-8'>
                    <div className='col-span-2 space-y-5'>
                        <div>
                            <InforReceiver />
                        </div>

                        <div>
                            <ShippingDetails />
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div>
                            Người trả phí
                        </div>
                        <div>
                            Cước phí
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