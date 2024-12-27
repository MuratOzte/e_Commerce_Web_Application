import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Favorite, FavoriteBorder, Send } from '@mui/icons-material';
import {
    Box,
    IconButton,
    Paper,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    InputAdornment,
    Button,
    Avatar,
    Badge,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import loginSlice from '../store/loginSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [maxLikedCommentText, setMaxLikedCommentText] = useState('');
    const [maxLikedCommentCount, setMaxLikedCommentCount] = useState(0);
    const dispatch = useDispatch();
    const isCommentModalOpen = useSelector(
        (state) => state.login.isCommentModalOpen
    );
    const token = useSelector((state) => state.login.token);

    const fetchProductComments = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/productComments/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );

            const data = await response.json();
            console.log('Fetched comments:', data); // Gelen veriyi kontrol et
            if (Array.isArray(data.comments)) {
                setComments(data.comments);
            } else {
                setComments([]); // Verinin doğru formatta olup olmadığını kontrol et
            }
        } catch (error) {
            console.error('Error fetching product comments:', error);
            setComments([]);
        }
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/product/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );
                const data = await response.json();
                setProduct(data.product);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchMaxLikedComment = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/auth/maxLikedComment',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const result = await response.json();
                setMaxLikedCommentText(result.maxLikedComment.comment_text);
                setMaxLikedCommentCount(result.maxLikedComment.like_count);
            } catch (error) {
                console.error('Error fetching max liked comment:', error);
            }
        };

        fetchProductDetails();
        fetchProductComments();
        fetchMaxLikedComment();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:3000/createProductComment/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                    body: JSON.stringify({ commentText: newComment }),
                }
            );
            const data = await response.json();
            setComments((prevComments) => [...prevComments, data]);
            setNewComment('');

            fetchProductComments();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const closeBtnHandler = () => {
        dispatch(loginSlice.actions.toggleCommentModal(false));
    };

    if (!product) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="w-full max-w-2xl mx-auto">
                <div className="bg-white shadow rounded-lg p-6 mb-4">
                    <div className="flex items-center space-x-4">
                        <img
                            src={product.product_image}
                            alt={product.product_name}
                            className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div>
                            <h1 className="text-2xl font-bold mb-2">
                                {product.product_name}
                            </h1>
                            <p className="text-lg text-gray-700">
                                Price: ${product.price}
                            </p>
                            <p className="text-gray-600">
                                Category ID: {product.category_id}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 mb-4">
                    <h2 className="text-xl font-semibold mb-4">Comments</h2>
                    <Paper elevation={8} className="p-4 mb-4 bg-red-100">
                        Max Liked Comment: {maxLikedCommentText} (Likes:{' '}
                        {maxLikedCommentCount})
                    </Paper>
                    {/* Here we are using ProductsComment component */}
                    <ProductsComment
                        comments={comments}
                        setComments={setComments}
                        productId={id}
                    />

                    <form onSubmit={handleCommentSubmit} className="mt-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment"
                            className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        >
                            Submit Comment
                        </button>
                    </form>
                </div>
            </div>

            <Dialog open={isCommentModalOpen} onClose={closeBtnHandler}>
                <DialogTitle className="border-b border-gray-300">
                    Comments
                </DialogTitle>
                <DialogContent>
                    {Array.isArray(comments) && comments.length > 0 ? (
                        comments.map((comment) => (
                            <CommentBox
                                key={comment.comment_id}
                                commentId={comment.comment_id}
                                comment={comment.comment_text}
                            />
                        ))
                    ) : (
                        <DialogContentText>
                            No comments available.
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogContent>
                    <TextField
                        fullWidth
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleCommentSubmit}>
                                        <Send />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeBtnHandler}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const ProductsComment = ({ comments, setComments, productId }) => {
    return (
        <div>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.comment_id} className="comment">
                        <p>
                            {comment.comment_text ||
                                'No comment text available'}
                        </p>
                    </div>
                ))
            ) : (
                <p>No comments available</p>
            )}
        </div>
    );
};

const CommentBox = ({ commentId, comment }) => {
    return (
        <div className="comment-box">
            <Typography variant="body1">
                {comment || 'No comment text'}
            </Typography>
        </div>
    );
};

export default ProductDetail;
