import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Code, FileText, Image, Send, Type } from "lucide-react";

interface AskQuestionFormProps {
  onSubmit?: (question: {
    title: string;
    content: string;
    format: "text" | "latex" | "code";
  }) => void;
  courseId?: string;
  isSubmitting?: boolean;
}

const AskQuestionForm = ({
  onSubmit = () => {},
  courseId = "course-123",
  isSubmitting = false,
}: AskQuestionFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [format, setFormat] = useState<"text" | "latex" | "code">("text");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, format });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Ask a Question</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Question Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a clear, concise title for your question"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="content" className="block text-sm font-medium">
                  Question Details
                </label>
                <div className="flex items-center space-x-2 border rounded-md">
                  <button
                    type="button"
                    onClick={() => setFormat("text")}
                    className={`px-3 py-1.5 flex items-center gap-1 ${format === "text" ? "bg-blue-100 text-blue-700" : ""}`}
                  >
                    <Type size={16} />
                    <span>Text</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat("latex")}
                    className={`px-3 py-1.5 flex items-center gap-1 ${format === "latex" ? "bg-blue-100 text-blue-700" : ""}`}
                  >
                    <FileText size={16} />
                    <span>LaTeX</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat("code")}
                    className={`px-3 py-1.5 flex items-center gap-1 ${format === "code" ? "bg-blue-100 text-blue-700" : ""}`}
                  >
                    <Code size={16} />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              {format === "text" && (
                <div className="mt-0">
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] w-full"
                    placeholder="Describe your question in detail..."
                    required
                  />
                </div>
              )}

              {format === "latex" && (
                <div className="mt-0">
                  <Textarea
                    id="content-latex"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] w-full font-mono"
                    placeholder="Enter your LaTeX formatted question here... Use $ for inline math and $ for block math"
                    required
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      LaTeX syntax: Use $ for inline math and $ for block math
                    </p>
                    <p className="mt-1">
                      Example: The quadratic formula is x = (-b ± √(b² -
                      4ac))/2a
                    </p>
                  </div>
                </div>
              )}

              {format === "code" && (
                <div className="mt-0">
                  <Textarea
                    id="content-code"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] w-full font-mono"
                    placeholder="// Paste your code here\nfunction example() {\n  return 'Hello World';\n}"
                    required
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      Format your code with proper indentation for better
                      readability
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-1"
              >
                <Image size={16} />
                <span>Add Image</span>
              </Button>
              <p className="text-xs text-gray-500">
                (Optional) Upload screenshots or diagrams to help explain your
                question
              </p>
            </div>
          </div>

          <CardFooter className="flex justify-end px-0 pt-4">
            <Button
              type="submit"
              className="flex items-center gap-2"
              disabled={isSubmitting || !title || !content}
            >
              <Send size={16} />
              {isSubmitting ? "Submitting..." : "Submit Question"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default AskQuestionForm;
