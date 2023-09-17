import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = (props) => {
    const dispatch = useDispatch();

    return (
        <header className="Header">
            <h1>Ai Summer</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="hotel">Hotels</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
