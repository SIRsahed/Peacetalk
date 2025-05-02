import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import Profile from '../assets/profile.png';
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosLogOut, IoMdNotificationsOutline } from "react-icons/io";
import GroupList from "../components/GroupList";
import { getAuth, signOut } from "firebase/auth";
import { FaCloudUploadAlt } from "react-icons/fa";


const Home = () => {

  let navigate = useNavigate()
  let auth = getAuth()
  let userData = useSelector(state => state.user.usersInfo)

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (userData && userData.emailVerified === true) {
      setVerified(true);
    }
  }, [userData])

  const handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('usersInfo')
      navigate('/login')
    }).catch((error) => {
      console.log(error.code);
    });
  }

  let [imageUploadPopUp, setImageUploadPopUp] = useState(false);

  const handleImageUpload = () => {
    setImageUploadPopUp(true);
  }


  const handleSubmitImage = () => {
    console.log("amamanamaammamamamaam");
    
  }


  return (
    <section>
      <div className="container mx-auto">
        {verified ?
          <div className="w-full flex justify-between">
            <div className="w-[10%] pt-8 h-screen bg-btn rounded-xl">
              <div onClick={handleImageUpload} className="group h-16 w-16 rounded-full mx-auto mb-8 flex justify-center items-center relative after:absolute after:content-[''] after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:rounded-full after:opacity-0 hover:after:opacity-55 cursor-pointer">
                <img src={Profile} alt="" className="w-full" />
                <FaCloudUploadAlt className="text-2xl absolute z-50 text-white opacity-0 group-hover:opacity-80" />
              </div>
              <div className="flex justify-center relative overflow-hidden py-3 mb-12 items-center after:absolute after:content-[''] after:w-full after:h-full after:bg-white after:z-[-1] z-[1] after:top-0 after:left-4 after:rounded-l-xl before:absolute before:content-[''] before:w-[10px] before:h-full before:bg-btn before:top-0 before:right-0 before:rounded-l-xl cursor-pointer">
                <IoHomeOutline className="text-4xl ml-2" />
              </div>
              <div className="flex justify-center mb-12 cursor-pointer">
                <AiOutlineMessage className="text-4xl text-gray-300" />
              </div>
              <div className="flex justify-center mb-12 cursor-pointer">
                <IoMdNotificationsOutline className="text-4xl text-gray-300" />
              </div>
              <div className="flex justify-center mb-24 cursor-pointer">
                <IoSettingsOutline className="text-4xl text-gray-300" />
              </div>
              <div onClick={handleLogOut} className="flex justify-center cursor-pointer">
                <IoIosLogOut className="text-4xl text-gray-300" />
              </div>
            </div>
            <div className="w-[30%] pt-3 h-screen px-5">
              <GroupList />
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

        {imageUploadPopUp &&
          <div className="flex justify-center items-center h-[100vh] w-[35vw] mx-auto absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="w-full bg-primary border-2 border-secondary py-14 text-center rounded-md">
              <h2 className="text-[#FBFDF5] text-center font-pops pb-4">Peace Talk</h2>
              <p className="text-[#FBFDF5] text-center font-pops pb-8 opacity-85">Upload Your Profile Photo</p>
              <div className="relative w-[70%] mx-auto pb-10">
                <input type="file" className="text-white" />
              </div>
              <button onClick={handleSubmitImage} className="w-[70%] text-center py-3 bg-btn rounded-lg text-white font-pops text-[14px] mb-6 uppercase tracking-wider">Upload</button>
              <button onClick={() => setImageUploadPopUp(false)} className="w-[70%] text-center py-3 bg-btn rounded-lg text-white font-pops text-[14px] mb-6 uppercase tracking-wider">Cancel</button>
            </div>
          </div>
        }

      </div>
    </section>
  )
}

export default Home
