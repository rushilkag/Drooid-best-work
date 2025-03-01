import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Search,
  Filter,
  Plus,
  BookOpen,
  SortAsc,
  SortDesc,
} from "lucide-react";
import QuestionItem from "./QuestionItem";
import AskQuestionForm from "./AskQuestionForm";

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  tags: string[];
  responses: Array<{
    id: string;
    content: string;
    author: {
      name: string;
      avatar?: string;
      role: "professor" | "ai";
    };
    timestamp: string;
    isApproved: boolean;
  }>;
  votes: number;
  status: "answered" | "pending" | "unanswered";
}

interface QAForumProps {
  courseId?: string;
  courseName?: string;
  questions?: Question[];
  isLoading?: boolean;
  onAskQuestion?: (question: {
    title: string;
    content: string;
    format: "text" | "latex" | "code";
  }) => void;
}

const QAForum = ({
  courseId = "course-123",
  courseName = "Introduction to Control Systems",
  questions = [
    {
      id: "q-1",
      title: "How do eigenvalues relate to the stability of dynamic systems?",
      content:
        "I'm trying to understand the connection between eigenvalues and the stability of dynamic systems in control theory. Can someone explain how negative real parts of eigenvalues ensure stability?",
      author: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      timestamp: "2 hours ago",
      tags: ["Control Theory", "Linear Algebra", "Eigenvalues"],
      responses: [
        {
          id: "r-1",
          content:
            "Eigenvalues with negative real parts indicate that the system will return to equilibrium after a disturbance. This is because the solution to the system involves terms like e^(λt), where λ is the eigenvalue. When the real part of λ is negative, these terms decay over time, leading to stability.",
          author: {
            name: "Dr. Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith",
            role: "professor",
          },
          timestamp: "1 hour ago",
          isApproved: true,
        },
      ],
      votes: 5,
      status: "answered",
    },
    {
      id: "q-2",
      title: "Difference between open-loop and closed-loop control systems?",
      content:
        "Can someone explain the fundamental differences between open-loop and closed-loop control systems with some practical examples?",
      author: {
        name: "Maria Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      },
      timestamp: "1 day ago",
      tags: ["Control Systems", "Feedback", "System Design"],
      responses: [],
      votes: 3,
      status: "unanswered",
    },
    {
      id: "q-3",
      title: "Implementing PID controllers in software",
      content:
        "I'm working on a project that requires implementing a PID controller in Python. What are the best practices for discretizing continuous PID equations for software implementation?",
      author: {
        name: "Jamal Washington",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamal",
      },
      timestamp: "3 days ago",
      tags: ["PID Controller", "Python", "Implementation"],
      responses: [
        {
          id: "r-2",
          content:
            "The AI has generated a response to this question and it is awaiting professor review.",
          author: {
            name: "AI Assistant",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AI",
            role: "ai",
          },
          timestamp: "2 days ago",
          isApproved: false,
        },
      ],
      votes: 7,
      status: "pending",
    },
  ],
  isLoading = false,
  onAskQuestion = () => {},
}: QAForumProps) => {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "popular">(
    "newest",
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "answered" | "unanswered" | "pending"
  >("all");

  // Filter questions based on search query and filter status
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStatus =
      filterStatus === "all" || question.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Sort questions based on sort order
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortOrder === "newest") {
      // Simple string comparison for demo purposes (in real app would use actual dates)
      return a.timestamp > b.timestamp ? -1 : 1;
    } else if (sortOrder === "oldest") {
      return a.timestamp < b.timestamp ? -1 : 1;
    } else {
      // popular
      return b.votes - a.votes;
    }
  });

  return (
    <div className="w-full bg-gray-50 min-h-screen p-4 md:p-6">
      <Card className="w-full bg-white shadow-sm border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Q&A Forum: {courseName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <TabsList className="mb-2 sm:mb-0">
                <TabsTrigger value="browse" className="px-4">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Questions
                </TabsTrigger>
                <TabsTrigger value="ask" className="px-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Ask a Question
                </TabsTrigger>
              </TabsList>

              {activeTab === "browse" && (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-full"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Select
                      value={filterStatus}
                      onValueChange={(value) => setFilterStatus(value as any)}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Questions</SelectItem>
                        <SelectItem value="answered">Answered</SelectItem>
                        <SelectItem value="unanswered">Unanswered</SelectItem>
                        <SelectItem value="pending">
                          Pending Approval
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={sortOrder}
                      onValueChange={(value) => setSortOrder(value as any)}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        {sortOrder === "newest" || sortOrder === "oldest" ? (
                          sortOrder === "newest" ? (
                            <SortDesc className="h-4 w-4 mr-2" />
                          ) : (
                            <SortAsc className="h-4 w-4 mr-2" />
                          )
                        ) : (
                          <SortDesc className="h-4 w-4 mr-2" />
                        )}
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="popular">Most Votes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <TabsContent value="browse" className="mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : sortedQuestions.length > 0 ? (
                <div className="space-y-4">
                  {sortedQuestions.map((question) => (
                    <QuestionItem key={question.id} {...question} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700">
                    No questions found
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {searchQuery
                      ? "Try adjusting your search or filters"
                      : "Be the first to ask a question!"}
                  </p>
                  {!searchQuery && (
                    <Button
                      onClick={() => setActiveTab("ask")}
                      className="mt-4"
                    >
                      Ask a Question
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="ask" className="mt-6">
              <AskQuestionForm
                courseId={courseId}
                onSubmit={(question) => {
                  onAskQuestion(question);
                  setActiveTab("browse"); // Switch back to browse tab after submission
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default QAForum;
