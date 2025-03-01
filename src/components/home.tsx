import React from "react";
import AuthLayout from "./auth/AuthLayout";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <AuthLayout>
      <div className="text-center space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <img src="/vite.svg" alt="Logo" className="h-10 w-10" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to AcademicAI
        </h1>

        <p className="text-gray-600 max-w-md mx-auto">
          An AI-powered academic discussion platform that helps students get
          answers to their questions based on course materials.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-6 border rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
            <h2 className="text-xl font-semibold mb-2 text-blue-800">
              For Professors
            </h2>
            <p className="text-blue-700 mb-4">
              Create courses, upload materials, and review AI-generated
              responses.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Sign in as Professor <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 border rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">
            <h2 className="text-xl font-semibold mb-2 text-indigo-800">
              For Students
            </h2>
            <p className="text-indigo-700 mb-4">
              Join courses with a code, ask questions, and get AI-powered
              answers.
            </p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Sign in as Student <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="pt-6">
          <p className="text-sm text-gray-500">
            New to AcademicAI?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Home;
