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
    const orderId = useSelector((state) => state.login.orderIndex);
    //const productId = useSelector((state) => state.login.productId);
    const token = useSelector((state) => state.login.token);
    console.log(props.productId);

    //add product to cart

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

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img
                        src={props.url}
                        alt={props.title}
                        className='w-[300px] h-[200px]'
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
                                dispatch(loginSlice.actions.setproductId(1));
                                dispatch(
                                    loginSlice.actions.toggleCommentModal(true)
                                );
                            }}
                        >
                            <CommentIcon>Contained</CommentIcon>
                        </IconButton>
                        <IconButton
                            sx={{ color: 'white' }}
                            onClick={() => {
                                dispatch(
                                    loginSlice.actions.setproductId(
                                        props.productId
                                    )
                                );
                                fetchData();
                            }}
                        >
                            <AddShoppingCart />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
