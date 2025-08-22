import { Banknote } from "lucide-react";

const Freight = () => {
    return (
        <div className="rounded-3xl border border-neutral-200 w-full">
            <div className="flex items-center rounded-t-3xl bg-neutral-200 p-5 font-bold space-x-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                    <Banknote className="text-white w-5 h-5" />
                </div>
                <div>
                    Cước phí
                </div>
            </div>
            <div className="p-5 font-semibold space-y-3">
                <div className="flex justify-between">
                    <label htmlFor="">Giá trị hàng hóa</label>
                    <p>0đ</p>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="">Khối lượng hàng hóa</label>
                    <p>500 gr</p>
                </div>

                <hr className="text-neutral-200" />

                <div className="flex justify-between">
                    <label htmlFor="">Phí giao hàng</label>
                    <p>0đ</p>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="">Phí thu hộ</label>
                    <p>0đ</p>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="">Phí dịch vụ</label>
                    <p>0đ</p>
                </div>
                {/* <div className="flex justify-between">
                    <label htmlFor="">abc</label>
                    <p>0đ</p>
                </div> */}

                <hr className="text-neutral-200" />

                <div className="flex justify-between">
                    <label htmlFor="">Tổng phí vận chuyển</label>
                    <p>0đ</p>
                </div>

                <hr className="text-neutral-200" />

                <div className="flex justify-between">
                    <label htmlFor="">Tiền thu hộ</label>
                    <p>0đ</p>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="">Tiền thu người nhận</label>
                    <p>0đ</p>
                </div>
            </div>
        </div >

    )
}
export default Freight;