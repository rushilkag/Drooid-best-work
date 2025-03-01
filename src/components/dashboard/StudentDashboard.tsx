import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import CourseList from "./CourseList";
import JoinCourseModal from "../courses/JoinCourseModal";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

interface StudentDashboardProps {
  userName?: string;
  userAvatar?: string;
  unreadNotifications?: number;
  onLogout?: () => void;
  onJoinCourse?: (courseCode: string) => void;
  onViewCourse?: (courseId: string) => void;
  courses?: Array<{
    id: string;
    title: string;
    description: string;
    students: number;
    joinCode: string;
    createdAt: string;
    coverImage?: string;
    status: "active" | "archived" | "draft";
  }>;
}

const StudentDashboard = ({
  userName = "Student User",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Student",
  unreadNotifications = 2,
  onLogout = () => {},
  onJoinCourse = () => {},
  onViewCourse = () => {},
  courses = [
    {
      id: "course-1",
      title: "Introduction to Control Systems",
      description:
        "Fundamentals of control theory, feedback systems, and stability analysis.",
      students: 42,
      joinCode: "CTRL101",
      createdAt: "2023-09-01",
      coverImage:
        "https://images.unsplash.com/photo-1581093458791-9f3c3ae93ef1?q=80&w=2070",
      status: "active",
    },
    {
      id: "course-2",
      title: "Advanced Linear Algebra",
      description:
        "Vector spaces, linear transformations, eigenvalues, and applications.",
      students: 28,
      joinCode: "MATH302",
      createdAt: "2023-08-15",
      coverImage:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070",
      status: "active",
    },
  ],
}: StudentDashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleJoinCourse = (courseCode: string) => {
    setIsJoining(true);

    // Simulate API call
    setTimeout(() => {
      onJoinCourse(courseCode);
      setIsJoining(false);
      setJoinModalOpen(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader
        userName={userName}
        userAvatar={userAvatar}
        userRole="student"
        unreadNotifications={unreadNotifications}
        onLogout={onLogout}
        onToggleSidebar={handleToggleSidebar}
      />

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Student Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your enrolled courses and join new ones
            </p>
          </div>
          <Button
            onClick={() => setJoinModalOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle size={18} />
            <span>Join Course</span>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <CourseList
            courses={courses}
            userRole="student"
            onViewCourse={onViewCourse}
          />
        </div>
      </main>

      <JoinCourseModal
        isOpen={joinModalOpen}
        onOpenChange={setJoinModalOpen}
        onJoinCourse={handleJoinCourse}
        isJoining={isJoining}
      />
    </div>
  );
};

export default StudentDashboard;
