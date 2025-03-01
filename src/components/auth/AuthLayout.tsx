import React from "react";
import { Card } from "../ui/card";
import AuthForm from "./AuthForm";

interface AuthLayoutProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  showAuthForm?: boolean;
}

const AuthLayout = ({
  children,
  title = "Academic Q&A Platform",
  subtitle = "A modern platform for academic discussions powered by AI",
  showAuthForm = true,
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <img src="/vite.svg" alt="Logo" className="h-10 w-10 mr-3" />
            <h1 className="text-2xl font-bold">AcademicAI</h1>
          </div>
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6">{title}</h2>
            <p className="text-xl text-blue-100 mb-8">{subtitle}</p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    AI-Powered Responses
                  </h3>
                  <p className="text-blue-100">
                    Get instant answers to your questions generated from course
                    materials
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Professor Verified
                  </h3>
                  <p className="text-blue-100">
                    All AI responses are reviewed by professors for accuracy
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Organized Materials
                  </h3>
                  <p className="text-blue-100">
                    Access all course materials in one centralized location
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-blue-200">
          © 2023 AcademicAI. All rights reserved.
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {showAuthForm ? <AuthForm /> : children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
