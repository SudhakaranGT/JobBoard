import React from "react";
import InputField from "../Components/InputField";

const Jobposting = ({ handleChange }) => {
  const now = new Date();

  const lastDay = new Date(now - 24 * 60 * 60 * 1000);

  const lastWeek = new Date(now - 7 * 24 * 60 * 60 * 1000);

  const lastMonth = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const lastDayAgo = lastDay.toISOString().slice(0, 10);

  const lastWeekAgo = lastWeek.toISOString().slice(0, 10);

  const lastMonthAgo = lastMonth.toISOString().slice(0, 10);

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date Of Posting</h4>
      <div>
        <label className="sidebar-label-container">
          <input type="radio" name="test" value="" onChange={handleChange} />
          <span className="checkmark"></span>All Time
        </label>
        <InputField
          handleChange={handleChange}
          value={lastDayAgo}
          title="Last 24 Hours"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={lastWeekAgo}
          title="Last 7 Days"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={lastMonthAgo}
          title="Last Month"
          name="test"
        />
      </div>
    </div>
  );
};

export default Jobposting;
