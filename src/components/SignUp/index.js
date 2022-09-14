import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserStart, clearUserError } from "../../redux/User/user.actions";
import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from '../forms/Button';

import { useTranslation } from "react-i18next";

import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const SignUp = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser, userErr } = useSelector(mapState);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation(["signup", "common"]);

    useEffect(() =>{
        window.scrollTo(0, 0);
        return () =>{
            dispatch(clearUserError());
            setErrors([]);
        }
    }, []); 

    useEffect(() => {
        if(currentUser){
            resetForm();
            history.push('/');
        }
    }, [currentUser]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr)
            setIsLoading(false);
        }
        else{
            setErrors([])
        }
    }, [userErr]);

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
        setIsLoading(false);
    };

    const handleFormSubmit = event =>{
        event.preventDefault();
        setIsLoading(true);
        dispatch(signUpUserStart({
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }));
    }   

    const configAuthWrapper = {
        headline: t("Create Account"),
    };
    return(
    <AuthWrapper {...configAuthWrapper}>
                <h3>
                    {t("Already have an account?")}
                    <span>{t(" ")}</span>
                    <Link to="/login">
                        {t("Sign in here")}
                    </Link>
                    <span>{t("common:.")}</span>
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

                    <form onSubmit={handleFormSubmit}>
                            <FormInput 
                                type = "text"
                                name = "firstName"
                                value = {firstName}
                                handleChange = {e => setFirstName(e.target.value)}
                                label =  {t("First Name")}
                                required
                            />

                            <FormInput 
                                type = "text"
                                name = "lastName"
                                value = {lastName}
                                handleChange = {e => setLastName(e.target.value)}
                                label = {t("Last Name")}
                                required
                            />
                            
                            <FormInput 
                                type = "email"
                                name = "email"
                                value = {email}
                                handleChange = {e => setEmail(e.target.value)}
                                label = {t("common:Email")}
                                required
                            />
                            <FormInput 
                                type = "password"
                                name = "password"
                                value = {password}
                                handleChange = {e => setPassword(e.target.value)}
                                label = {t("common:Password")}
                                required
                            />
                            <FormInput 
                                type = "password"
                                name = "confirmPassword"
                                value = {confirmPassword}
                                handleChange = {e => setConfirmPassword(e.target.value)}
                                label = {t("Confirm Password")}
                                required
                            />
                        <div className="terms">
                            {t("By signing up, you agree to the")}
                            <span>{t(" ")}</span>
                                <Link to="/terms">
                                    {t("Terms of Service")}
                                </Link>
                                <span>{t(" and ")}</span>
                                <Link to="/privacy">
                                    {t("Privacy Policy")}
                                </Link>
                            <span>{t(".")}</span>
                        </div>
                        <Button type="submit" className={isLoading ? "btn btn-submit isLoading" : "btn btn-submit"} disabled={isLoading} isLoading={isLoading}>
                            {t("Sign-up")}
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

export default SignUp;