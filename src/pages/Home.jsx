import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import Profile from '../assets/profile.png';
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosLogOut, IoMdNotificationsOutline } from "react-icons/io";
import GroupList from "../components/GroupList";
import { getAuth, signOut } from "firebase/auth";


const Home = () => {

  let navigate = useNavigate()
  let auth = getAuth()
  let userData = useSelector(state => state.user.usersInfo)

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (userData.emailVerified == true) {
      setVerified(true)
    }
  }, [])

  const handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('usersInfo')
      navigate('/login')
    }).catch((error) => {
      console.log(error.code);
    });
  }


  return (
    <section>
      <div className="container mx-auto">
        {verified ?

          <div className="w-full flex justify-between">
            <div className="w-[10%] pt-8 h-screen bg-btn text-center rounded-xl">
              <img src={Profile} alt="" className="mx-auto w-18 mb-12" />
              <div className="flex justify-center relative overflow-hidden py-3 mb-12 items-center after:absolute after:content-[''] after:w-full after:h-full after:bg-white after:z-[-1] z-[1] after:top-0 after:left-4 after:rounded-l-xl before:absolute before:content-[''] before:w-[10px] before:h-full before:bg-btn before:top-0 before:right-0 before:rounded-l-xl">
                <IoHomeOutline className="text-4xl ml-2" />
              </div>
              <div className="flex justify-center mb-12">
                <AiOutlineMessage className="text-4xl text-gray-300" />
              </div>
              <div className="flex justify-center mb-12">
                <IoMdNotificationsOutline className="text-4xl text-gray-300" />
              </div>
              <div className="flex justify-center mb-24">
                <IoSettingsOutline className="text-4xl text-gray-300" />
              </div>
              <div onClick={handleLogOut} className="flex justify-center cursor-pointer">
                <IoIosLogOut className="text-4xl text-gray-300" />
              </div>
            </div>
            <div className="w-[30%] pt-3 h-screen px-5">
              <GroupList/>
            </div>
            <div className="w-[30%] pt-3 h-screen px-5">
              
            </div>
            <div className="w-[30%] pt-3 h-screen px-5">
              
            </div>
          </div>

          :

          <div className="flex justify-center items-center h-[100vh] w-[35vw] mx-auto">
            <div className="w-full bg-primary border-2 border-secondary py-14 text-center rounded-md">
              <h2 className="text-[#FBFDF5] text-center font-pops pb-10">Peace Talk</h2>
              <p className="font-pops text-[14px] px-2 bg-primary text-red-400 pb-4">Please verify your email first and try again.</p>
              <p className="font-pops text-[14px] px-2 bg-primary text-green-400 pb-12">Check your email for verification link</p>
              <Link to='/login'>
                <button className="w-[70%] text-center py-3 bg-btn rounded-lg text-white font-pops text-[14px] mb-6 uppercase tracking-wider">Go To Login</button>
              </Link>
            </div>
          </div>
        }

      </div>
    </section>
  )
}

export default Home
