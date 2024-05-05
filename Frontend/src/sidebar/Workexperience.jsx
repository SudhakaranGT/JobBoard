import React from 'react'
import InputField from '../Components/InputField'

const Workexperience = ({handleChange}) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>
      <div>
        <label className="sidebar-label-container">
          <input type="radio" name="test" value="Any experience" onChange={handleChange} />
          <span className="checkmark"></span>Any experience
        </label>
        <InputField
          handleChange={handleChange}
          value="work remotely"
          title="Work remotely"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Internship"
          title="Internship"
          name="test"
        />
      </div>
    </div>
  )
}

export default Workexperience
