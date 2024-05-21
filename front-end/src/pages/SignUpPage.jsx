import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiReduxHandler from "../handlers/apiReduxHandler";
import LoadingPage from "./LoadingPage";
import { useEtatCnx } from '../context/context';
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const mainRef = useRef(null);
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const pfirstnameRef = useRef(null);
    const plastnameRef = useRef(null);
    const pusernameRef = useRef(null);
    const ppasswordRef = useRef(null);
    const pconfirmPasswordRef = useRef(null);
    const loadingRef = useRef(null);

    const userState = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const { etatCnx, setEtatCnx } = useEtatCnx(false);
    const [StartSignUp, setStartSignUp] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkData = () => {
        const elements = [firstnameRef, lastnameRef, usernameRef, passwordRef, confirmPasswordRef];
        const pelements = [pfirstnameRef, plastnameRef, pusernameRef, ppasswordRef, pconfirmPasswordRef];
        let err = false;

        pelements.forEach(p => { p.current.textContent = ''; })
        elements.forEach((element, index) => {
            if (element.current.value === '') {
                pelements[index].current.textContent = 'This field must not be empty';
                err = true;
            }
            else if (element == passwordRef && element.current.value !== confirmPasswordRef.current.value) {
                pelements[index].current.textContent = 'password confirmation is invalid';
                pelements[index + 1].current.textContent = 'password confirmation is invalid';
                err = true;
            }
        })
        return err;
    }
    useEffect(() => {
        const signUp = async () => {
            setLoading(true);
            setError(false);
            try {
                const err = checkData();
                if (!err) {
                    const reponse = await ApiReduxHandler.registration(dispatch, firstnameRef.current.value, lastnameRef.current.value, usernameRef.current.value, passwordRef.current.value)
                    if (reponse) {
                        setLoading(false);
                        setError(true);
                        setStartSignUp(false);
                    }
                }
                else {
                    setLoading(true);
                    setError(true);
                    setStartSignUp(false);
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

        if (StartSignUp) {
            signUp();
        }
    }, [StartSignUp, setStartSignUp, userState]);

    useEffect(() => {
        if (loaded && userState) {
            navigate("/profile");
        }
    }, [loaded, setLoaded]);


    useEffect(() => {
        if (loading) {
            mainRef.current.classList.add('loading-main');
            loadingRef.current.classList.remove('hidden');
        }
        else {
            if (mainRef.current.classList.contains('loading-main')) {
                mainRef.current.classList.remove('loading-main');
                loadingRef.current.classList.add('hidden');
            }
        }
    }, [loading, setLoading]);

    return (
        <>
            <main className="main bg-dark" ref={mainRef} >
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i> <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="firstname">Firstname</label>
                            <input type="text" id="firstname" ref={firstnameRef} />
                            <p className='msgErr' ref={pfirstnameRef}></p>
                        </div><div className="input-wrapper">
                            <label htmlFor="lastname">Lastname</label>
                            <input type="text" id="lastname" ref={lastnameRef} />
                            <p className='msgErr' ref={plastnameRef}></p>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" ref={usernameRef} />
                            <p className='msgErr' ref={pusernameRef}></p>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" ref={passwordRef} />
                            <p className='msgErr' ref={ppasswordRef}></p>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
                            <p className='msgErr' ref={pconfirmPasswordRef}></p>
                        </div>
                        {/* PLACEHOLDER DUE TO STATIC SITE  */}
                        {/* <NavLink to="/user" className="sign-in-button">Sign In</NavLink> */}
                        {/* SHOULD BE THE BUTTON BELOW */}
                        <button type="submit" className="sign-in-button" onClick={(e) => {
                            e.preventDefault();
                            setStartSignUp(true);
                        }}>Sign Up</button>
                    </form>
                </section>
            </main>

            <div className="loading hidden" ref={loadingRef}>
                <LoadingPage />
            </div>
        </>
    )
}
export default SignUpPage;