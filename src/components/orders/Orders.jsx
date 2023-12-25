//packages
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
//hooks
import { useDispatch, useSelector } from 'react-redux';

//functions
import loginSlice from '../../store/loginSlice';
import { useState } from 'react';

const ForgottenPasswordModal = (props) => {
    const dispatch = useDispatch();
    const isOpenRedux = useSelector((state) => state.login.isModalOpen);

    //modal close function
    const closeBtnHandler = () => {
        dispatch(loginSlice.actions.toggleModalOpen(false));
    };

    return (
        <Dialog open={isOpenRedux} onClose={closeBtnHandler}>
            <DialogTitle>Sepet</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Üniversite e-postanı veya telefon numaranı kullanarak
                    şifreni yenileyebilirsin
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeBtnHandler}>İptal</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ForgottenPasswordModal;
