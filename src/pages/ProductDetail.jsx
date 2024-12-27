import { Favorite, Send } from '@mui/icons-material';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
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
    const orderId = useSelector((state) => state.login.orderIndex);
    const token = useSelector((state) => state.login.token);

    const addProduct = async (product_id) => {
        dispatch(loginSlice.actions.setproductId(product_id));
        try {
            const response = await fetch(
                `http://localhost:3000/addProduct/${orderId}/${product_id}`,
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
            console.log('Fetched comments:', data);
            if (Array.isArray(data.comments)) {
                setComments(data.comments);
            } else {
                setComments([]);
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
                console.log('Fetched product:', data);
                setProduct(data.product);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchMaxLikedComment = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/auth/maxLikedComment?productId=' +
                        id,
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
                console.log('Max liked comment:', result);
                if (!result.maxLikedComment) {
                    return;
                }
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

    const handleLikeComment = async (comment_id) => {
        console.log('Liking comment:', comment_id);
        try {
            const response = await fetch(
                `http://localhost:3000/auth/like/${comment_id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            const data = await response.json();
            console.log('Liked comment:', data);
            fetchProductComments();
        } catch (error) {
            console.error('Error liking comment:', error);
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
                <div className="bg-white shadow rounded-lg p-6 mb-4 relative">
                    {product.discount_code && (
                        <div className="absolute right-8 bg-blue-400 px-4 py-2 rounded-md text-white shadow-lg hover:scale-105 transition-all duration-150">
                            {product.discount_code}
                        </div>
                    )}
                    <button
                        className="absolute right-6 bottom-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-150"
                        onClick={() => addProduct(product.product_id)}
                    >
                        Sepete Ekle
                    </button>
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
                                {product.discount_rate > 0 && (
                                    <>
                                        <span className="line-through text-gray-500 mr-2">
                                            ${product.product_price}
                                        </span>
                                        <span className="text-green-600 font-semibold">
                                            $
                                            {(
                                                product.product_price *
                                                (1 -
                                                    (product.discount_rate *
                                                        100) /
                                                        100)
                                            ).toFixed(2)}
                                        </span>
                                        <span className="text-sm text-gray-500 ml-2">
                                            ({product.discount_rate * 100}% off)
                                        </span>
                                    </>
                                )}
                                {!product.discount_code && (
                                    <span>${product.product_price}</span>
                                )}
                            </p>

                            <p className="text-gray-600">
                                Kategori: {product.category_name}
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
                    <ProductsComment
                        handleLikeComment={handleLikeComment}
                        comments={comments}
                        setComments={setComments}
                        productId={id}
                    />

                    <form
                        onSubmit={handleCommentSubmit}
                        className="mt-4 flex gap-8 h-12 items-center justify-center"
                    >
                        <input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleCommentSubmit(e);
                                }
                            }}
                            placeholder="Add a comment"
                            className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring"
                            required
                        ></input>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        >
                            Send
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
                                handleLikeComment={(e) => {
                                    handleLikeComment(comment.comment_id);
                                }}
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

const ProductsComment = ({ comments, handleLikeComment }) => {
    return (
        <div className="w-full">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div
                        key={comment.comment_id}
                        className="flex gap-4 relative w-full bg-gray-300 my-4 px-2 py-1 rounded-md text-black"
                    >
                        <p className="font-bold">
                            {comment.customer_name + ': '}
                        </p>
                        <p>
                            {comment.comment_text ||
                                'No comment text available'}
                        </p>
                        <div className="right-4 absolute">
                            {}
                            <Favorite
                                onClick={() =>
                                    handleLikeComment(comment.comment_id)
                                }
                                color="error"
                            />
                            <span>{comment.like_count}</span>
                        </div>
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
