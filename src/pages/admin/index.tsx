import { AdminSidebar } from '~/components/AdminSidebar';
import { AiOutlineFundView, AiOutlineHome } from 'react-icons/ai';
import { BiLogoBlogger } from 'react-icons/bi';
import { GoProjectSymlink } from 'react-icons/go';
import React from 'react';

export const navigationLinks = [
  { path: '/admin', text: 'Home', icon: <AiOutlineHome size={22} /> },
  {
    path: '/admin/funding',
    text: 'Funding',
    icon: <AiOutlineFundView size={22} />,
  },
  {
    path: '/admin/project',
    text: 'Project',
    icon: <GoProjectSymlink size={22} />,
  },
  { path: '/admin/blogs', text: 'Blogs', icon: <BiLogoBlogger size={22} /> },
]

const Admin = () => {
  return (
    <div className="grid lg:grid-cols-6">
      <div className="sticky hidden h-screen lg:block">
<<<<<<< HEAD
        <AdminSidebar logo="/gsi-logo2.png" routes={navigationLinks} />
=======
        <AdminSidebar logo="gsi-logo2.png" routes={navigationLinks} />
>>>>>>> 48bf7c18d39ae36a1bbbeabf433caaf7fe829dd0
      </div>
      <div className="lg-col-span-6 col-span-5 bg-gray-300"></div>
    </div>
  )
}

export default Admin;
