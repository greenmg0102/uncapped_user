import Payoneer from "./Payoneer"
import Paypal from "./Paypal"
import Stripe from "./Stripe"
import MasterCard from "./MasterCard"
import Visa from "./Visa"

export default function Classical({ price, premiumId, isMonthly, setPayway }: any) {


    const pirceIdObject: any = {
        6: "price_1PRNEjF9Pl7uN3pFZ4y6LlSI",
        66: "price_1PRNF6F9Pl7uN3pFRoC8YRm1",
        9: "price_1PRNFyF9Pl7uN3pFXRplfRb0",
        99: "price_1PRNGQF9Pl7uN3pFAtmkWIyc",
        29: "price_1PRNGvF9Pl7uN3pFCDW8bo0x",
        299: "price_1PRNHAF9Pl7uN3pFAG0UtR10"
    }

    return (
        <div className="p-4 py-1">
            <div className="p-4 py-1 flex justify-around items-center flex-wrap content-start">
                <Paypal
                    way={premiumId}
                    price={price}
                    isMonthly={isMonthly}
                    setPayway={(way: any) => setPayway(way)}
                />

                <Stripe
                    way={premiumId}
                    price={pirceIdObject[price]}
                    setPayway={(way: any) => setPayway(way)}
                />

                {/* <Payoneer
                    way={premiumId}
                    price={price}
                    setPayway={(way: any) => setPayway(way)}
                /> */}
                {/* <MasterCard
                    way={premiumId}
                    price={price}
                    setPayway={(way: any) => setPayway(way)}
                />
                <Visa
                    way={premiumId}
                    price={price}
                    setPayway={(way: any) => setPayway(way)}
                /> */}
            </div>
            {/* <div className="flex justify-center items-center">
                <button type="button" className="btn btn-outline-success px-12">Get Started</button>
            </div> */}
        </div>
    )
}