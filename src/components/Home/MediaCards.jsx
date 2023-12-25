import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './MediaCards.css';

export default function MediaCard(props) {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img
                        src={props.url}
                        alt="Avatar"
                        style={{ width: '300px', height: '200px' }}
                    />
                </div>
                <div className="flip-card-back">
                    <h1>{props.title}</h1>
                    <h1>{props.price}</h1>
                </div>
            </div>
        </div>
    );
}
