
import { useNavigate } from "react-router-dom"
import Button from "./ui/Button";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={()=>{navigate("/editor")}} className="text-white">
        Go To Editor
      </Button>
    </div>
  )
}

export default Landing