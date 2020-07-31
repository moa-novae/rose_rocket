import React from "react";
import DropdownSingle from "../../../Dropdown/DropdownSingle";
import useGenerateCsv from "./useGenerateCsv";
import { CSVLink } from "react-csv";
import "./generateCsv.scss";
export default function ({ yearlyTasks, driversList }) {
  const {
    csvInterval,
    setCsvInterval,
    possibleInterval,
    driverSelected,
    setDriverSelected,
    handleDownload,
    data,
    headers,
    filename,
  } = useGenerateCsv(yearlyTasks, driversList);
  return (
    <div className="csv-download">
      <h3>CSV summary export</h3>

      <div className="day-option">
        <div className="csv-option-label">Select Interval</div>
        <DropdownSingle
          list={possibleInterval}
          select={setCsvInterval}
          selected={csvInterval}
        />
      </div>
      <div className="driver-option">
        <div className="csv-option-label">Select Driver</div>
        <DropdownSingle
          list={driversList}
          select={setDriverSelected}
          selected={driverSelected}
        />
      </div>

      <CSVLink
        data={data}
        onClick={handleDownload}
        headers={headers}
        filename={filename}
        className="simple-btn csv-download-btn"
      >
        Download CSV
      </CSVLink>
    </div>
  );
}
