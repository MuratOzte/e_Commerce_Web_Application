//packages
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
//hooks
import { useDispatch, useSelector } from 'react-redux';

//functions
import { useEffect, useState } from 'react';
import loginSlice from '../../store/loginSlice';
import CommentBox from './CommentBox';
import { Send } from '@mui/icons-material';

const ProductComments = (props) => {
    const dispatch = useDispatch();
    //modal close function
    const isCommentModalOpen = useSelector(
        (state) => state.login.isCommentModalOpen
    );
    const token = useSelector((state) => state.login.token);
    const id = useSelector((state) => state.login.productId);
    const baseUrl = 'http://localhost:3000/productComments/';

    const [comments, setComments] = useState(null);

    const createCommentURL =
        'http://localhost:3000/createProductComment/:productId';

    const closeBtnHandler = () => {
        dispatch(loginSlice.actions.toggleCommentModal(false));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!isCommentModalOpen) {
                return;
            }
            try {
                const response = await fetch(baseUrl + id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Something Went Wrong !');
                }

                const result = await response.json();

                setComments(result.comments);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);

    // const sendIconHandler = async() => {
    //     try{
    //         const response = await fetch(createCommentURL)
    //     }
    // }

    console.log(comments);

    return (
        <Dialog open={isCommentModalOpen} onClose={closeBtnHandler}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottomColor: 'black',
                    borderBottom: '2px solid grey',
                    mb: 1,
                }}
            >
                Comments
            </DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((e) => (
                        <CommentBox
                            key={e.comment_id}
                            commentId={e.comment_id}
                            comment={e.comment_text}
                        />
                    ))
                ) : (
                    <DialogContentText
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        No comments available.
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogContent>
                <TextField
                    fullWidth
                    sx={{
                        boxShadow: 5,
                        borderRadius: '8px', // Adjust the radius value according to your design
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    sx={{
                                        borderRadius: '0 8px 8px 0', // Adjust the radius value accordingly
                                        boxShadow: 'none', // Apply the same boxShadow value
                                    }}
                                >
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeBtnHandler}>close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductComments;
