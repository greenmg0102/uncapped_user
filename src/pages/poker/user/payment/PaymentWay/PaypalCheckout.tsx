import { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { accessTokenDecode } from '../../../../../utils/middlewareFunction/accessTokenDecode';
import { payLogCreate } from '../../../../../utils/payment/crypto';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content';

export default function PaypalCheckout({ premiumId, price, isMonthly }: any) {

    const navigate = useNavigate();
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const MySwal = withReactContent(Swal);

    const onCurrencyChange = ({ target: { value } }: any): void => {

        console.log("onCurrencyChange", value);

        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
                // intent: "subscription",
            },
        });
    }

    const onCreateOrder = (data: any, actions: any): Promise<string> => {

        console.log("onCreateOrder", data, actions);

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: price.toString(),
                    },
                },
            ],
        });
    };

    const onApproveOrder = async (data: any, actions: any): Promise<void> => {

        console.log("onApproveOrder", data, actions);

        return actions.order.capture().then(async (details: any) => {
            const name: string = details.payer.name.given_name;

            const accessToken = localStorage.getItem('accessToken');

            let paylogData = {
                profilesId: accessTokenDecode(accessToken),
                price: price,
                currentType: 0,
                period: isMonthly === true ? 1 : 0,
                premiumId: premiumId,
                invoice: { ...data }
            }

            alert(`Transaction completed by ${name}`);

            let resultInvoice = await payLogCreate(paylogData)


            if (resultInvoice === true) {
                MySwal.fire({
                    title: 'Registered correctly.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: 'color-info',
                    },
                });
                navigate("/users/profile");
            } else {
                MySwal.fire({
                    title: 'There was a problem.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: 'color-danger',
                    },
                });
            }

        });
    }

    return (
        <div>
            {
                isPending ? <p>LOADING...</p> : (
                    <>
                        <select
                            id="ctnSelect1"
                            className="form-select text-white-dark mb-4"
                            required
                            value={currency}
                            onChange={onCurrencyChange}
                        >
                            <option value="USD">💵 USD</option>
                            <option value="EUR">💶 Euro</option>
                        </select>

                        <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => onCreateOrder(data, actions)}
                            onApprove={(data, actions) => onApproveOrder(data, actions)}
                        />
                    </>
                )
            }
        </div>
    )
}