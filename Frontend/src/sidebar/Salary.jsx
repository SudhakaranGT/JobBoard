import React from 'react'
import InputField from '../Components/InputField'

const Salary = ({handleChange,handleClick}) => {
  return (
    <div>
       <h4 className='text-lg font-medium mb-2'>Salary</h4>
       <div className='mb-4'>
            <button onClick={handleClick} value= "hourly" className='px-4 py-1 border text-baee hover:bg-blue hover:text-white'>Hourly</button>
            <button onClick={handleClick} value= "monthly" className='px-4 py-1 border text-baee hover:bg-blue hover:text-white'>Monthly</button>
            <button onClick={handleClick} value= "yearly" className='px-4 py-1 border text-base hover:bg-blue hover:text-white'>Yearly</button>
       </div>
       <div>
            <label className='sidebar-label-container'>
                    <input type="radio" name='test' value='' onChange={handleChange}/>
                    <span className='checkmark'></span>All
            </label>

            <InputField handleChange={handleChange} value={30} title="< 30000k" name="test"/>

            <InputField handleChange={handleChange} value={50} title="< 50000k" name="test"/>

            <InputField handleChange={handleChange} value={80} title="< 80000k" name="test"/>

            <InputField handleChange={handleChange} value={100} title="< 100000k" name="test"/>
       </div>
    </div>
  )
}

export default Salary
