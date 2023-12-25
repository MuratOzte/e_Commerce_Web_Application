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

const ProductComments = (props) => {
    const dispatch = useDispatch();
    const isCommentModalOpen = useSelector(
        (state) => state.login.isCommentModalOpen
    );
    console.log(isCommentModalOpen);

    //modal close function
    const closeBtnHandler = () => {
        dispatch(loginSlice.actions.toggleCommentModal(false));
    };

    return (
        <Dialog open={isCommentModalOpen} onClose={closeBtnHandler}>
            <DialogTitle>Comments</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    there is no comment to display
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeBtnHandler}>close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductComments;
