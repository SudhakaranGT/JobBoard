import React from "react";
import Location from "./Location";
import Salary from "./Salary";
import Jobposting from "./Jobposting";
import Workexperience from "./Workexperience";
import EmploymentType from "./EmploymentType";

const Sidebar = ({ handleChange, handleClick }) => {
  return (
    <div
      className="space-y-5"
    >
      <h3 className="text-lf font-bold mb-2">Filters</h3>
      <Location handleChange={handleChange} />
      <Salary handleChange={handleChange} handleClick={handleClick} />
      <Jobposting handleChange={handleChange} />
      <Workexperience handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
    </div>
  );
};

export default Sidebar;
