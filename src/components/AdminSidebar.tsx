import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface AdminSidebarProps {
  logo: string
  routes: {
    path: string
    text: string
    icon: React.JSX.Element
  }[]
}

export const AdminSidebar = ({ logo, routes }: AdminSidebarProps) => {
  const router = useRouter()
  return (
    <div>
      <div className="py-5 pl-2">
        <Link href="/" className="">
          <Image
            src={logo}
            height={90}
            width={90}
            alt="logo"
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className={'grid gap-5 text-xl w-full py-5 px-10'}>
        {routes.map(({ path, text, icon }) => (
          <Link href={path} key={path}>
            <h1
              className={`flex items-end gap-2 font-semibold ${
                router.pathname === path ? 'text-blue-600' : 'text-black'
              }`}
            >
              {icon}
              {text}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  )
}
