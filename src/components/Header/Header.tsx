import { useState, useContext } from 'react';
import './Header.scss';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineUser } from 'react-icons/ai';
import { FiFolder } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthorizationContext } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useContext(AuthorizationContext)
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<boolean>(false)
  const menus = [
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Manage Yard", link: "/locations", icon: FaMapMarkerAlt },
    { name: "Issuance Log", link: "/issuanceLog", icon: TbReportAnalytics },
    { name: "Employees", link: "/EmployeeData", icon: AiOutlineUser },
    { name: "WorkOrders", link: "/workorders", icon: FiFolder },
  ];

  const handleUserLogout = () => {
    setAuthorized(false);
    setUserProfile(false)
    navigate("/")
  }

  return (
    <header className="header">
      <div className='header__content'>
        <h1 className="header__title" onClick={() => navigate("/")} >SyncFlow</h1>
        <div className='header__icon' onClick={() => setDropDown(!dropDown)}>{React.createElement(GiHamburgerMenu, { size: "20" })}</div>
      </div>
      <div className={`header__menu ${dropDown ? "header__menu--visible" : ""}`}>
        {dropDown && menus.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={`header__link ${menu && "header__link--with-margin"}`}
            onClick={() => setDropDown(!dropDown)}
          >
            <div className="icons">{React.createElement(menu?.icon, { size: "20" })}</div>

            <h2 className={`header__link__tooltip header__link__tooltip--hidden`}>
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
      {authorized && <div className="header__user-container">
        <img className='header__user-image'
          onClick={() => setUserProfile(!userProfile)} />
        {userProfile && <div onClick={handleUserLogout} >Logout</div>}
      </div>}

    </header>
  );
};

export default Header;
