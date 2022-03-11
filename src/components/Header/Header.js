import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  // faBook,
  faBookmark,
  faCompass,
  faSuitcase,
} from "@fortawesome/fontawesome-free-solid";
import Funds from "../Funds/Funds";
import Profile from "../Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navLinkStyle = ({ isActive }) =>
  isActive ? "nav-link--active" : "nav-link--hover";

export default function Header() {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="header-left">
          <div className="pinned-instrument">
            <span className="pinned-instrument--caption">NIFTY 50</span>
            <span className="pinned-instrument--value">17516.30</span>
            <span className="pinned-instrument--change">-0.25</span>
            <span className="pinned-instrument--percentage">%</span>
          </div>
          <div className="pinned-instrument">
            <span className="pinned-instrument--caption">SENSEX</span>
            <span className="pinned-instrument--value">58644.82</span>
            <span className="pinned-instrument--change">-0.24</span>
            <span className="pinned-instrument--percentage">%</span>
          </div>
        </div>
        <div className="header-right">
          <Link to="/dashboard" className="logo">
            <img src="/images/kite.png" alt="Kite logo" />
          </Link>
          <div className="app-nav"></div>
          <nav className="right-nav">
            <ul>
              <li>
                <NavLink to="marketwatch" className={navLinkStyle}>
                  <span className="mobile marketwatch">
                    <FontAwesomeIcon icon={faBookmark} />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard" className={navLinkStyle}>
                  <span className="desktop">Dashboard</span>
                  <span className="mobile">
                    <FontAwesomeIcon icon={faCompass} />
                  </span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="orders" className={navLinkStyle}>
                  <span className="desktop">Orders</span>
                  <span className="mobile">
                    <FontAwesomeIcon icon={faBook} />
                  </span>
                </NavLink>
              </li> */}
              <li>
                <NavLink to="holdings" className={navLinkStyle}>
                  <span className="desktop">Holdings</span>
                  <span className="mobile">
                    <FontAwesomeIcon icon={faSuitcase} />
                  </span>
                </NavLink>
              </li>
              <li>
                <Funds />
              </li>
            </ul>
            <div>
              <Profile />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
