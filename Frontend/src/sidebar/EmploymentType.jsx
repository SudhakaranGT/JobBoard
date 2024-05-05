import React from 'react';
import InputField from '../Components/InputField';

const EmploymentType = ({handleChange}) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Employment Type</h4>
      <div>
        <label className="sidebar-label-container">
          <input type="radio" name="test" value="Any experience" onChange={handleChange} />
          <span className="checkmark"></span>Any
        </label>
        <InputField
          handleChange={handleChange}
          value="Full-Time"
          title="Full-time"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Temporary"
          title="Temporary"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Part-time"
          title="Part-time"
          name="test"
        />
      </div>
    </div>
  )
}

export default EmploymentType
