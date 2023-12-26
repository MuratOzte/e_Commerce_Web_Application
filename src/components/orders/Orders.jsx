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

const OrdersModal = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);

  //modal close function
  const closeBtnHandler = () => {
    dispatch(loginSlice.actions.toggleModalOpen(false));
  };
  const isOpenRedux = useSelector((state) => state.login.isModalOpen);
  const isOrderExist = useSelector((state) => state.login.isOrderExist);

  const baseUrl = "http://localhost:3000/createOrder";

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpenRedux || isOrderExist) {
        return;
      }
      try {
        dispatch(loginSlice.actions.OrderExist());
        const response = await fetch(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Something Went Wrong !");
        }

        const fetchedData = await response.json();
        console.log(fetchedData);
        dispatch(loginSlice.actions.setOrderIndex(fetchedData.order.order_id));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [baseUrl, token, isOpenRedux]);

  return (
    <Dialog open={isOpenRedux} onClose={closeBtnHandler}>
      <DialogTitle>Sepet</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Üniversite e-postanı veya telefon numaranı kullanarak şifreni
          yenileyebilirsin
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            closeBtnHandler();
          }}
        >
          İptal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrdersModal;
