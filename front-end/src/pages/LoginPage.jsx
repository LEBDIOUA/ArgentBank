import { useEtatCnx } from "../context/context";
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiReduxHandler from "../handlers/apiReduxHandler";
import LoadingPage from "./LoadingPage";

function LoginPage() {
    const userState = useSelector((state) => state.user);
    const [startLogin, setStartLogin] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { etatCnx, setEtatCnx } = useEtatCnx();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const loadingRef = useRef(null);
    const msgErrRef = useRef(null);
    const mainRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Charger Email et Password si le checkBox est checked et les informations sont enregistrées
    if (isChecked && localStorage.getItem('email') && localStorage.getItem('password')) {
        usernameRef.current.value = localStorage.getItem('email');
        passwordRef.current.value = localStorage.getItem('password');
    }

    // Changer l'état de checkBox à chaque fois cliqué
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
    };

    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe');
        setIsChecked(rememberMe === 'true');

        const signIn = async () => {
            setLoading(true);
            setError(false);
            const usernameValue = usernameRef.current ? usernameRef.current.value : null;
            const passwordValue = passwordRef.current ? passwordRef.current.value : null;

            if (!usernameValue || !passwordValue) {
                alert('Please enter both username and password');
                setLoading(false);
                return;
            }

            try {
                const err = await ApiReduxHandler.authenticate(dispatch, usernameValue, passwordValue);
                if (err) {
                    setError(true);
                    setLoading(false);
                    setStartLogin(false);
                    msgErrRef.current.innerHTML = `${err}<a href="/signUp" class="sign-in-button">Sign Up</a>`;
                    throw new Error(err);
                }
            }
            catch (error) {
                console.error("An error occurred while fetching user data:", error);
                setLoading(false);
            }
            finally {
                if (userState) {
                    setTimeout(() => {
                        setLoading(false);
                        setLoaded(true);
                        setEtatCnx(true);
                    }, 500);
                }
            }
        };

        if (startLogin) {
            signIn();
        }
    }, [startLogin, setStartLogin, userState]);

    useEffect(() => {        
        if (loaded && userState) {
            navigate("/user");
        }

        if (loading || !loading || error) {
            mainRef.current.classList.toggle('loading-main');
            loadingRef.current.classList.toggle('hidden');
        }
    }, [loaded, loading, error]);

    return (
        <>
            <main className="main bg-dark" ref={mainRef} >
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i> <h1>Sign In</h1>
                    <form>
                        <p className="msgErr" ref={msgErrRef} ></p>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" ref={usernameRef} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" ref={passwordRef} />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" checked={isChecked} onChange={handleCheckboxChange} />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button type="submit" className="sign-in-button" onClick={(e) => {
                            e.preventDefault();
                            setStartLogin(true);
                        }}>Sign In</button>
                    </form>
                </section>
            </main>

            <div className="loading hidden" ref={loadingRef}>
                <LoadingPage />
            </div>
        </>
    )
}
export default LoginPage;