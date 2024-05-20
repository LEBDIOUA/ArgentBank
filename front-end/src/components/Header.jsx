import ApiReduxHandler from "../handlers/apiReduxHandler";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEtatCnx } from "../context/context";

function Header() {

    const user = useSelector((state) => state.user.user);
    const { etatCnx, setEtatCnx } = useEtatCnx(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOut = () => {
        ApiReduxHandler.logout(dispatch);
        navigate("/signIn");
        setEtatCnx(false);
    }

    return (
        <header>
            <nav className="main-nav">
                <NavLink to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src="/argentBankLogo.png"
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>

                {(!etatCnx) &&
                    <div>
                        <NavLink className="main-nav-item" to="/signIn"> <i className="fa fa-user-circle"></i> Sign In </NavLink>
                    </div>
                }

                {(etatCnx && user) &&
                    <div>
                        <NavLink className="main-nav-item" to="/user"> <i className="fa fa-user-circle"></i> {user.firstName} </NavLink>
                        <button className="main-nav-item" onClick={signOut}> <i className="fa fa-sign-out"></i> Sign Out</button>
                    </div>
                }
            </nav>
        </header>
    );
}
export default Header;