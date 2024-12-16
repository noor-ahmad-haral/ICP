import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { data: session } = useSession();

  // Console the sessions object
  console.log(session);


  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    }
  }, [session]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    if (!showPopup) {
      setShowPopup(false);
    }
  };

  const handleImageClick = () => {
    setShowPopup(!showPopup);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.classList.add('clicked');
    setTimeout(() => {
      target.classList.remove('clicked');
    }, 300); // Duration should match the animation duration in CSS
  };

  return (
    <div className='w-full flex justify-between items-center p-6 md:px-8 lg:px-12 xl:px-16 text-white'>
      <Link href="/">
        <img src="/black-logo.png" alt="Logo" className='w-[70px]' />
      </Link>
      <div className='md:hidden'>
        <button onClick={toggleMenu} className='text-black focus:outline-none'>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 transition-transform duration-300 transform rotate-180">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      <ul className={`md:flex md:space-x-4 ${isOpen ? 'block' : 'hidden'} md:block md:items-center md:w-auto w-full text-center`}>
        <Link href="/tools">
          <li className='text-black text-[17px] font-semibold px-4 py-2 cursor-pointer rounded-md hover:bg-[#e6e7ed] transition duration-300'>Tools</li>
        </Link>
        <Link href="/about">
          <li className='text-black text-[17px] font-semibold px-4 py-2 cursor-pointer rounded-md hover:bg-[#e6e7ed] transition duration-300'>About</li>
        </Link>
        <Link href="/contact">
          <li className='text-black text-[17px] font-semibold px-4 py-2 cursor-pointer rounded-md hover:bg-[#e6e7ed] transition duration-300'>Contact</li>
        </Link>
        <Link href="/blog">
          <li className='text-black text-[17px] font-semibold px-4 py-2 cursor-pointer rounded-md hover:bg-[#e6e7ed] transition duration-300'>Blog</li>
        </Link>
      </ul>
      <div className='md:flex gap-4 hidden'>
        {isLoggedIn ? (
          <div className='relative flex justify-center items-center gap-2'>
            <img 
              src={session?.user?.image || '/user.svg'} 
              alt='User Image'
              className='rounded-full w-[35px] h-[35px] cursor-pointer' 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
              onClick={handleImageClick} 
            />
            <h1 className='text-black text-[14px] font-semibold'>{session?.user?.name}</h1>
            {showPopup && (
              <div 
                className='absolute top-full mt-2 right-0 w-[150px] bg-white text-black text-center rounded-lg shadow-lg' 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={() => setShowPopup(false)}
              >
                <button 
                  className='w-full px-4 py-2 text-black text-[14px] font-semibold hover:bg-gray-200 flex items-center justify-center gap-2' 
                  onClick={(e) => { handleButtonClick(e); signOut(); }}
                >
                  <img src="/logout.svg" alt="Logout Icon" className='w-[16px] h-[16px]' />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className='px-4 py-2 bg-[#e6e7ed] text-black text-[17px] font-semibold rounded-lg' onClick={(e) => { handleButtonClick(e); signIn(); }}>Login</button>
        )}
        <Link href="/tools">
          <button className='px-4 py-2 bg-black text-white text-[17px] font-semibold rounded-lg' onClick={handleButtonClick}>Start Creating</button>
        </Link>
      </div>
      <style jsx>{`
        @keyframes button-click {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .clicked {
          animation: button-click 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Header;
