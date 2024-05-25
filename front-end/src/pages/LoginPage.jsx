import { useEtatCnx } from "../context/context";
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiReduxHandler from "../handlers/apiReduxHandler";
import LoadingPage from "./LoadingPage";

function LoginPage() {
    const user = useSelector((state) => state.user);
    const [startLogin, setStartLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { setEtatCnx } = useEtatCnx();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const loadingRef = useRef(null);
    const msgErrRef = useRef(null);
    const mainRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        const signIn = async () => {
            setLoading(true);
            setError(false);
            const usernameValue = usernameRef.current ? usernameRef.current.value : null;
            const passwordValue = passwordRef.current ? passwordRef.current.value : null;

            if (!usernameValue || !passwordValue) {
                msgErrRef.current.innerHTML = 'Please enter both username and password';
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
                }
            }
            catch (error) {
                console.error("An error occurred while fetching user data:", error);
                setError(true);
                setLoading(false);
                setStartLogin(false);
            }
        };

        if (startLogin) {
            signIn();
        }
        setStartLogin(false);
    }, [startLogin, setStartLogin, user, dispatch, setEtatCnx]);

    useEffect(() => {
        if (user) {
            setLoading(false);
            setLoaded(true);
            setEtatCnx(true);
        }
    }, [user, setEtatCnx, setLoaded, setLoading]);

    useEffect(() => {
        if (loaded && user) {
            navigate("/profile");
        }

        if (loading || !loading) {
            mainRef.current.classList.toggle('loading-main');
            loadingRef.current.classList.toggle('hidden');
        }
    }, [loaded, loading, error, navigate, user]);

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
                            <input type="checkbox" id="remember-me" />
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
