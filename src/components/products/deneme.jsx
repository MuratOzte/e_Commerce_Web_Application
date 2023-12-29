import { useState } from "react";
import { Paper, Typography, IconButton, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import loginSlice from "../../store/loginSlice";
import Badge from "@mui/material/Badge";

const CommentBox = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [countLike, setCountLike] = useState(null);
  const dispatch = useDispatch();

  const favoriteChangeHandler = () => {
    dispatch(loginSlice.actions.setCommentId(props.commentId));
    setIsLiked((prev) => !prev);
  };

  const commentId = useSelector((state) => state.login.commentId);
  const token = useSelector((state) => state.login.token);
  const commentLikeUrl = `http://localhost:3000/auth/like/${commentId}`;
  const commentDislikeUrl = `http://localhost:3000/auth/deleteLike/${commentId}`;
  const countLikeUrl = `http://localhost:3000/auth/countLikes/${commentId}`;

  const commentLike = async () => {
    try {
      const response = await fetch(commentLikeUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong !");
      }

      const fetchedData = await response.json();
      console.log(fetchedData);
      return fetchedData;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const commentDislike = async () => {
    try {
      const response = await fetch(commentDislikeUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong !");
      }

      const fethcedData = await response.json();
      console.log(fethcedData);
      return fethcedData;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const countCommentLikes = async () => {
    try {
      const response = await fetch(countLikeUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong !");
      }
      const fetchedData = await response.json();
      setCountLike(fetchedData.countedLikes[0].like_count);
      console.log(fetchedData.countedLikes[0].like_count);
      return fetchedData;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        display: "flex",
        alignItems: "center",
        pl: 5,
        pr: 8,
        py: 1,
        mt: 5,
        ml: 1,
      }}
    >
      <Box fullwidth display={"flex"} alignItems={"center"}>
        <Avatar sx={{ bgcolor: "royalblue", mr: 3 }}>M</Avatar>
        <Typography>{props.comment}</Typography>
        {!isLiked && (
          <IconButton
            onClick={() => {
              favoriteChangeHandler(), commentLike();
              countCommentLikes();
            }}
            style={{ position: "absolute", right: 30 }}
          >
            <FavoriteBorder />
          </IconButton>
        )}
        {isLiked && (
          <IconButton
            onClick={() => {
              favoriteChangeHandler(), commentDislike();
            }}
            color="error"
            style={{ position: "absolute", right: 30 }}
          >
            <Badge badgeContent={countLike} color="primary">
              <Favorite />
            </Badge>
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export default CommentBox;
