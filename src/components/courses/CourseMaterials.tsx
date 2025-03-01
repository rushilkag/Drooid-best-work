import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  FileText,
  Upload,
  Download,
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  Plus,
  Search,
  Filter,
} from "lucide-react";

interface Material {
  id: string;
  title: string;
  type: "pdf" | "doc" | "ppt" | "video" | "other";
  uploadedBy: string;
  uploadedAt: string;
  size: string;
  url: string;
}

interface CourseMaterialsProps {
  courseId?: string;
  courseName?: string;
  materials?: Material[];
  isInstructor?: boolean;
  onUpload?: (file: File) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, title: string) => void;
}

const CourseMaterials = ({
  courseId = "course-123",
  courseName = "Introduction to Computer Science",
  materials = [
    {
      id: "m1",
      title: "Course Syllabus",
      type: "pdf",
      uploadedBy: "Dr. Smith",
      uploadedAt: "2023-09-01",
      size: "1.2 MB",
      url: "#",
    },
    {
      id: "m2",
      title: "Week 1: Introduction to Programming",
      type: "ppt",
      uploadedBy: "Dr. Smith",
      uploadedAt: "2023-09-05",
      size: "3.5 MB",
      url: "#",
    },
    {
      id: "m3",
      title: "Week 2: Data Structures",
      type: "pdf",
      uploadedBy: "Dr. Smith",
      uploadedAt: "2023-09-12",
      size: "2.8 MB",
      url: "#",
    },
    {
      id: "m4",
      title: "Programming Assignment 1",
      type: "doc",
      uploadedBy: "Dr. Smith",
      uploadedAt: "2023-09-15",
      size: "0.5 MB",
      url: "#",
    },
    {
      id: "m5",
      title: "Lecture Recording: Algorithms",
      type: "video",
      uploadedBy: "Dr. Smith",
      uploadedAt: "2023-09-20",
      size: "250 MB",
      url: "#",
    },
  ],
  isInstructor = true,
  onUpload = () => {},
  onDelete = () => {},
  onEdit = () => {},
}: CourseMaterialsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [newTitle, setNewTitle] = useState("");

  // Filter materials based on search query and active tab
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || material.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleUploadClick = () => {
    setShowUploadDialog(true);
  };

  const handleEditClick = (material: Material) => {
    setEditingMaterial(material);
    setNewTitle(material.title);
  };

  const handleSaveEdit = () => {
    if (editingMaterial && newTitle.trim()) {
      onEdit(editingMaterial.id, newTitle);
      setEditingMaterial(null);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "doc":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "ppt":
        return <FileText className="h-6 w-6 text-orange-500" />;
      case "video":
        return <FileText className="h-6 w-6 text-purple-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {courseName} - Materials
          </h2>
          <p className="text-gray-500">Access and manage course materials</p>
        </div>
        {isInstructor && (
          <Button
            onClick={handleUploadClick}
            className="flex items-center gap-2"
          >
            <Upload size={16} />
            Upload Material
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pdf">PDFs</TabsTrigger>
            <TabsTrigger value="doc">Documents</TabsTrigger>
            <TabsTrigger value="ppt">Presentations</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4 hidden md:table-cell">
                    Uploaded By
                  </th>
                  <th className="text-left p-4 hidden md:table-cell">Date</th>
                  <th className="text-left p-4 hidden md:table-cell">Size</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map((material) => (
                    <tr key={material.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 flex items-center gap-3">
                        {getFileIcon(material.type)}
                        <span className="font-medium">{material.title}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="uppercase">
                          {material.type}
                        </Badge>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        {material.uploadedBy}
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        {material.uploadedAt}
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        {material.size}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <a
                              href={material.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Eye size={18} />
                            </a>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <a href={material.url} download>
                              <Download size={18} />
                            </a>
                          </Button>
                          {isInstructor && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical size={18} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleEditClick(material)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => onDelete(material.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No materials found.{" "}
                      {isInstructor && "Upload some materials to get started."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Course Material</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input id="title" placeholder="Enter material title" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">File</label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Drag and drop your file here or click to browse
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports PDF, DOCX, PPTX, MP4 (max 500MB)
                </p>
                <input type="file" className="hidden" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUploadDialog(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingMaterial}
        onOpenChange={(open) => !open && setEditingMaterial(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Material</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="new-title" className="text-sm font-medium">
                New Title
              </label>
              <Input
                id="new-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter new title"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingMaterial(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseMaterials;
