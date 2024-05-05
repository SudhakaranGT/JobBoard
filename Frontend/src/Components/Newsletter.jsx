import React from 'react';
import { FaRocket } from 'react-icons/fa6';

const Newsletter = () => {
  return (
    <div className="bg-white p-6 rounded-md">
      <h2 className=" flex gap-2 text-xl font-bold mb-4"><FaRocket/>News Letter</h2>
      <div className="grid grid-cols-1 gap-4">
        <NewsItem 
          title="Remote Work Opportunities"
          description="Discover how the rise of remote work is reshaping job recruitment in various industries."
        />
        <NewsItem 
          title="Demand for Tech Skills"
          description="Learn about the increasing demand for tech skills and how it's influencing job openings."
        />
        <NewsItem 
          title="Focus on Diversity and Inclusion"
          description="Explore the importance of diversity and inclusion initiatives in job recruitment strategies."
        />
        <NewsItem 
          title="Emerging AI Technologies"
          description="Find out how AI technologies are impacting job requirements and recruitment trends.."
        />
        <NewsItem 
          title="Gig Economy Opportunities"
          description="Discover the growth of gig economy jobs and their impact on traditional employment models."
        />
        <NewsItem 
          title="Upskilling and Reskilling Initiatives"
          description="Learn about the importance of upskilling and reskilling programs in addressing evolving job requirements."
        />
      </div>
    </div>
  );
};

const NewsItem = ({ title, description }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-inner">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default Newsletter;
