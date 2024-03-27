import React, { useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
const ExcelReader = () => {
  const [headers, setHeaders] = useState([]);
  const [cols, setCols] = useState([]);

  const onExcelHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      ExcelRenderer(file, (err, response) => {
        if (err) {
          console.log(err);
        } else {
          setHeaders(response.rows[0]);
          setCols(response.rows);
        }
      });
    }
  };

  return (
    <div>
      <div className="mt-15">
        <input
          type="file"
          name="file"
          onChange={onExcelHandler}
          style={{ display: "block", margin: "10px auto" }}
        />
        <h2>EXCEL FILES READER</h2>

        <br />
        <div className="overflow-x-auto p-11">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <tbody className="divide-y divide-gray-200">
              {cols?.map((d, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {d[0]}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d[1]}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d[2]}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d[4]}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d[5]}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d[6]}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d[7]}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d[8]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExcelReader;
