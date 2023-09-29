import React, { useEffect } from 'react'

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import BackAbout from './BackAbout';
import BackServiceMedical from './BackServiceMedical';
import BackServiceMapingEcommerce from './BackServiceMapingEcommerce';
import BackContact from './BackContact';
import BackThankYou from './BackThankYou';
import BackHome from './BackHome';
import BackAppoinmentSuccess from './BackAppoinmentSuccess';
import BackView from './BackView';
import BackendDashboard from './BackendDashboard';
import BackFooter from './BackFooter';
import BackPatientReviews from './BackPatientReviews';

export default function BackEndRouter() {
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
        <Routes>          
                        <Route path='/backHome/backendDashboard/backAbout' element={<BackAbout/>} />
                        <Route path='/backHome/backendDashboard/backmedical' element={<BackServiceMedical/>} />
                        <Route path='/backHome/backendDashboard/backmaping-ecommerce' element={<BackServiceMapingEcommerce/>} />
                        <Route path='/backHome/backendDashboard/backContact' element={<BackContact/>} />
                        <Route path='/backHome/backendDashboard/backthank' element={<BackThankYou/>} />
                        <Route path='/backHome/backendDashboard/backsuccess' element={<BackAppoinmentSuccess/>} />
                        <Route path='/backHome/backEndDashboard/backview' element={<BackView/>} />
                        <Route path='/backHome' element={<BackHome/>} />
                        <Route path='/backHome/backendDashboard' element={<BackendDashboard/>}/>
                        <Route path='/backHome/backEndDashboard/backFooter' element={<BackFooter/>}/>
                        <Route path='/backHome/backEndDashboard/backPatientReviews' element={<BackPatientReviews/>}/>

                        
                        
                  
        </Routes>

    </div>
  )
}
