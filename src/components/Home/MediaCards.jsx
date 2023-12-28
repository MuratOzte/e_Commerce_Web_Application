import CommentIcon from '@mui/icons-material/Comment';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginSlice from '../../store/loginSlice';
import './MediaCards.css';
import { useEffect } from 'react';

export default function MediaCard(props) {
    const dispatch = useDispatch();
    const [orderId, setOrderId] = React.useState(null);
    const productId = useSelector((state) => state.login.productId);
    const isOrderExist = useSelector((state) => state.login.isOrderExist);
    const token = useSelector((state) => state.login.token);

    const baseUrl = 'http://localhost:3000/createOrder';

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/addProduct/${orderId}/${props.productId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Something went wrong !');
            }

            const fetchedData = await response.json();
            console.log(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const createOrder = async () => {
        try {
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
            dispatch(loginSlice.actions.OrderExist());
            setOrderId(fetchedData.order.order_id);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const orderButtonHandler = () => {
        console.log(orderId);
        dispatch(loginSlice.actions.setproductId(props.productId));
        if (!isOrderExist) {
            createOrder().then(() => {
                fetchData();
            });
        } else {
            fetchData();
        }
    };
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img
                        src={props.url}
                        alt={props.title}
                        style={{ width: '300px', height: '200px' }}
                    />
                    <Typography
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            padding: '8px',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        {props.price}
                    </Typography>
                </div>
                <div className="flip-card-back">
                    <div>
                        <h1>{props.title}</h1>
                        <h1>{props.price}</h1>
                        <IconButton
                            sx={{ color: 'white' }}
                            onClick={() => {
                                dispatch(
                                    loginSlice.actions.toggleCommentModal(true)
                                );
                                dispatch(
                                    loginSlice.actions.setproductId(
                                        props.productId
                                    )
                                );
                            }}
                        >
                            <CommentIcon>Contained</CommentIcon>
                        </IconButton>
                        <IconButton
                            sx={{ color: 'white' }}
                            onClick={orderButtonHandler}
                        >
                            <AddShoppingCart />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
