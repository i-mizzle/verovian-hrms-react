import React from 'react'
import Logo from '../../assets/img/logo.png'
import HomeIcon from '../elements/icons/HomeIcon'
import NewspaperIcon from '../elements/icons/NewspaperIcon'
import DocumentIcon from '../elements/icons/DocumentIcon'
import LightbulbIcon from '../elements/icons/LightbulbIcon'
import GroupIcon from '../elements/icons/GroupIcon'
import PresentationIcon from '../elements/icons/PresentationIcon'
import UsersIcon from '../elements/icons/UsersIcon'
import QueueListIcon from '../elements/icons/QueueListIcon'
import GlobeIcon from '../elements/icons/GlobeIcon'
import ClipboardIcon from '../elements/icons/ClipboardIcon'
import ProfileImage from '../../assets/img/avatar.webp'
import SearchIcon from '../elements/icons/SearchIcon'
import BellIcon from '../elements/icons/BellIcon'
import OfficeIcon from '../elements/icons/OfficeIcon'

import { Link, useLocation } from 'react-router-dom'

const UserLayout = ({pageTitle, children}) => {
  // const router = useRouter();
  const location = useLocation();
  const currentRoute = location.pathname;
  return (
    <div className='w-full'>
        <div className='w-full flex items-start'>
            <div className='w-2/12 p-[15px] shadow-xl min-h-screen relative bg-[#fff]'>
              <div className='w-8/12 mb-6'>
                <img src={Logo} alt="logo" width={150} />
              </div>

              <Link to={`/user`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/home') && 'bg-verovian-light-purple'}`}>
                  <HomeIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>Home</p>
                </button>
              </Link>

              <Link to={`/user/company/departments`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/company') && 'bg-verovian-light-purple'}`}>
                  <OfficeIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>Company</p>
                </button>
              </Link>

              <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <NewspaperIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>News</p>
              </div>

              <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <DocumentIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>Documents</p>
              </div>

              <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <LightbulbIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>Manage Knowledge</p>
              </div>

              <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <GroupIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>Groups</p>
              </div>

              <Link to={`/user/employees`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/employees') && 'bg-verovian-light-purple'}`}>
                  <UsersIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>Employees</p>
                </button>
              </Link>

              <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <PresentationIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>Training</p>
              </div>

              <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <QueueListIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>Task Management</p>
              </div>

              <Link to={`/user/holiday-management`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/holiday-management') && 'bg-verovian-light-purple'}`}>
                  <GlobeIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>Holiday Management</p>
                </button>
              </Link>

              <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <ClipboardIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>Contract</p>
              </div>

              <div className='absolute bottom-[25px] w-[90%] border rounded-md bg-verovian-light-purple border-[#2D0048] p-2 flex items-center gap-x-2'>
                  <div className='w-[45px] h-[45px] rounded-full relative border' style={{backgroundImage: `url(${ProfileImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
                    {/* <Image src={ProfileImage} alt='' objectFit='fill' objectPosition={`center`} /> */}
                    {/* <Image  
                      layout="fill" 
                      objectFit='cover'
                      objectPosition="center"
                      src={ProfileImage}
                      className={`rounded-full`}
                      alt='' 
                    /> */}
                  </div>
                  <p className='text-sm font-medium text-verovian-purple'>Anita Jotunheim</p>
              </div>

            </div>
            <div className='w-10/12 min-h-screen h-inherit bg-[#F7F7F7]'>
              <div className='w-full p-4 flex items-center justify-between'>
                <p className='font-medium text-lg text-black'>{pageTitle || `Dashboard`}</p>
                <div className='flex items-center gap-x-4'>
                  <div className='bg-[#fff] flex items-center gap-x-3 rounded p-2 w-[500px]'>
                    <div className='flex items-center justify-center'>
                      <SearchIcon className={`w-7 h-7 text-verovian-purple text-opacity-40`} />
                    </div>
                    <input placeholder='Search for anything' className='w-full placeholder:text-sm' />
                  </div>

                  <button className='bg-verovian-purple rounded p-2 text-white'>
                    <BellIcon className="w-5 h-5" />
                  </button>
                </div>

              </div>
              <div className='w-full px-5'>
                {children}
              </div>
            </div>
        </div>
    </div>
  )
}

export default UserLayout