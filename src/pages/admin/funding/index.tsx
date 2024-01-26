import { AdminSidebar } from '~/components/AdminSidebar'
import { navigationLinks } from '~/pages/admin'

const Funding = () => {
  return (
    <div className="grid lg:grid-cols-6">
      <div className="sticky hidden h-screen lg:block">
        <AdminSidebar logo="../gsi-logo2.png" routes={navigationLinks} />
      </div>
      <div className="lg-col-span-6 col-span-5 bg-gray-300"></div>
    </div>
  )
}

export default Funding;
