import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book, FileUp, Layers, Link, Plus, Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const courseFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Course name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  department: z.string().min(1, { message: "Department is required" }),
  term: z.string().min(1, { message: "Term is required" }),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

interface CreateCourseModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCreateCourse?: (data: CourseFormValues & { materials: File[] }) => void;
}

const CreateCourseModal = ({
  open = true,
  onOpenChange = () => {},
  onCreateCourse = () => {},
}: CreateCourseModalProps) => {
  const [step, setStep] = useState<"details" | "materials" | "confirmation">(
    "details",
  );
  const [courseCode, setCourseCode] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: "",
      description: "",
      department: "",
      term: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (step === "details") {
      form.handleSubmit(() => {
        setStep("materials");
      })();
    } else if (step === "materials") {
      // Generate a random course code
      const randomCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
      setCourseCode(randomCode);
      setStep("confirmation");
    }
  };

  const handleBack = () => {
    if (step === "materials") {
      setStep("details");
    } else if (step === "confirmation") {
      setStep("materials");
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const formData = form.getValues();
    onCreateCourse({ ...formData, materials: selectedFiles });
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      // Reset form
      form.reset();
      setSelectedFiles([]);
      setStep("details");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {step === "details" && "Create New Course"}
            {step === "materials" && "Upload Course Materials"}
            {step === "confirmation" && "Course Created Successfully"}
          </DialogTitle>
          <DialogDescription>
            {step === "details" && "Enter the details for your new course"}
            {step === "materials" && "Upload materials for students to access"}
            {step === "confirmation" &&
              "Your course has been created. Share this code with your students."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={step} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger
              value="details"
              disabled={step !== "details"}
              className="flex items-center gap-2"
            >
              <Book className="h-4 w-4" />
              <span>Details</span>
            </TabsTrigger>
            <TabsTrigger
              value="materials"
              disabled={step !== "materials"}
              className="flex items-center gap-2"
            >
              <FileUp className="h-4 w-4" />
              <span>Materials</span>
            </TabsTrigger>
            <TabsTrigger
              value="confirmation"
              disabled={step !== "confirmation"}
              className="flex items-center gap-2"
            >
              <Link className="h-4 w-4" />
              <span>Join Code</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 py-4">
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Introduction to Computer Science"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the full name of your course
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the department this course belongs to
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Term</FormLabel>
                      <FormControl>
                        <Input placeholder="Fall 2023" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the academic term for this course
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A comprehensive introduction to the fundamental principles of computer science..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a brief description of the course content and
                        objectives
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <h3 className="text-sm font-medium mb-1">
                  Upload Course Materials
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <Input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <Button asChild variant="outline" size="sm">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    Select Files
                  </label>
                </Button>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    Selected Files ({selectedFiles.length})
                  </h3>
                  <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center">
                          <Layers className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm truncate max-w-[300px]">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-500 h-6 w-6 p-0"
                        >
                          &times;
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="confirmation" className="space-y-6 py-4">
            <div className="text-center space-y-4">
              <div className="bg-green-50 text-green-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium">
                Course Created Successfully!
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Your course has been created. Share the following code with your
                students so they can join.
              </p>

              <div className="max-w-xs mx-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Course Join Code</p>
                <div className="text-2xl font-mono font-bold tracking-wider text-blue-600 select-all">
                  {courseCode}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <p>This code will be available on your course dashboard.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between">
          {step !== "details" && (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <div>
            {step !== "confirmation" ? (
              <Button type="button" onClick={handleNext}>
                {step === "details"
                  ? "Next: Upload Materials"
                  : "Next: Generate Code"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Course..." : "Finish"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseModal;
