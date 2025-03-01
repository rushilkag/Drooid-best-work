import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { BookOpen, Clock, Users, Bell, CheckCircle } from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import CourseList from "./CourseList";
import CreateCourseModal from "../courses/CreateCourseModal";
import ApprovalQueue from "../qa/ApprovalQueue";

interface ProfessorDashboardProps {
  userName?: string;
  userAvatar?: string;
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
  pendingResponses?: number;
  recentActivity?: Array<{
    id: string;
    type: "question" | "response" | "approval";
    title: string;
    course: string;
    timestamp: string;
  }>;
  onLogout?: () => void;
  onCreateCourse?: () => void;
  onViewCourse?: (courseId: string) => void;
}

const ProfessorDashboard = ({
  userName = "Dr. Smith",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith",
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
    {
      id: "course-3",
      title: "Quantum Computing Fundamentals",
      description:
        "Introduction to quantum bits, gates, algorithms, and applications.",
      students: 35,
      joinCode: "QCOMP200",
      createdAt: "2023-10-05",
      coverImage:
        "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?q=80&w=2044",
      status: "active",
    },
  ],
  pendingResponses = 5,
  recentActivity = [
    {
      id: "act-1",
      type: "question",
      title: "How do eigenvalues relate to stability?",
      course: "Introduction to Control Systems",
      timestamp: "2 hours ago",
    },
    {
      id: "act-2",
      type: "response",
      title: "AI response to question about PID controllers",
      course: "Introduction to Control Systems",
      timestamp: "3 hours ago",
    },
    {
      id: "act-3",
      type: "approval",
      title: "You approved a response about matrix decomposition",
      course: "Advanced Linear Algebra",
      timestamp: "1 day ago",
    },
  ],
  onLogout = () => {},
  onCreateCourse = () => {},
  onViewCourse = () => {},
}: ProfessorDashboardProps) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "courses" | "approvals"
  >("overview");
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCreateCourse = () => {
    setIsCreateCourseModalOpen(true);
    onCreateCourse();
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader
        userName={userName}
        userAvatar={userAvatar}
        userRole="professor"
        unreadNotifications={pendingResponses}
        onLogout={onLogout}
        onToggleSidebar={handleToggleSidebar}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`bg-white border-r border-gray-200 w-64 flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static h-[calc(100vh-5rem)] z-10 top-20`}
        >
          <div className="p-4 space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Dashboard
              </h3>
              <nav className="space-y-1">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "courses" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("courses")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  My Courses
                </Button>
                <Button
                  variant={activeTab === "approvals" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("approvals")}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approval Queue
                  {pendingResponses > 0 && (
                    <Badge className="ml-auto bg-red-500">
                      {pendingResponses}
                    </Badge>
                  )}
                </Button>
              </nav>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleCreateCourse}
                >
                  Create New Course
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as any)}
          >
            <TabsContent value="overview" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Total Courses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-2xl font-bold">
                        {courses.length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Total Students
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-2xl font-bold">
                        {courses.reduce(
                          (total, course) => total + course.students,
                          0,
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Pending Approvals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-2xl font-bold">
                        {pendingResponses}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div
                          className={`rounded-full p-2 mr-3 ${activity.type === "question" ? "bg-blue-100" : activity.type === "response" ? "bg-purple-100" : "bg-green-100"}`}
                        >
                          {activity.type === "question" ? (
                            <BookOpen className="h-4 w-4 text-blue-600" />
                          ) : activity.type === "response" ? (
                            <Bell className="h-4 w-4 text-purple-600" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.course}
                          </p>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courses
                        .filter((course) => course.status === "active")
                        .slice(0, 3)
                        .map((course) => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                            onClick={() => onViewCourse(course.id)}
                          >
                            <div className="flex items-center">
                              <div
                                className="w-10 h-10 rounded bg-cover bg-center mr-3"
                                style={{
                                  backgroundImage: course.coverImage
                                    ? `url(${course.coverImage})`
                                    : "linear-gradient(to right, #4f46e5, #3b82f6)",
                                }}
                              />
                              <div>
                                <p className="font-medium">{course.title}</p>
                                <p className="text-xs text-gray-500">
                                  {course.students} students
                                </p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              Active
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pendingResponses > 0 ? (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">
                          You have {pendingResponses} AI-generated responses
                          awaiting your review and approval.
                        </p>
                        <Button
                          onClick={() => setActiveTab("approvals")}
                          className="w-full"
                        >
                          Review Approval Queue
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-gray-500">No pending approvals</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="mt-0">
              <CourseList
                courses={courses}
                onCreateCourse={handleCreateCourse}
                onViewCourse={onViewCourse}
                userRole="professor"
              />
            </TabsContent>

            <TabsContent value="approvals" className="mt-0">
              <ApprovalQueue courseId="all" />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CreateCourseModal
        open={isCreateCourseModalOpen}
        onOpenChange={setIsCreateCourseModalOpen}
      />
    </div>
  );
};

export default ProfessorDashboard;
