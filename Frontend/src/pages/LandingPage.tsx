import { useNavigate } from "react-router-dom"
const LandingPage = () => {

  const navigate = useNavigate()
  return (
    <>
    <div className="w-screen h-screen bg-gray-950 text-white">
      <div  className="w-screen h-screen bg-gray-950  text-white flex gap-4 justify-center items-center">
        <button onClick={()=>{navigate("/chat")}} className="bg-blue-600 w-fit py-3 px-4 rounded-lg cursor-pointer">Chat Page</button>
      </div>
    </div>

    </>
  )
}

export default LandingPage