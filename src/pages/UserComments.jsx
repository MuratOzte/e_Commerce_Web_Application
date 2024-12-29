import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const baseUrl = 'http://localhost:3000/auth/customerComments';

const UserComments = () => {
    const token = useSelector((state) => state.login.token);
    const [allComments, setAllComments] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const result = await response.json();
                console.log(result);
                setAllComments(result.comments);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [token, baseUrl]);

    if (!allComments) {
        return <div>Loading...</div>;
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                gap: 20,
                marginTop: 10,
            }}
        >
            <Typography
                sx={{
                    fontSize: '24',
                    my: 4,
                    py: 1,
                    margin: 'auto',
                    mx: '20%',
                    mt: '20',
                    border: '2px solid black',
                    boxSizing: 'content-box',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    boxShadow: 10,
                }}
            >
                Tüm Kullanici Yorumlari
            </Typography>

            {allComments.map((comment) => (
                <Paper
                    key={comment.comment_id}
                    elevation={3}
                    sx={{
                        margin: 'auto',
                        mx: '20%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: 3,
                    }}
                >
                    <Typography
                        sx={{
                            mx: '10%',
                            border: '2px solid gray',
                            p: 1,
                            borderRadius: 3,
                        }}
                    >
                        Ürün : {comment.product_name}
                    </Typography>
                    <Typography
                        sx={{
                            mx: '10%',
                            border: '2px solid gray',
                            p: 1,
                            borderRadius: 3,
                        }}
                    >
                        Ürün Yorumu : {comment.comment_text}
                    </Typography>
                </Paper>
            ))}
        </div>
    );
};

export default UserComments;
