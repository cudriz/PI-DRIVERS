import style from './SearchBar.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seacrhDriver } from '../../redux/actions';

const SearchBar = () => {
    const dispatch = useDispatch()
    const [busqueda, setBusqueda] = useState("")
    const driverData = useSelector((state)=> state.drivers)

    const handleChange = ( event) =>{
        setBusqueda(event.target.value)
    }

    const handleSearch = () => {
      setBusqueda(busqueda)
        dispatch(seacrhDriver(busqueda))

        setBusqueda(" ")
    }

    useEffect(()=>{ }, [driverData])
  return (
    <div className={style.search}>
      <input
        id="search"
        name="search"
        type="search"
        placeholder="Buscar driver"
        value={busqueda}
        onChange={handleChange}
      />

      <button
        onClick={handleSearch}
        value="Search"
        type="submit"
        className={style.button}
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar