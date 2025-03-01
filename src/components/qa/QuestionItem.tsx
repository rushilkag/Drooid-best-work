import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ThumbsUp, MessageCircle, Clock } from "lucide-react";
import { Separator } from "../ui/separator";

interface Response {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: "professor" | "ai";
  };
  timestamp: string;
  isApproved: boolean;
}

interface QuestionItemProps {
  id?: string;
  title?: string;
  content?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  timestamp?: string;
  tags?: string[];
  responses?: Response[];
  votes?: number;
  status?: "answered" | "pending" | "unanswered";
}

const QuestionItem = ({
  id = "q-123",
  title = "How do eigenvalues relate to the stability of dynamic systems?",
  content = "I'm trying to understand the connection between eigenvalues and the stability of dynamic systems in control theory. Can someone explain how negative real parts of eigenvalues ensure stability?",
  author = {
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  timestamp = "2 hours ago",
  tags = ["Control Theory", "Linear Algebra", "Eigenvalues"],
  responses = [
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
  votes = 5,
  status = "answered",
}: QuestionItemProps) => {
  // Status color mapping
  const statusColors = {
    answered: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    unanswered: "bg-red-100 text-red-800",
  };

  return (
    <Card className="w-full mb-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center mt-1 space-x-2">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{author.name}</span>
              </div>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {timestamp}
              </span>
            </div>
          </div>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <p className="text-gray-700">{content}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 flex items-center"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{votes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 flex items-center"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{responses.length}</span>
          </Button>
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>

      {responses.length > 0 && (
        <div className="px-6 pb-4">
          <Separator className="my-2" />
          <h4 className="text-sm font-medium text-gray-700 mb-2">Top Answer</h4>
          {responses.slice(0, 1).map((response) => (
            <div key={response.id} className="pl-4 border-l-2 border-green-500">
              <p className="text-gray-700 text-sm">{response.content}</p>
              <div className="flex items-center mt-2">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarImage
                    src={response.author.avatar}
                    alt={response.author.name}
                  />
                  <AvatarFallback>
                    {response.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-gray-700">
                  {response.author.name}
                </span>
                {response.author.role === "professor" && (
                  <Badge
                    className="ml-2 bg-blue-100 text-blue-800 text-xs"
                    variant="outline"
                  >
                    Professor
                  </Badge>
                )}
                {response.author.role === "ai" && (
                  <Badge
                    className="ml-2 bg-purple-100 text-purple-800 text-xs"
                    variant="outline"
                  >
                    AI Generated
                  </Badge>
                )}
                <span className="text-xs text-gray-500 ml-2">
                  {response.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default QuestionItem;
