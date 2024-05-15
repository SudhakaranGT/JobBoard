import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar';

const JobDetails = () => {
    const {id} = useParams();
    const [job,setJob] = useState([]);

    useEffect(() => {
        fetch(``)
    })

  return (
    <div>
      <Navbar/>
      <Footer />
    </div>
  )
}

export default JobDetails
