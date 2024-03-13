import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalCheckout from './PaypalCheckout'
import clsx from 'clsx'

export default function Paypal({ price, way, setPayway, isMonthly }: any) {

    const initialOptions = {
        // secret: "EA4r-5UjQIVtGbNw1Zu4WATEElTGmawWFPUGMvtqrS020Aw_IuSMyJu3a8F6n1o9S0Chnyl2tFccUDqu"
        clientId: "ATsSjYOpEJrIYO0MIpTpzxV1RNUXo5N2WiU5Op6cZOKHdP4Y7bMC8GWvk9-ghPfCX-aDq0aE2B6TYzT0",
        currency: "USD",
        intent: "capture",
    };

    return (
        <div className="w-1/3 p-4">
            <PayPalScriptProvider
                options={initialOptions}
            >
                <div className="w-full h-[300px] flex justify-center items-center mx-4">
                    <div
                        className={
                            clsx
                                (
                                    "relative w-[320px] h-[300px] flex justify-center items-center border border-gray-600 border-dashed rounded-[8px] p-4 transition-all hover:w-[350px] hover:h-[315px] hover:border-red-500 cursor-pointer",
                                    way === 'paypal' ? "w-[220px] h-[165px] border-red-500" : ""
                                )
                        }
                        onClick={() => setPayway("paypal")}
                        onMouseEnter={() => setPayway("paypal")}
                        onMouseLeave={() => setPayway("")}
                    >
                        <PaypalCheckout price={price} premiumId={way} isMonthly={isMonthly} />
                        <div className="absolute left-[24px] top-[24px]">
                            <img src="/assets/images/pokerImage/paypalMark.png" alt="img" className="w-[100px]" />
                        </div>
                        <p className={clsx(way === 'paypal' ? "absolute bottom-[24px] right-[12px] text-[32px] font-bold" : "hidden")}>{price} $</p>
                    </div>
                </div>
            </PayPalScriptProvider>
        </div>
    )
}