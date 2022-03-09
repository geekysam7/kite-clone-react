import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/fontawesome-free-solid";
/*

value matches with row key's.

headings = [
  {label: "Name", value: "name"} 
]

rows = [
  {name: "Name Field"}
]

*/

export default function Table({
  headings = [],
  rows = [],
  rowClass,
  headingClass,
  Row,
}) {
  let headingValues = headings.map((heading) => heading.value);

  const [tRows, setTRows] = useState([]);

  useEffect(() => {
    setTRows(rows);
  }, [rows]);

  const [toggle, setToggle] = useState(1);
  const [selectedField, setSelectedField] = useState("");

  const sortRows = (field) => {
    setSelectedField(field);

    let nRows = [...rows];

    nRows.sort((a, b) => {
      //check if field can be converted to number.
      let x = Number(a[field]) ? Number(a[field]) : a[field];
      let y = Number(b[field]) ? Number(b[field]) : b[field];

      if (x > y) return toggle;
      if (x < y) return toggle * -1;
      return 0;
    });

    setToggle(toggle * -1);

    setTRows(nRows);
  };

  return (
    <div className="table-container">
      {headings && headings.length ? (
        <table id="table">
          <thead className={headingClass ? headingClass : ""}>
            <tr>
              {headings.map((heading) => (
                <td
                  className="clickable-heading"
                  key={heading.label}
                  onClick={() => sortRows(heading.value)}
                >
                  <div>
                    <span>{heading.label}</span>
                    {selectedField === heading.value ? (
                      <FontAwesomeIcon
                        icon={toggle === 1 ? faArrowUp : faArrowDown}
                      />
                    ) : (
                      <span className="icon-hover">
                        <FontAwesomeIcon icon={faArrowDown} />
                      </span>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody className={rowClass ? rowClass : "transactions"}>
            {tRows && tRows.length
              ? tRows.map((row) => (
                  <tr key={row}>
                    {Row ? (
                      <Row row={row} />
                    ) : (
                      headingValues.map((heading) => (
                        <td key={heading}>{row[heading]}</td>
                      ))
                    )}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
