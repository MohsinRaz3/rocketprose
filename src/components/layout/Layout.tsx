import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { Button } from '../Button';
import { handleLogout } from '../../pages/Login';
import { useAuth } from '../../hooks/Auth';


export function Header() {
  const navigate = useNavigate();
  const { session } = useAuth()
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">

        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img
              src="/rockettoolslogo.webp"
              alt="Rocket Tools"
              className="h-5 md:h-8 w-auto"
            />
            <span className="text-white font-semibold text-sm md:text-xl">
              RocketProse
            </span>
          </div>
          {session && session.user && session.user.email ? <div className='flex items-center gap-3'><p className='text-[#5B9BB2] text-md hidden md:block'>{session.user.email} </p> <Button className="bg-[#5B9BB2] text-sm text-white px-4 py-2 rounded-xl font-semibold
           hover:bg-[#337B97] transition-all transform hover:scale-105 shadow-lg" onClick={handleLogout}>Logout</Button></div> : <button
            onClick={() => navigate("/signin")}
            className="bg-[#5B9BB2] text-sm text-white px-4 py-2 rounded-xl font-semibold
           hover:bg-[#337B97] transition-all transform hover:scale-105 shadow-lg">
            SignIn
          </button>}



        </div>
      </header>
      <Outlet />
    </>

  );
}