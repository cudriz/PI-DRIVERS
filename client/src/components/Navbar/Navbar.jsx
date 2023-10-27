import style from './Navbar.module.css'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className={style.navbar_cont}>
        <div className={style.navbar_img_cont}>
            <Link to={"/"}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/F1_logo.svg/2560px-F1_logo.svg.png" alt="" /></Link>
        </div>
        <div className={style.navbar_link_cont}>
            <Link to={"/home"}>Home</Link>
            <Link to={"/form"}>Formulario</Link>
        </div>
        <div className={style.navbar_link_cont}>
            <input type="text" placeholder='Search' />
            <button>Search</button>
        </div>
    </div>
  )
}

export default Navbar