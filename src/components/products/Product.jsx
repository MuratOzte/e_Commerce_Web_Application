import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import MediaCard from '../Home/MediaCards';
import ProductsComment from './ProductsComment';

import { useSelector } from 'react-redux';

const Product = (props) => {
    const isCommentModalOpen = useSelector(
        (state) => state.login.isCommentModalOpen
    );

    return (
        <>
            <MediaCard
                url={props.url}
                title={props.title}
                price={props.price}
                codeId={props.codeId}
            />
        </>
    );
};

export default Product;
