import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/navbar/NavBar';
import AdminDashboard from './views/admin/dashboard/AdminDashboard';
import QuestionnaireDetail from './views/admin/quissionaire-detail/QuestionnaireDetail';
import SurveyFillment from './views/respondent/quissionaire/fillment/SurveyFillment';
import SurveyFillmentSuccess from './views/respondent/quissionaire/fillment-success/SurveyFillmentSuccess';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <div className="container mx-auto max-w-screen-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Survey App</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/questionnaire/:id" element={<QuestionnaireDetail />} />
          <Route path="/survey/:id" element={<SurveyFillment />} />
          <Route path="/survey/fillment-recorded" element={<SurveyFillmentSuccess />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
