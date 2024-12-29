import { useState } from 'react';
import { useSelector } from 'react-redux';

const Payment = () => {
    // Sepet verisi ve diğer bilgileri tutan state
    const [paymentInfo, setPaymentInfo] = useState({
        selectedCarrier: null,
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const order = useSelector((state) => state.login.order); // Sepetteki ürünler

    const carriers = [
        {
            id: 'yurtici',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0P-7wxuvSLjT52s79GPYzTS7DjUjW48F6w&s',
            alt: 'Yurtiçi Kargo',
        },
        {
            id: 'ptt',
            src: 'https://www.ofispaneli.com/sites/default/files/styles/large/public/2021-01/ptt-kargo-300x300.png?itok=eVBSPh0f',
            alt: 'PTT Kargo',
        },
        {
            id: 'aras',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgVqc9gI1O42yX9OZA50vDalN9MaFONRhBvA&s',
            alt: 'Aras Kargo',
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCarrierSelect = (carrierId) => {
        setPaymentInfo((prev) => ({
            ...prev,
            selectedCarrier: carrierId,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(paymentInfo);
        try {
            const response = await fetch('http://localhost:3000/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentInfo),
            });

            console.log(response);
        
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="w-full flex justify-center flex-col items-center mx-auto mt-10">
            <h1 className="mb-4 text-xl font-bold">Payment</h1>

            <div className="mb-4 flex gap-5 flex-col">
                {order.map((e) => (
                    <div
                        key={e.product_name}
                        className="flex w-full gap-20 bg-gray-400 text-gray-900 px-4 py-2 rounded-md shadow-md"
                    >
                        <p>Ürün ismi: {e.product_name}</p>
                        <p>Fiyat: {e.price}₺</p>
                        <p>Miktar: {e.quantity}</p>
                    </div>
                ))}
            </div>

            <div className="w-1/3">
                <textarea
                    name="address"
                    value={paymentInfo.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full h-24 p-2 border border-gray-300 rounded-lg mb-4"
                ></textarea>
                <h1 className="text-center mb-4 text-xl font-bold">
                    Kargo Şirketini Seçiniz
                </h1>
                <div className="flex justify-between mx-4 mb-8">
                    {carriers.map((carrier) => (
                        <img
                            key={carrier.id}
                            src={carrier.src}
                            alt={carrier.alt}
                            onClick={() => handleCarrierSelect(carrier.id)}
                            className={`w-1/5 rounded-full cursor-pointer ${
                                paymentInfo.selectedCarrier === carrier.id
                                    ? 'ring-green-500 ring-8'
                                    : ''
                            }`}
                        />
                    ))}
                </div>

                <h1 className="text-center mb-4 text-xl font-bold">
                    Kart Bilgileri
                </h1>
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handleChange}
                        placeholder="Kart Numarası"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={handleChange}
                            placeholder="Son Kullanma Tarihi (MM/YY)"
                            className="w-1/2 p-2 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handleChange}
                            placeholder="CVV"
                            className="w-1/2 p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-16"
                    >
                        Ödeme Yap
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
