import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import {
  CheckCircle,
  XCircle,
  Edit,
  Clock,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import QuestionItem from "./QuestionItem";

interface AIResponse {
  id: string;
  questionId: string;
  content: string;
  generatedAt: string;
  status: "pending" | "approved" | "rejected" | "edited";
  questionTitle: string;
  questionContent: string;
  questionAuthor: {
    name: string;
    avatar?: string;
  };
  questionTimestamp: string;
  questionTags: string[];
}

interface ApprovalQueueProps {
  courseId?: string;
  responses?: AIResponse[];
  onApprove?: (responseId: string) => void;
  onReject?: (responseId: string) => void;
  onEdit?: (responseId: string, editedContent: string) => void;
  isLoading?: boolean;
}

const ApprovalQueue = ({
  courseId = "course-123",
  responses = [
    {
      id: "resp-1",
      questionId: "q-1",
      content:
        "Eigenvalues with negative real parts indicate that the system will return to equilibrium after a disturbance. This is because the solution to the system involves terms like e^(λt), where λ is the eigenvalue. When the real part of λ is negative, these terms decay over time, leading to stability.",
      generatedAt: "2 hours ago",
      status: "pending",
      questionTitle:
        "How do eigenvalues relate to the stability of dynamic systems?",
      questionContent:
        "I'm trying to understand the connection between eigenvalues and the stability of dynamic systems in control theory. Can someone explain how negative real parts of eigenvalues ensure stability?",
      questionAuthor: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      questionTimestamp: "3 hours ago",
      questionTags: ["Control Theory", "Linear Algebra", "Eigenvalues"],
    },
    {
      id: "resp-2",
      questionId: "q-2",
      content:
        "The Central Limit Theorem states that when independent random variables are added, their properly normalized sum tends toward a normal distribution even if the original variables themselves are not normally distributed. This is why the normal distribution appears so frequently in nature and statistics.",
      generatedAt: "5 hours ago",
      status: "pending",
      questionTitle:
        "Can someone explain the Central Limit Theorem in simple terms?",
      questionContent:
        "I'm struggling to understand the Central Limit Theorem and why it's so important in statistics. Could someone provide a simple explanation with an example?",
      questionAuthor: {
        name: "Maria Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      },
      questionTimestamp: "6 hours ago",
      questionTags: ["Statistics", "Probability", "Data Science"],
    },
    {
      id: "resp-3",
      questionId: "q-3",
      content:
        "Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle of the group cannot be described independently of the state of the others, including when the particles are separated by a large distance.",
      generatedAt: "1 day ago",
      status: "pending",
      questionTitle: "What is quantum entanglement and why is it important?",
      questionContent:
        "I've heard about quantum entanglement but don't fully understand the concept. How does it work and why is it considered so important in quantum physics?",
      questionAuthor: {
        name: "James Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      },
      questionTimestamp: "1 day ago",
      questionTags: ["Quantum Physics", "Entanglement", "Theoretical Physics"],
    },
  ],
  onApprove = () => {},
  onReject = () => {},
  onEdit = () => {},
  isLoading = false,
}: ApprovalQueueProps) => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedResponse, setSelectedResponse] = useState<AIResponse | null>(
    null,
  );
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResponses = responses.filter((response) => {
    if (activeTab !== "all" && response.status !== activeTab) return false;
    if (
      searchQuery &&
      !response.questionTitle.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleSelectResponse = (response: AIResponse) => {
    setSelectedResponse(response);
    setEditedContent(response.content);
    setEditMode(false);
  };

  const handleApprove = () => {
    if (selectedResponse) {
      onApprove(selectedResponse.id);
      // In a real app, you might want to update the local state here or refetch data
    }
  };

  const handleReject = () => {
    if (selectedResponse) {
      onReject(selectedResponse.id);
      // In a real app, you might want to update the local state here or refetch data
    }
  };

  const handleEdit = () => {
    if (selectedResponse && editMode) {
      onEdit(selectedResponse.id, editedContent);
      setEditMode(false);
      // In a real app, you might want to update the local state here or refetch data
    } else {
      setEditMode(true);
    }
  };

  const pendingCount = responses.filter((r) => r.status === "pending").length;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            AI Response Approval Queue
          </h2>
          <p className="text-gray-500">
            Review and approve AI-generated responses to student questions
          </p>
        </div>
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-800 flex items-center gap-1"
        >
          <AlertCircle size={14} />
          <span>{pendingCount} Pending</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Response Queue</CardTitle>
              <CardDescription>
                AI-generated responses awaiting review
              </CardDescription>

              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="pl-8 pr-4 py-2 w-full border rounded-md text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>

            <CardContent>
              <Tabs
                defaultValue="pending"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="pending" className="flex-1">
                    Pending
                    <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                      {responses.filter((r) => r.status === "pending").length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="approved" className="flex-1">
                    Approved
                    <Badge className="ml-2 bg-green-100 text-green-800">
                      {responses.filter((r) => r.status === "approved").length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="m-0">
                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {isLoading ? (
                      <div className="text-center py-8 text-gray-500">
                        Loading responses...
                      </div>
                    ) : filteredResponses.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No pending responses
                      </div>
                    ) : (
                      filteredResponses.map((response) => (
                        <div
                          key={response.id}
                          className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedResponse?.id === response.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                          onClick={() => handleSelectResponse(response)}
                        >
                          <h4 className="font-medium text-gray-900 line-clamp-1">
                            {response.questionTitle}
                          </h4>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            <span>{response.generatedAt}</span>
                            <span className="mx-1">•</span>
                            <span>{response.questionAuthor.name}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="approved" className="m-0">
                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {isLoading ? (
                      <div className="text-center py-8 text-gray-500">
                        Loading responses...
                      </div>
                    ) : filteredResponses.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No approved responses
                      </div>
                    ) : (
                      filteredResponses.map((response) => (
                        <div
                          key={response.id}
                          className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedResponse?.id === response.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                          onClick={() => handleSelectResponse(response)}
                        >
                          <h4 className="font-medium text-gray-900 line-clamp-1">
                            {response.questionTitle}
                          </h4>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            <span>{response.generatedAt}</span>
                            <span className="mx-1">•</span>
                            <span>{response.questionAuthor.name}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="all" className="m-0">
                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {isLoading ? (
                      <div className="text-center py-8 text-gray-500">
                        Loading responses...
                      </div>
                    ) : filteredResponses.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No responses found
                      </div>
                    ) : (
                      filteredResponses.map((response) => (
                        <div
                          key={response.id}
                          className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedResponse?.id === response.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                          onClick={() => handleSelectResponse(response)}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900 line-clamp-1">
                              {response.questionTitle}
                            </h4>
                            {response.status === "pending" && (
                              <Badge
                                variant="outline"
                                className="bg-yellow-50 text-yellow-800 text-xs"
                              >
                                Pending
                              </Badge>
                            )}
                            {response.status === "approved" && (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-800 text-xs"
                              >
                                Approved
                              </Badge>
                            )}
                            {response.status === "rejected" && (
                              <Badge
                                variant="outline"
                                className="bg-red-50 text-red-800 text-xs"
                              >
                                Rejected
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            <span>{response.generatedAt}</span>
                            <span className="mx-1">•</span>
                            <span>{response.questionAuthor.name}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedResponse ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuestionItem
                    title={selectedResponse.questionTitle}
                    content={selectedResponse.questionContent}
                    author={selectedResponse.questionAuthor}
                    timestamp={selectedResponse.questionTimestamp}
                    tags={selectedResponse.questionTags}
                    status="unanswered"
                    responses={[]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>AI-Generated Response</span>
                    <Badge
                      variant="outline"
                      className="bg-purple-100 text-purple-800"
                    >
                      AI Generated
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {editMode ? (
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="min-h-[200px] w-full font-normal text-base"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-md border">
                      <p className="text-gray-800">
                        {selectedResponse.content}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>Generated {selectedResponse.generatedAt}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={handleEdit}
                      >
                        <Edit size={16} />
                        {editMode ? "Save Edits" : "Edit Response"}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleReject}
                      >
                        <XCircle size={16} />
                        Reject
                      </Button>
                      <Button
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleApprove}
                      >
                        <CheckCircle size={16} />
                        Approve & Publish
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-12">
              <div className="text-center">
                <div className="rounded-full bg-gray-100 p-3 inline-block mb-4">
                  <Filter className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No Response Selected
                </h3>
                <p className="text-gray-500 max-w-md">
                  Select a response from the queue to review, edit, and approve
                  or reject it.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalQueue;
