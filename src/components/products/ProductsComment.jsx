//packages
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
//hooks
import { useDispatch, useSelector } from "react-redux";

//functions
import loginSlice from "../../store/loginSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductComments = (props) => {
  const dispatch = useDispatch();
  const isCommentModalOpen = useSelector(
    (state) => state.login.isCommentModalOpen
  );
  const [oneTimeFetch, setOneTimeFetch] = useState(false);

  //modal close function
  const closeBtnHandler = () => {
    dispatch(loginSlice.actions.toggleCommentModal(false));
  };
  const token = useSelector((state) => state.login.token);
  const id = useSelector((state) => state.login.commentIndex);
  const baseUrl = "http://localhost:3000/productComments/";

  const createCommentURL =
    "http://localhost:3000/createProductComment/:productId";

  useEffect(() => {
    const fetchData = async () => {
      if (oneTimeFetch) {
        return;
      }

      try {
        const response = await fetch(baseUrl + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOneTimeFetch(true);
        if (!response.ok) {
          throw new Error("Something Went Wrong !");
        }

        const fetchedData = await response.json();
        console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [baseUrl, id, token, oneTimeFetch]);

  return (
    <Dialog open={isCommentModalOpen} onClose={closeBtnHandler}>
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        <DialogContentText>there is no comment to display</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeBtnHandler}>close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductComments;
