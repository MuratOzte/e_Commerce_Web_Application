import CommentIcon from "@mui/icons-material/Comment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import loginSlice from "../../store/loginSlice";
import "./MediaCards.css";
import { useEffect } from "react";

export default function MediaCard(props) {
  const dispatch = useDispatch();
  const baseUrl = "http://localhost:3000/addProduct/";
  const orderId = useSelector((state) => {
    state.login.orderIndex;
  });
  const productId = useSelector((state) => {
    state.login.commentIndex;
  });
  const token = useSelector((state) => {
    state.login.token;
  });

  useEffect(() => {
    const fetchedData = async () => {
      const response = await fetch(baseUrl + orderId + productId, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong !");
      }
    };
  }, []);

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={props.url}
            alt={props.title}
            style={{ width: "300px", height: "200px" }}
          />
          <Typography
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "8px",
              color: "white",
              textAlign: "center",
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
              sx={{ color: "white" }}
              onClick={() => {
                dispatch(loginSlice.actions.toggleCommentModal(true));
                dispatch(loginSlice.actions.setCommentIndex(props.productId));
              }}
            >
              <CommentIcon>Contained</CommentIcon>
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <AddBoxIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
