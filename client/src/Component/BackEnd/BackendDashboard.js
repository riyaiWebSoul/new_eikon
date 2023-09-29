import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BackAbout from './BackAbout';
import BackServiceMedical from './BackServiceMedical';
import BackServiceMapingEcommerce from './BackServiceMapingEcommerce';
import BackContact from './BackContact';
import BackThankYou from './BackThankYou';
import BackHome from './BackHome';
import BackAppoinmentSuccess from './BackAppoinmentSuccess';
import BackView from './BackView';

export default function BackendDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top whenever the route changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <h1>Eikon BackEnd Page</h1>
      <div>
        <Link to="/backHome/backEndDashboard/backAbout">
          <button className='btn'>About</button>
        </Link>
        <Link to="/backHome/backEndDashboard/backView">
          <button className='btn'>View</button>
        </Link>
        <Link to="/backHome/backEndDashboard/backFooter">
          <button className='btn'>Footer</button>
        </Link>
        <Link to="/backHome/backEndDashboard/backPatientReviews">
          <button className='btn'>Patient Review</button>
        </Link>
      </div>
      {/* Add more links/buttons for other routes as needed */}
    </div>
  );
}
