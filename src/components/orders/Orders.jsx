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
  const [orderId, setOrderId] = useState(null);

  const baseUrl = "http://localhost:3000/createOrder";
  const orderDetailsUrl = `http://localhost:3000/orderDetails/${orderId}`;

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
        setOrderId(fetchedData.order.order_id);
        console.log(fetchedData);
        dispatch(loginSlice.actions.setOrderIndex(fetchedData.order.order_id));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [baseUrl, token, isOpenRedux]);

  const orderDetails = async () => {
    try {
      const response = await fetch(orderDetailsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong !");
      }

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

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
        <Button onClick={orderDetails}>asdasd</Button>
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
