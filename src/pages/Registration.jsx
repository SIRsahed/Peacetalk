import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

const Registration = () => {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [fullName, setFullName] = useState('')
    let [emailErr, setEmailErr] = useState('')
    let [passErr, setPassErr] = useState('')
    let [fullNameErr, setFullNameErr] = useState('')
    let [passShow, setPassShow] = useState(true)

    const auth = getAuth();
    const navigate = useNavigate();



    let handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailErr('')
    }
    let handlePassword = (e) => {
        setPassword(e.target.value)
        setPassErr('')
    }
    let handleName = (e) => {
        setFullName(e.target.value)
        setFullNameErr('')
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
        } else if (!/(?=.*[a-z])/.test(password)) {
            setPassErr('Password must contain at least one lowercase letter');
        } else if (!/(?=.*[A-Z])/.test(password)) {
            setPassErr('Password must contain at least one uppercase letter');
        } else if (!/(?=.*[0-9])/.test(password)) {
            setPassErr('Password must contain at least one number');
        } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setPassErr('Password must contain at least one special character');
        } else if (!/(?=.{8,})/.test(password)) {
            setPassErr('Password must at least 8 character');
        }
        if (!fullName) {
            setFullNameErr('Name is required')
        }

        if (fullName && email && password && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setEmail('');
                            setPassword('');
                            setFullName('');
                            toast.success('Signed Up. Ready to login')
                            setTimeout(() => {
                                navigate('/login');
                            }, 2000);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes('auth/email-already-in-use')) {
                        setEmailErr('Email already in use. Go to Login')
                    }
                });
        }
    }


    return (
        <section>
            <div className="container mx-auto">
                <div className="flex justify-center items-center h-[100vh] w-[35vw] mx-auto">
                    <div className="w-full bg-primary border-2 border-secondary py-14 text-center rounded-md">
                        <h2 className="text-[#FBFDF5] text-center font-pops pb-10">Peace Talk</h2>
                        <div className="relative w-[70%] mx-auto pb-10">
                            <p className="absolute -top-2 left-4 font-pops text-[14px] px-2 bg-primary text-gr">Enter your name *</p>
                            <input value={fullName} onChange={handleName} type="text" className="bg-transparent h-12 w-full border-2 border-[#342479] outline-none px-3 rounded-md text-gr shadow-input" />
                            {fullNameErr &&
                                <p className="text-red-500 opacity-70 text-start">{fullNameErr}</p>
                            }
                        </div>
                        <div className="relative w-[70%] mx-auto pb-10">
                            <p className="absolute -top-2 left-4 font-pops text-[14px] px-2 bg-primary text-gr">Enter your email *</p>
                            <input value={email} onChange={handleEmail} type="email" className="bg-transparent h-12 w-full border-2 border-[#342479] outline-none px-3 rounded-md text-gr shadow-input" />
                            {emailErr &&
                                <p className="text-red-500 opacity-70 text-start">{emailErr}</p>
                            }
                        </div>
                        <div className="relative w-[70%] mx-auto pb-10">
                            <p className="absolute -top-2 left-4 font-pops text-[14px] px-2 bg-primary text-gr">Enter password *</p>
                            <input value={password} onChange={handlePassword} type={passShow == true ? "password" : "text"} className="bg-transparent h-12 w-full border-2 border-[#342479] outline-none px-3 rounded-md text-gr shadow-input" />
                            <span onClick={() => setPassShow(!passShow)} className="absolute right-4 top-4 text-gr cursor-pointer">{passShow ? <RxEyeClosed /> : <RxEyeOpen />}</span>
                            {passErr &&
                                <p className="text-red-500 opacity-70 text-start">{passErr}</p>
                            }
                        </div>
                        <ToastContainer
                            position="top-center"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <button onClick={handleSubmit} className="w-[70%] text-center py-3 bg-btn rounded-lg text-white font-pops text-[14px] mb-6 uppercase tracking-wider">Create User</button>
                        <p className="text-white text-[13px] opacity-80">ALREADY HAVE AN ACCOUNT ? <Link to='/login' className="text-primary">LOGIN</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registration
