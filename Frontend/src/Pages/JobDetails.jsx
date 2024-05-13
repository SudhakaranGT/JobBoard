import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const JobDetails = () => {
    const {id} = useParams();
    const [job,setJob] = useState([]);

    useEffect(() => {
        fetch(``)
    })

  return (
    <div>
      {id}
    </div>
  )
}

export default JobDetails
