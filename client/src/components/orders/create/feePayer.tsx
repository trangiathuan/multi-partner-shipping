'use client'
import { Banknote, HandCoins } from "lucide-react";
import { useState } from "react";

const FeePayer = () => {
    const [payer, setPayer] = useState<"sender" | "receiver" | null>(null);

    return (
        <div className="rounded-3xl border border-neutral-200 w-full">
            <div className="flex items-center rounded-t-3xl bg-neutral-200 p-5 font-bold space-x-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                    <Banknote className="text-white w-5 h-5" />
                </div>
                <div>
                    Người trả phí
                </div>
            </div>
            <div className="p-5 w-full">
                <div className="grid grid-cols-2">
                    <div className="space-x-3 flex items-center">
                        <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={payer === "sender"}
                            onChange={() => setPayer(payer === "sender" ? null : "sender")}
                        />
                        <label className="font-semibold">Người gửi</label>
                    </div>
                    <div className="space-x-3 flex items-center">
                        <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={payer === "receiver"}
                            onChange={() => setPayer(payer === "receiver" ? null : "receiver")}
                        />
                        <label className="font-semibold">Người nhận</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeePayer;
