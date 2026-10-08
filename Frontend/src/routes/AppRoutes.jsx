import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingLayout from "../layouts/LandingLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

// Public Pages
import Home from "../pages/Home/Home";
import Internships from "../pages/Internships/Internships";
import InternshipDetails from "../pages/InternshipDetails/InternshipDetails";
import Companies from "../pages/Companies/Companies";
import CompanyDetails from "../pages/CompanyDetails/CompanyDetails";
import About from "../pages/About/About";
import HowItWorks from "../pages/HowItWorks/HowItWorks";
import Contact from "../pages/Contact/Contact";

// Authentication
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";

// Forms
import ApplicationForm from "../forms/ApplicationForm";

// Student / Admin Dashboard
import StudentDashboard from "../student/StudentDashboard";
import AdminDashboard from "../student/AdminDashboard";
import DashboardHome from "../student/DashboardHome";
import MyApplications from "../student/MyApplications";
import SavedInternships from "../student/SavedInternships";
import Interviews from "../student/Interviews";
import Notifications from "../student/Notifications";
import StudentProfile from "../student/StudentProfile";
import StudentSettings from "../student/StudentSettings";

// Dashboard Management Pages
import DashboardCompanies from "../pages/DashboardCompanies/DashboardCompanies";
import DashboardInternships from "../pages/DashboardInternships/DashboardInternships";

// Route Protection
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const savedUser = localStorage.getItem("internxUser");

  let user = null;

  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch {
    user = null;
  }

  const isAdmin = user?.role === "admin";

  return (
    <Routes>

      {/* =====================================================
          PUBLIC WEBSITE
      ===================================================== */}

      <Route element={<LandingLayout />}>

        <Route path="/" element={<Home />} />

        <Route
          path="/internships"
          element={<Internships />}
        />

        {/* Internship Details */}
        <Route
          path="/internship-details/:id"
          element={<InternshipDetails />}
        />

        <Route
          path="/companies"
          element={<Companies />}
        />

        <Route
          path="/company-details"
          element={<CompanyDetails />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Application Form */}
        <Route
          path="/apply/:id"
          element={<ApplicationForm />}
        />

      </Route>


      {/* =====================================================
          AUTHENTICATION
      ===================================================== */}

      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

      </Route>


      {/* =====================================================
          PROTECTED DASHBOARD
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

          {/* Main Dashboard */}
          <Route
            path="/dashboard"
            element={
              isAdmin
                ? <AdminDashboard />
                : <StudentDashboard />
            }
          />

          {/* Dashboard Home */}
          <Route
            path="/dashboard/home"
            element={<DashboardHome />}
          />


          {/* =================================================
              ADMIN COMPANY MANAGEMENT
          ================================================= */}

          <Route
            path="/dashboard/companies"
            element={<DashboardCompanies />}
          />


          {/* =================================================
              ADMIN INTERNSHIP MANAGEMENT
          ================================================= */}

          <Route
            path="/dashboard/internships"
            element={<DashboardInternships />}
          />


          {/* =================================================
              STUDENT DASHBOARD
          ================================================= */}

          <Route
            path="/dashboard/applications"
            element={<MyApplications />}
          />

          <Route
            path="/dashboard/saved"
            element={<SavedInternships />}
          />

          <Route
            path="/dashboard/interviews"
            element={<Interviews />}
          />

          <Route
            path="/dashboard/notifications"
            element={<Notifications />}
          />

          <Route
            path="/dashboard/profile"
            element={<StudentProfile />}
          />

          <Route
            path="/dashboard/settings"
            element={<StudentSettings />}
          />

        </Route>

      </Route>

    </Routes>
  );
};

export default AppRoutes;