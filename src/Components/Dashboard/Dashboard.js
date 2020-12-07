import React from 'react'
import DonorDashboard from './DonorDashboard';
import RecipientDashboard from './RecipientDashboard';

function Dashboard() {
    let donor = localStorage.getItem('donor');
    if (donor)
        return <DonorDashboard />
    else
        return <RecipientDashboard />
}
export default Dashboard;
