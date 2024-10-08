import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center justify-between rounded-lg bg-zinc-500 px-8 py-2 shadow-2xl">
        <div className="flex flex-col items-start gap-5">
          <div className="w-full md:w-5/6 text-4xl font-black capitalize text-zinc-100">
            Explore Code IDE today
          </div>
          <div className="font-semibold text-zinc-100">
            Enhance your coding experience
          </div>
          <Button
            onClick={() => {
              navigate("/editor");
            }}
            className="p-3 text-white bg-zinc-950 self-center md:self-start"
          >
            Go To Editor
          </Button>
        </div>
        <img src="/Hero.png" alt="heroImage" className="w-96" />
      </div>
    </div>
  );
};

export default Landing;
