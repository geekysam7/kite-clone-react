import React from "react";

export default function NoData({ svg, title, body }) {
  return (
    <div className="no-data">
      <div className="no-data--image">
        <img src={svg} alt={title} />
      </div>
      <h3 className="no-data--title">{title}</h3>
      <h5 className="no-data--body">{body}</h5>
    </div>
  );
}
