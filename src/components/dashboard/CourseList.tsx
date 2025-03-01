import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  PlusCircle,
  Users,
  BookOpen,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Course {
  id: string;
  title: string;
  description: string;
  students: number;
  joinCode: string;
  createdAt: string;
  coverImage?: string;
  status: "active" | "archived" | "draft";
}

interface CourseListProps {
  courses?: Course[];
  onCreateCourse?: () => void;
  onViewCourse?: (courseId: string) => void;
  userRole?: "professor" | "student";
}

const CourseList = ({
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
    {
      id: "course-4",
      title: "Machine Learning for Engineers",
      description:
        "Practical applications of ML algorithms in engineering problems.",
      students: 0,
      joinCode: "MLENG400",
      createdAt: "2023-12-01",
      coverImage:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065",
      status: "draft",
    },
  ],
  onCreateCourse = () => {},
  onViewCourse = () => {},
  userRole = "professor",
}: CourseListProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateCourse = () => {
    setIsCreateModalOpen(true);
    onCreateCourse();
  };

  const handleViewCourse = (courseId: string) => {
    onViewCourse(courseId);
  };

  // Filter courses based on status
  const activeCourses = courses.filter((course) => course.status === "active");
  const draftCourses = courses.filter((course) => course.status === "draft");
  const archivedCourses = courses.filter(
    (course) => course.status === "archived",
  );

  return (
    <div className="w-full bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        {userRole === "professor" && (
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="flex items-center gap-2"
                onClick={handleCreateCourse}
              >
                <PlusCircle size={18} />
                <span>Create Course</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0">
              {/* Using a div as placeholder since CreateCourseModal is not properly imported */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Create New Course
                </h2>
                <p className="text-gray-500 mb-4">
                  Fill in the details to create a new course.
                </p>
                <Button onClick={() => setIsCreateModalOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {activeCourses.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Active Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewCourse={handleViewCourse}
                userRole={userRole}
              />
            ))}
          </div>
        </div>
      )}

      {draftCourses.length > 0 && userRole === "professor" && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Draft Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {draftCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewCourse={handleViewCourse}
                userRole={userRole}
              />
            ))}
          </div>
        </div>
      )}

      {archivedCourses.length > 0 && userRole === "professor" && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Archived Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewCourse={handleViewCourse}
                userRole={userRole}
              />
            ))}
          </div>
        </div>
      )}

      {courses.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No courses yet
          </h3>
          <p className="text-gray-500 mb-6">
            {userRole === "professor"
              ? "Create your first course to get started"
              : "Join a course using a course code to get started"}
          </p>
          {userRole === "professor" ? (
            <Button
              onClick={handleCreateCourse}
              className="flex items-center gap-2 mx-auto"
            >
              <PlusCircle size={18} />
              <span>Create Course</span>
            </Button>
          ) : (
            <Button variant="outline" className="mx-auto">
              Join Course
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

interface CourseCardProps {
  course: Course;
  onViewCourse: (courseId: string) => void;
  userRole: "professor" | "student";
}

const CourseCard = ({ course, onViewCourse, userRole }: CourseCardProps) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    archived: "bg-gray-100 text-gray-800",
    draft: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div
        className="h-32 bg-cover bg-center"
        style={{
          backgroundImage: course.coverImage
            ? `url(${course.coverImage})`
            : "linear-gradient(to right, #4f46e5, #3b82f6)",
        }}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{course.title}</CardTitle>
          {userRole === "professor" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Course</DropdownMenuItem>
                <DropdownMenuItem>Copy Join Code</DropdownMenuItem>
                {course.status === "active" && (
                  <DropdownMenuItem>Archive Course</DropdownMenuItem>
                )}
                {course.status === "archived" && (
                  <DropdownMenuItem>Restore Course</DropdownMenuItem>
                )}
                {course.status === "draft" && (
                  <DropdownMenuItem>Publish Course</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Badge className={`${statusColors[course.status]} mt-1`}>
          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {course.description}
        </p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Users size={16} className="mr-2" />
            <span>{course.students} Students</span>
          </div>
          {userRole === "professor" && (
            <div className="flex items-center text-sm text-gray-500">
              <BookOpen size={16} className="mr-2" />
              <span>Join Code: {course.joinCode}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            <span>Created: {course.createdAt}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onViewCourse(course.id)}
          variant="outline"
          className="w-full"
        >
          {course.status === "draft" ? "Continue Setup" : "View Course"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseList;
