//packages
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
//hooks
import { useDispatch, useSelector } from 'react-redux';

//functions
import { useEffect, useState } from 'react';
import loginSlice from '../../store/loginSlice';
import CommentBox from './CommentBox';

const ProductComments = (props) => {
    const dispatch = useDispatch();
    const isCommentModalOpen = useSelector(
        (state) => state.login.isCommentModalOpen
    );
    //modal close function
    const closeBtnHandler = () => {
        dispatch(loginSlice.actions.toggleCommentModal(false));
    };
    const token = useSelector((state) => state.login.token);
    const id = useSelector((state) => state.login.commentIndex);
    const baseUrl = 'http://localhost:3000/productComments/';

    const [comments, setComments] = useState(null);

    const createCommentURL =
        'http://localhost:3000/createProductComment/:productId';

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

    console.log(comments);

    return (
        <Dialog open={isCommentModalOpen} onClose={closeBtnHandler}>
            <DialogTitle>Comments</DialogTitle>
            <DialogContent>
                {console.log(comments)}
                {comments &&
                    comments.map((e) => (
                        <CommentBox
                            key={e.comment_id}
                            comment={e.comment_text}
                        />
                    ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeBtnHandler}>close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductComments;
