import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import './HomepageCards.css';

const HomepageCards = (props) => {
    return (
        <Link to={props.to} >
            <Paper elevation={24} className="cards">
                <img className="card-image" src={props.src} alt={props.title} />
                <div className="overlay">{props.title}</div>
            </Paper>
        </Link>
    );
};

export default HomepageCards;
