//packages
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@mui/material';
//hooks
import { useDispatch, useSelector } from 'react-redux';

//functions
import loginSlice from '../../store/loginSlice';
import { useEffect, useState } from 'react';

const OrdersModal = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.login.token);

    //modal close function
    const closeBtnHandler = () => {
        dispatch(loginSlice.actions.toggleModalOpen(false));
    };
    const isOpenModal = useSelector((state) => state.login.isModalOpen);
    const isOrderExist = useSelector((state) => state.login.isOrderExist);
    const [orderId, setOrderId] = useState(null);
    const [orderArray, setOrderArray] = useState(null);

    const baseUrl = 'http://localhost:3000/createOrder';
    const orderDetailsUrl = `http://localhost:3000/orderDetails/${orderId}`;

    useEffect(() => {
        const fetchData = async () => {
            if (!isOpenModal || isOrderExist) {
                return;
            }
            try {
                dispatch(loginSlice.actions.OrderExist());
                const response = await fetch(baseUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'POST',
                });

                if (!response.ok) {
                    throw new Error('Something Went Wrong !');
                }

                const fetchedData = await response.json();
                setOrderId(fetchedData.order.order_id);
                console.log('merhaba');
                console.log(fetchedData);
                dispatch(
                    loginSlice.actions.setOrderIndex(fetchedData.order.order_id)
                );
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, [baseUrl, token, isOpenModal]);

    const orderDetails = async () => {
        try {
            const response = await fetch(orderDetailsUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Something went wrong !');
            }

            const result = await response.json();
            setOrderArray(result.orderDetails);
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        if (orderId) {
            orderDetails();
        }
    }, [isOpenModal]);

    return (
        <Dialog open={isOpenModal} onClose={closeBtnHandler}>
            <DialogTitle>Sepet</DialogTitle>
            <DialogContent>
                {!orderArray ? (
                    <p>Loading...</p>
                ) : (
                    orderArray.map((e) => (
                        <DialogContentText
                            key={e.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 5,
                            }}
                        >
                            <Typography>{e.product_name}</Typography>
                            <Typography>{e.price}</Typography>
                            <Typography>{e.quantity}</Typography>
                        </DialogContentText>
                    ))
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={orderDetails}>asdasd</Button>
                <Button
                    onClick={() => {
                        closeBtnHandler();
                    }}
                >
                    İptal
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrdersModal;
