import React, { useState } from "react";
import Papa from "papaparse";

const CsvReader = () => {
  const [data, setData] = useState([]);
  const [columnNames, setColumnsName] = useState([]);

  const onHandlerFile = (event) => {
    if (event.target.files[0]) {
      Papa?.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
          const { data, meta } = result;
          const { fields } = meta;
          const newArr = data.filter((value) => {
            if (value.Table_Number) {
              return value;
            }
          });
          setData(newArr);
          setColumnsName(fields);
        },
      });
    }
  };

  return (
    <div>
      <div className="mt-15">
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={onHandlerFile}
          style={{ display: "block", margin: "10px auto" }}
        />
        <h2>CSV FILES READER</h2>

        <br />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                {columnNames?.map((name, i) => (
                  <th
                    key={i}
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data?.map((d, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {d.Table_Number}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d.Table_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d.Table_sub_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d.Breakdown}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d.Section}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d.Units}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d.Value}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {d.Time_Period}
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

export default CsvReader;
