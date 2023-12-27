import { useState } from 'react';
import { Paper, Typography, IconButton, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import loginSlice from '../../store/loginSlice';

const CommentBox = (props) => {
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();
    const commentId = useSelector((state) => state.login.commentId);

    const favoriteChangeHandler = () => {
        dispatch(loginSlice.actions.setCommentId(props.commentId));
        setIsLiked((prev) => !prev);
    };

    const baseUrl = 'http://localhost:3000/auth/like/';

    return (
        <Paper
            elevation={8}
            sx={{
                display: 'flex',
                alignItems: 'center',
                pl: 5,
                pr: 8,
                py: 1,
                mt: 5,
                ml: 1,
            }}
        >
            <Box fullwidth display={'flex'} alignItems={'center'}>
                <Avatar sx={{ bgcolor: 'royalblue', mr: 3 }}>M</Avatar>
                <Typography>{props.comment}</Typography>
                {!isLiked && (
                    <IconButton
                        onClick={favoriteChangeHandler}
                        style={{ position: 'absolute', right: 30 }}
                    >
                        <FavoriteBorder />
                    </IconButton>
                )}
                {isLiked && (
                    <IconButton
                        onClick={favoriteChangeHandler}
                        color="error"
                        style={{ position: 'absolute', right: 30 }}
                    >
                        <Favorite />
                    </IconButton>
                )}
            </Box>
        </Paper>
    );
};

export default CommentBox;
