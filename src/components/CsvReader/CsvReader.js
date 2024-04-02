import React, { useState } from "react";
import UploadFile from "../../assests/uploadimg.png";
import Papa from "papaparse";
import * as XLSX from "xlsx"; // Import xlsx library

const CsvReader = () => {
  const [data, setData] = useState([]);
  const [columnNames, setColumnsName] = useState([]);

  const onCsvFileHandler = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ["csv", "xlsx"];
    const extension = file?.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      alert("Please upload a CSV or Excel file.");
      return;
    }

    console.log(extension);

    if (extension === "xlsx") {
      // Read Excel file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Extract first sheet
        const sheetName = workbook.SheetNames[0];
        const excelData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);

        // Parse CSV data using PapaParse
        Papa.parse(excelData, {
          header: true,
          skipEmptyLines: true,
          complete: function (result) {
            const { data, meta } = result;
            const { fields } = meta;
            setData(data);
            setColumnsName(fields);
          },
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
      // Parse CSV file using PapaParse directly
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
          const { data, meta } = result;
          const { fields } = meta;
          const newArr = data.filter((value) => value.Table_Number);
          setData(newArr);
          setColumnsName(fields);
        },
      });
    }
  };

  console.log(columnNames);
  console.log(data);

  return (
    <>
      <div className="flex justify-center gap-5 my-5 pt-3">
        <div
          className="me-5 max-w-xl border-4 border-dashed h-[50%] w-[25%] p-8 text-center shadow-xl shadow-blue-300"
          style={{ borderColor: "skyblue", borderRadius: "60px" }}
        >
          <img
            src={UploadFile}
            alt="uploadIcon"
            width={"25%"}
            className=" mx-auto mt-5 pt-3 mb-4"
          />
          <h2 className=" text-xl font-semibold text-gray-500 mb-4 mt-5">
            Drag and Drop file to upload <br /> or{" "}
          </h2>
          <div className="relative flex justify-center">
            <label
              className="flex items-center font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl shadow-md cursor-pointer select-none text-lg px-6 py-2 hover:shadow-xl active:shadow-md"
              htmlFor="csv-upload"
            >
              <span>Upload CSV File</span>
            </label>
            <input
              id="csv-upload"
              type="file"
              accept=".csv,.xlsx"
              name="file"
              onChange={onCsvFileHandler}
              className="absolute -top-full opacity-0"
            />
          </div>
          <p className="text-gray-500 font-medium my-3">
            Supported files: CSV, Excel (.xlsx)
          </p>
        </div>

        {/* 2nd section */}

        <div
          className="ms-5 max-w-xl border-4 border-dashed  h-[50%] w-[25%] rounded-3xl p-8 text-center shadow-xl shadow-blue-300 "
          style={{ borderColor: "skyblue", borderRadius: "60px" }}
        >
          <img
            src={UploadFile}
            alt="uploadIcon"
            width={"25%"}
            className=" mx-auto mt-5 pt-3 mb-4"
          />

          <h2 className=" text-xl font-semibold text-gray-500 mb-4 mt-5">
            Drag and Drop file to upload <br /> or{" "}
          </h2>
          <div className="relative flex justify-center">
            <label
              className="flex items-center font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl shadow-md cursor-pointer select-none text-lg px-6 py-2 hover:shadow-xl active:shadow-md"
              htmlFor="zip-upload"
            >
              <span>Upload Zip file </span>
            </label>
            <input
              id="zip-upload"
              type="file"
              accept=".zip"
              className="absolute -top-full opacity-0"
            />
          </div>
          <p className="text-gray-500 font-medium my-3">
            Supported files: .zip
          </p>
        </div>
      </div>
      <div className="flex justify-center  mb-5 pt-4">
        <button
          type="submit"
          className="btn btn-lg btn-success text-gray px-4 py-2 text-xl font-medium rounded-3xl"
        >
          Save Files
        </button>
      </div>
    </>
  );
};

export default CsvReader;
