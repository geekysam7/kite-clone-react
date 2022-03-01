import React from "react";

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
          <a href="/dashboard" className="logo">
            <img src="/images/kite.png" alt="Kite logo" />
          </a>
          <div className="app-nav"></div>
          <div className="right-nav"></div>
        </div>
      </div>
    </div>
  );
}