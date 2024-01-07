//packages
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Divider,
} from '@mui/material';
//hooks
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';

//functions
import { useEffect, useState } from 'react';
import loginSlice from '../../store/loginSlice';

const OrdersModal = (props) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

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
    const deleteProductFromOrderUrl = `http://localhost:3000/deleteProduct/${orderId}/`;
    const deleteOrderUrl = `http://localhost:3000/deleteOrder/${orderId}`;

    const createOrder = async () => {
        try {
            const response = await fetch(baseUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Something went wrong !');
            }
            const result = await response.json();
            setOrderId(result.order.order_id);
            dispatch(loginSlice.actions.setOrderIndex(result.order.order_id));
            return result;
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

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

    const deleteProductFromOrder = async (productId) => {
        try {
            console.log(productId);
            const response = await fetch(
                deleteProductFromOrderUrl + productId,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong !');
            }
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const deleteOrder = async () => {
        try {
            const response = await fetch(deleteOrderUrl, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Something went wrong !');
            }
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    return (
        <Dialog open={isOpenModal} onClose={closeBtnHandler}>
            <DialogTitle>Sepet</DialogTitle>
            <DialogContent>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-beetween',
                        marginRight: 50,
                        marginBottom: 10,
                    }}
                >
                    <DialogContentText>Ürün İsmi</DialogContentText>
                    <DialogContentText>Ürün Fiyati</DialogContentText>
                    <DialogContentText>Ürün Adedi</DialogContentText>
                </div>
                <div
                    style={{
                        width: 'auto',
                        height: '1px',
                        backgroundColor: 'black',
                        marginBottom: 10,
                    }}
                ></div>
                {!orderArray ? (
                    <p>Sepet Boş</p>
                ) : (
                    orderArray.map((e) => (
                        <DialogContentText
                            key={e.price}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 5,
                            }}
                        >
                            <Typography>{e.product_name}</Typography>
                            <Typography>{e.price}</Typography>
                            <Typography>{e.quantity}</Typography>
                            <Button
                                sx={{ marginBottom: 5 }}
                                onClick={() => {
                                    deleteProductFromOrder(e.product_id).then(
                                        setTimeout(() => {
                                            orderDetails();
                                        }, 20)
                                    );

                                    console.log(
                                        'deneme calisiyor ' + e.product_id
                                    );
                                }}
                            >
                                <DeleteForeverIcon></DeleteForeverIcon>
                            </Button>
                        </DialogContentText>
                    ))
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        deleteOrder().then(() => {
                            setTimeout(() => {
                                orderDetails();
                                createOrder();
                            }, 50);
                        });
                    }}
                >
                    Sepeti Temizle
                </Button>
                <Button onClick={orderDetails}>Sepet Detayini Yukle</Button>
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
