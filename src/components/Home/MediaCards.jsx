import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import './MediaCards.css';
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector, useDispatch } from 'react-redux';
import loginSlice from '../../store/loginSlice';

export default function MediaCard(props) {
    const isCommentModalOpen = useSelector(
        (state) => state.login.isCommentModalOpen
    );
    const dispatch = useDispatch();
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
                                dispatch(loginSlice.actions.toggleCommentModal(true))
                            }}
                        >
                            <CommentIcon>Contained</CommentIcon>
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
