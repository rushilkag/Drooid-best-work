import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { KeyRound, ArrowRight } from "lucide-react";

interface JoinCourseModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onJoinCourse?: (courseCode: string) => void;
  isJoining?: boolean;
}

const JoinCourseModal = ({
  isOpen = true,
  onOpenChange = () => {},
  onJoinCourse = () => {},
  isJoining = false,
}: JoinCourseModalProps) => {
  const [courseCode, setCourseCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!courseCode.trim()) {
      setError("Please enter a course code");
      return;
    }

    setError(null);
    onJoinCourse(courseCode);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Join a Course
          </DialogTitle>
          <DialogDescription>
            Enter the course code provided by your professor to join the course.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <KeyRound size={18} />
              </div>
              <Input
                placeholder="Enter course code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="pl-10 bg-gray-50"
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="text-sm text-gray-500">
            <p>
              Course codes are typically 6-8 characters long and case-sensitive.
            </p>
            <p className="mt-1">
              Example:{" "}
              <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">
                CS101-F23
              </span>
            </p>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              disabled={isJoining || !courseCode.trim()}
              className="w-full sm:w-auto"
            >
              {isJoining ? (
                "Joining..."
              ) : (
                <>
                  Join Course <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinCourseModal;
