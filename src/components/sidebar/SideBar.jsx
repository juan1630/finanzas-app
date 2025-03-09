import { NavLink, useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/login/loginSlice";

export const SideBar = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/login')
    localStorage.clear();
    dispatch(logout());
  };
  return (
    <aside>
      <ul>
        <li>
          <NavLink to="/home/dashboard"> Home</NavLink>
        </li>
        <li>
          <NavLink to="/home/ingresos"> Ingresos </NavLink>
        </li>
        <li>
          <NavLink to="/home/egresos"> Egresos</NavLink>
        </li>
        <li>
          <a className="btn-close-sesion" onClick={onLogout}>
            Cerra sesion
          </a>
        </li>
      </ul>
    </aside>
  );
};
