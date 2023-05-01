import { Link, Outlet } from 'react-router-dom'
import "../index.css"

const Layout = () => {
  return (
    <>
    <div className='navbar'>
        <Link to="/"><h3>Home</h3> </Link>
        <Link to="/gallery"><h3>Gallery</h3> </Link>
        <Link to="/stadium"><h3>Stadium</h3> </Link>
        <Link to="/shop"><h3>Shop</h3> </Link>
    </div>
    <Outlet/>
    </>
  )
}

export default Layout