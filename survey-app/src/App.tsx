import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import AdminDashboard from './views/admin/dashboard/AdminDashboard';
import QuestionnaireDetail from './views/admin/QuestionnaireDetail';
import SurveyFillment from './views/public/SurveyFillment';

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
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

// import React from 'react';
// import { ApolloProvider } from '@apollo/client';
// import { client } from './apollo/client';
// import SurveyList from './components/SurveyList';
// import CreateSurvey from './components/CreateSurvey';
// import FillSurvey from './components/FillSurvey';

// const App: React.FC = () => {
//   return (
//     <ApolloProvider client={client}>
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Survey App</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Create Survey</h2>
//             <CreateSurvey />
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Survey List</h2>
//             <SurveyList />
//           </div>
//         </div>
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-2">Fill Survey</h2>
//           <FillSurvey />
//         </div>
//       </div>
//     </ApolloProvider>
//   );
// };

export default App;
