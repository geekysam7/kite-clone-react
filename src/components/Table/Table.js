import React from "react";

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

  return (
    <div className="table-container">
      {headings && headings.length ? (
        <table id="table">
          <thead className={headingClass ? headingClass : ""}>
            <tr>
              {headings.map((heading) => (
                <td key={heading.label}>{heading.label}</td>
              ))}
            </tr>
          </thead>
          <tbody className={rowClass ? rowClass : "transactions"}>
            {rows && rows.length
              ? rows.map((row, i) => (
                  <tr key={row.symbol + i}>
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
