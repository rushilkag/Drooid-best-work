import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { BookOpen, FileText, Users, Info, ChevronLeft } from "lucide-react";
import CourseMaterials from "./CourseMaterials";
import QAForum from "../qa/QAForum";
import ApprovalQueue from "../qa/ApprovalQueue";

interface CourseViewProps {
  courseId?: string;
  courseName?: string;
  courseDescription?: string;
  instructor?: {
    name: string;
    avatar?: string;
  };
  studentCount?: number;
  joinCode?: string;
  createdAt?: string;
  userRole?: "professor" | "student";
  onBack?: () => void;
}

const CourseView = ({
  courseId = "course-123",
  courseName = "Introduction to Control Systems",
  courseDescription = "Fundamentals of control theory, feedback systems, and stability analysis.",
  instructor = {
    name: "Dr. Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith",
  },
  studentCount = 42,
  joinCode = "CTRL101",
  createdAt = "2023-09-01",
  userRole = "professor",
  onBack = () => {},
}: CourseViewProps) => {
  const [activeTab, setActiveTab] = useState<
    "materials" | "qa" | "approvals" | "info"
  >("materials");

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 text-gray-500 hover:text-gray-700"
            onClick={onBack}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {courseName}
              </h1>
              <p className="text-gray-600 mt-1">{courseDescription}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={instructor.avatar} alt={instructor.name} />
                  <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{instructor.name}</p>
                  <p className="text-xs text-gray-500">Instructor</p>
                </div>
              </div>

              <Separator orientation="vertical" className="h-8" />

              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-500 mr-1" />
                <span className="text-sm">{studentCount} Students</span>
              </div>

              {userRole === "professor" && (
                <>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 font-mono"
                    >
                      {joinCode}
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "materials" | "qa" | "approvals" | "info")
            }
            className="mt-6"
          >
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
              <TabsTrigger
                value="materials"
                className="flex items-center gap-1"
              >
                <FileText className="h-4 w-4" />
                <span>Materials</span>
              </TabsTrigger>
              <TabsTrigger value="qa" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Q&A Forum</span>
              </TabsTrigger>
              {userRole === "professor" && (
                <TabsTrigger
                  value="approvals"
                  className="flex items-center gap-1"
                >
                  <Badge
                    variant="outline"
                    className="h-5 w-5 p-0 flex items-center justify-center bg-yellow-100 text-yellow-800 mr-1"
                  >
                    3
                  </Badge>
                  <span>Approvals</span>
                </TabsTrigger>
              )}
              <TabsTrigger value="info" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>Course Info</span>
              </TabsTrigger>
            </TabsList>

            {/* Course Content */}
            <TabsContent value="materials">
              <div className="container mx-auto px-4 py-6">
                <CourseMaterials
                  courseId={courseId}
                  courseName={courseName}
                  isInstructor={userRole === "professor"}
                />
              </div>
            </TabsContent>

            <TabsContent value="qa">
              <div className="container mx-auto px-4 py-6">
                <QAForum courseId={courseId} courseName={courseName} />
              </div>
            </TabsContent>

            {userRole === "professor" && (
              <TabsContent value="approvals">
                <div className="container mx-auto px-4 py-6">
                  <ApprovalQueue courseId={courseId} />
                </div>
              </TabsContent>
            )}

            <TabsContent value="info">
              <div className="container mx-auto px-4 py-6">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Course Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Details</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Course Name</p>
                            <p className="font-medium">{courseName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p>{courseDescription}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Created On</p>
                            <p>{createdAt}</p>
                          </div>
                          {userRole === "professor" && (
                            <div>
                              <p className="text-sm text-gray-500">Join Code</p>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 font-mono"
                                >
                                  {joinCode}
                                </Badge>
                                <Button variant="ghost" size="sm">
                                  Copy
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Instructor</h3>
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={instructor.avatar}
                              alt={instructor.name}
                            />
                            <AvatarFallback>
                              {instructor.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{instructor.name}</p>
                            <p className="text-sm text-gray-500">
                              Course Instructor
                            </p>
                          </div>
                        </div>

                        <h3 className="text-lg font-medium mb-4 mt-6">
                          Students
                        </h3>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-gray-500" />
                          <span>{studentCount} enrolled students</span>
                        </div>

                        {userRole === "professor" && (
                          <Button className="mt-4" variant="outline">
                            Manage Students
                          </Button>
                        )}
                      </div>
                    </div>

                    {userRole === "professor" && (
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-4">
                          Course Management
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <Button variant="outline">Edit Course Details</Button>
                          <Button
                            variant="outline"
                            className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                          >
                            Archive Course
                          </Button>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Delete Course
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
