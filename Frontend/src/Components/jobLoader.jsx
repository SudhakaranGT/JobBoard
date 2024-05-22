// loaders/jobLoader.js
export const jobLoader = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/editjob/${params.id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch job data");
  }
  return response.json();
};
