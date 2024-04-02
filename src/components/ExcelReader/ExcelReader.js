import React, { useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";
const ExcelReader = () => {
  const [cols, setCols] = useState([]);

  const onExcelHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      ExcelRenderer(file, (err, response) => {
        if (err) {
          console.log(err);
        } else {
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
                  {d.map((v, i) => (
                    <td
                      key={i}
                      className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                    >
                      {v}
                    </td>
                  ))}
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
