import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordStart, resetUserState, clearUserError } from "../../redux/User/user.actions";

import AuthWrapper from './../AuthWrapper';
import FormInput from  './../forms/FormInput';
import Button from  './../forms/Button';
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import './styles.scss';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { resetPasswordSuccess, userErr } = useSelector(mapState); 

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation(["recovery", "common"]);

    useEffect(() => {
        if(resetPasswordSuccess){
            // ADD: show success message
            dispatch(
                resetUserState()
            );
            setIsLoading(false);
            history.push('/login');
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr);
            setIsLoading(false);
        } 
        else{
            setErrors([])
        }
    }, [userErr]);

    useEffect(() =>{
        window.scrollTo(0, 0);
        return () =>{
            dispatch(clearUserError());
            setErrors([]);
        }
    }, []); 

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(
            resetPasswordStart({ email })
        );    
    }


    const configAuthWrapeer = {
        headline: t('Reset Your Password')
    };
    return(
        <AuthWrapper { ...configAuthWrapeer }>
                <h3>
                    {t("We will send you an email to reset your password.")}
                </h3>
            <div className="formWrap">
                
                {errors.length > 0 && (
                    <div className="errorMessage">
                        {errors.map((e, index) => {
                            return(
                                <h3 key = {index}>
                                    {e}
                                </h3>
                            );
                        })}
                    </div>
                )} 

                <form onSubmit={handleSubmit}>
                    <FormInput 
                        type = "email"
                        name = "email"
                        value = {email}
                        // placeholder = "Email"
                        // onChange = {this.handleChange}
                        handleChange = {e => setEmail(e.target.value)}
                        label = {t("common:Email")}
                    />

                    <Button type="submit" className={isLoading ? "btn btn-submit isLoading" : "btn btn-submit"} disabled={isLoading} isLoading={isLoading}>
                        {t("Submit")}
                    </Button>
                    <div className="cancel">
                        <h3>
                            <Link to="/login">
                                {t("common:Cancel")}
                            </Link>
                        </h3>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
}

export default EmailPassword;