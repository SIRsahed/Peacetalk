import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";



const Login = () => {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [emailErr, setEmailErr] = useState('')
    let [passErr, setPassErr] = useState('')
    let [infoErr, setInfoErr] = useState('')
    let [forgottenDiv, setForgottenDiv] = useState(false)
    let [resetEmailErr, setResetEmailErr] = useState('')
    let [resetEmail, setResetEmail] = useState('')

    const auth = getAuth();

    const provider = new GoogleAuthProvider();

    const navigate = useNavigate()
    const dispatch = useDispatch();



    let handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailErr('')
    }
    let handlePassword = (e) => {
        setPassword(e.target.value)
        setPassErr('')
    }

    const handleSubmit = () => {
        if (!email) {
            setEmailErr('Email is required')
        } else {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailErr("Email address is not valid");
            }
        }
        if (!password) {
            setPassErr('Password is required')
        }
        if (email && password && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredeatials) => {
                    navigate('/')
                    dispatch(userLoginInfo(userCredeatials.user));                         
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes('auth/invalid-credential')) {
                        setInfoErr("Invalid email or password")
                    }
                });
        }
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((userCredeatials) => {
                navigate('/');
                dispatch(userLoginInfo(userCredeatials.user));
            }).catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
    }


    const handleForgotPassword = () => {
        setForgottenDiv(true);
    }

    const handleRestEmail = (e) => {
        setResetEmail(e.target.value)
        setResetEmailErr('')
    }

    const handleResetPassword = () => {
        if(!resetEmail){
            setResetEmailErr('Enter your registered email')
        }else{
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(resetEmail)) {
                setResetEmailErr("Email address is not valid");
            }
        }

        if(resetEmail && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(resetEmail)){
            sendPasswordResetEmail(auth, resetEmail)
                .then(() => {
                    setResetEmailErr('Check email to reset password')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if(errorCode.includes("auth/missing-email")){
                        setResetEmailErr("Email not found in our records")
                    }
                });
        }
    }

    return (
        <section>
            <div className="container mx-auto">
                {forgottenDiv ?

                    <div className="flex justify-center items-center h-[100vh] w-[35vw] mx-auto">
                        <div className="w-full bg-primary border-2 border-secondary py-14 text-center rounded-md">
                            <h2 className="text-[#FBFDF5] text-center font-pops pb-4">Peace Talk</h2>
                            <p className="text-[#FBFDF5] text-center font-pops pb-8 opacity-85">Resetting your password</p>
                            <div className="relative w-[70%] mx-auto pb-10">
                                <p className="absolute -top-2 left-4 font-pops text-[14px] px-2 bg-primary text-gr">Enter your email</p>
                                <input value={resetEmail} onChange={handleRestEmail} type="email" className="bg-transparent h-12 w-full border-2 border-[#342479] outline-none px-3 rounded-md text-gr shadow-input" />
                                {resetEmailErr &&
                                    <p className="text-red-500 opacity-70 text-start">{resetEmailErr}</p>
                                }
                            </div>
                            <button onClick={handleResetPassword} className="w-[70%] text-center py-3 bg-btn rounded-lg text-white font-pops text-[14px] mb-6 uppercase tracking-wider">Reset Password</button>
                            <button onClick={()=>setForgottenDiv(false)} className="w-[70%] text-center py-3 bg-btn rounded-lg text-white font-pops text-[14px] mb-6 uppercase tracking-wider">Go to Login</button>
                        </div>
                    </div>

                    :

                    <div className="flex justify-center items-center h-[100vh] w-[35vw] mx-auto">
                        <div className="w-full bg-primary border-2 border-secondary py-14 text-center rounded-md">
                            <h2 className="text-[#FBFDF5] text-center font-pops pb-6">Peace Talk</h2>
                            {
                                infoErr &&
                                <p className="text-red-500 opacity-70 text-center mb-6">{infoErr}</p>
                            }

                            <p onClick={handleGoogleLogin} className="w-[70%] mx-auto text-center py-3 bg-btn rounded-lg text-white font-pops text-[14px] mb-6 uppercase tracking-wider cursor-pointer">Login with Google</p>

                            <div className="relative w-[70%] mx-auto pb-10">
                                <p className="absolute -top-2 left-4 font-pops text-[14px] px-2 bg-primary text-gr">Enter your email</p>
                                <input onChange={handleEmail} type="email" className="bg-transparent h-12 w-full border-2 border-[#342479] outline-none px-3 rounded-md text-gr shadow-input" />
                                {emailErr &&
                                    <p className="text-red-500 opacity-70 text-start">{emailErr}</p>
                                }
                            </div>
                            <div className="relative w-[70%] mx-auto pb-6">
                                <p className="absolute -top-2 left-4 font-pops text-[14px] px-2 bg-primary text-gr">Enter Password</p>
                                <input onChange={handlePassword} type="password" className="bg-transparent h-12 w-full border-2 border-[#342479] outline-none px-3 rounded-md text-gr shadow-input" />
                                {passErr &&
                                    <p className="text-red-500 opacity-70 text-start">{passErr}</p>
                                }
                            </div>

                            <button onClick={handleSubmit} className="w-[70%] text-center py-3 bg-btn rounded-lg text-white font-pops text-[14px] mb-6 uppercase tracking-wider">Login</button>
                            <p className="text-white text-[13px] opacity-80 uppercase"> Don&apos;t HAVE AN ACCOUNT ? <Link to='/signup' className="text-primary">Sign Up</Link></p>

                            <p onClick={handleForgotPassword} className="text-red-500 opacity-70 text-center mt-3 cursor-pointer">Forgotten Password</p>
                        </div>
                    </div>

                }
            </div>
        </section>
    )
}

export default Login