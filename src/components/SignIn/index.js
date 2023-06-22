import React , { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, googleSignInStart, clearUserError } from "../../redux/User/user.actions";

import AuthWrapper from "../AuthWrapper";
import Button from "./../forms/Button";
import FormInput from "../forms/FormInput";

import { useTranslation } from "react-i18next";

import './styles.scss';

const mapState = ({ user })  => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const SignIn = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser, userErr } = useSelector(mapState);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { t } = useTranslation(["login", "common"]);

    // clear errors when exiting
    useEffect(() =>{
        window.scrollTo(0, 0);
        return () =>{
            dispatch(clearUserError());
            setErrors([]);
        }
    }, []); 

    // logged in success
    useEffect(() => {
        if(currentUser){
            resetForm();
            history.push('/')
        }
    }, [currentUser]);

    // error logging in
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
        setEmail('');
        setPassword('');
        setErrors([]);
        setIsLoading(false);
    };

    const handleSubmit = e =>{
        e.preventDefault();
        setIsLoading(true);
        dispatch(
            // if setIsLoading() is here -> error
            emailSignInStart({ email, password })
        );  
            
        
    }

    const handleGoogleSignIn = () => {
        dispatch(
            googleSignInStart()
        );
    }
    
    const configAuthWrapper = {
        headline: t("Log In")
    };


    return(
        <AuthWrapper { ...configAuthWrapper }>
            <h3>
                {t("Don't have an account?")}
                
                <span>{t(" ")}</span>
                <Link to="/registration">
                    {t("Sign up here")}
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
                {/* <div className="socialSignin">
                    <div className="row">
                        <Button className="btn btn-google" onClick= { handleGoogleSignIn }>
                            Login with Google
                        </Button>
                    </div>
                    <div className="row">
                        <Button className="btn btn-apple">
                            Continue with Apple
                        </Button>
                    </div> 
                    <div className="row">
                        <Button className="btn btn-facebook">
                                Continue with Facebook
                        </Button>
                    </div>
                </div>  */}
                <form onSubmit= { handleSubmit }>

                    {/* <div className="or-tag">
                        <span>OR</span>
                    </div> */}

                    <FormInput 
                        type = "email"
                        name = "email"
                        value = {email}
                        // placeholder="Email"
                        onChange = { e => setEmail(e.target.value)}
                        // handleChange = {this.handleChange}
                        label = {t("common:Email")}
                        required
                    />
                    <FormInput 
                        type = "password"
                        name = "password"
                        value = {password}
                        // placeholder="Password"
                        onChange = { e => setPassword(e.target.value)}
                        // handleChange = {this.handleChange}
                        label = {t("common:Password")}
                        required
                    />
                    <div className="resetPassword">
                        <Link to="/recovery">{t("Forgot your password?")}</Link>
                    </div>
                    <Button type="submit" className={isLoading ? "btn btn-submit isLoading" : "btn btn-submit"} disabled={isLoading} isLoading={isLoading}>
                        {t("Log In")}
                    </Button>

                    <div className="cancel">
                        <h3>
                            <Link to="/">
                                {t("common:Cancel")}
                            </Link>
                        </h3>
                    </div>

                </form>
            </div>
            
        </AuthWrapper>
    )
}

export default SignIn;