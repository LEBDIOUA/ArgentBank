import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Account from "../components/Account";
import ApiReduxHandler from "../handlers/apiReduxHandler";
import { accountsList } from "../models/data";

function UserPage() {

    const user = useSelector((state) => state.user);
    const [modify, setModify] = useState(false);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mainRef = useRef(null);

    if (!user) {
        alert("Oooops! Error!");
        navigate('/');
    }

    const handlePrepareForm = () => {
        setModify(!modify);
    }

    const handleSaveUpdate = async () => {
        const firstNameValue =
            firstNameRef.current && firstNameRef.current.value !== "" ? firstNameRef.current.value
                : (firstNameRef.current && firstNameRef.current.placeholder ? firstNameRef.current.placeholder : "");

        const lastNameValue =
            lastNameRef.current && lastNameRef.current.value !== "" ? lastNameRef.current.value
                : (lastNameRef.current && lastNameRef.current.placeholder ? lastNameRef.current.placeholder : "");

        await ApiReduxHandler.modifyUser(dispatch, firstNameValue, lastNameValue);
        handlePrepareForm();
    }

    if (user) {
        return (
            <>
                <main className="main bg-dark" ref={mainRef} >
                    <div className="header">
                        {!modify && (
                            <>
                                <h1>Welcome back<br />{user.firstName}</h1>
                                <button className="edit-button" onClick={handlePrepareForm}>Edit Name</button>
                            </>
                        )}
                        {modify && (
                            <>
                                <h1>Welcome back</h1>
                                <div className="input-update-name">
                                    <input type="text" id="firstName" placeholder={user.firstName} ref={firstNameRef} />
                                    <input type="text" id="lastName" placeholder={user.lastName} ref={lastNameRef} />
                                </div>
                                <div className="btn-update-name">
                                    <button className="edit-button" onClick={handleSaveUpdate} >Save</button>
                                    <button className="edit-button" onClick={handlePrepareForm}>Cancel</button>
                                </div>
                            </>
                        )}
                    </div>

                    <h2 className="sr-only">Accounts</h2>
                    {accountsList.map(account => {
                        return <Account key={account.id} account={account} />
                    })}
                </main>
            </>
        )
    }

}
export default UserPage;