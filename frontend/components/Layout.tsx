import { useRouter } from "next/router"
import Footer from "./Footer/Footer"
import Navbar from "./Navbar/Navbar"

type Props = {
  children: React.ReactNode,
}

const Layout = ({ children }: Props) => {

  const router = useRouter()

  if(router.pathname === '/login' || router.pathname === '/signup') return (
    <div className="content">
      { children }
    </div>
  )
  
  return (
    <div className="content">
      <Navbar />
      { children }
      <Footer />
    </div>
  );
}
 
export default Layout;