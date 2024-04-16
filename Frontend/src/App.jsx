import { Footer,Navbar } from "./Components";
import {Outlet,Navigate,Route,Routes,useLocation} from 'react-router-dom';
import { About, Authentication, Companies, CompanyProfile, JobDetails, Portal, Upload, UserProfile } from "./Pages";


function Logged(){
  const user = false;
  const location = useLocation()

  return user ? <Outlet /> : <Navigate to='user-auth' state={{ from:location}} replace/>
}

function App() {

  const user = true;
   return (
    <main className="bg-[#f7fdfd]">
      <Navbar />
      <Routes>
        <Route element={<Logged/>}>
          <Route path='/' element={ <Navigate to='/find-jobs' replace={true}/>}/>
          <Route path="/find-jobs" element={<Portal/>}/>
          <Route path="/companies" element={<Companies/>}/>
          <Route 
          path={
            user?.user?.accountType === 'seeker'
            ? "/user-profile"
            : "/user-profile:id"
          }
          element = {<UserProfile/>}
          />
          <Route path={"/company-profile"} element={<CompanyProfile />} />
          <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
          <Route path={"/upload-job"} element={<Upload />} />
          <Route path={"/job-detail/:id"} element={<JobDetails />} />
        </Route>
        <Route path='/about-us' element={<About />} />
        <Route path='/user-auth' element={<Authentication />} />
      </Routes>
      {user && <Footer />}
    </main>
  )
}

export default App
