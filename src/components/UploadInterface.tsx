import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Image, 
  Video, 
  Music, 
  X, 
  CheckCircle2,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUpload {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "uploading" | "completed" | "error";
  progress: number;
}

const getFileIcon = (type: string) => {
  if (type.includes("image")) return Image;
  if (type.includes("video")) return Video;
  if (type.includes("audio")) return Music;
  return FileText;
};

const getFileTypeColor = (type: string) => {
  if (type.includes("image")) return "text-blue-500";
  if (type.includes("video")) return "text-purple-500";
  if (type.includes("audio")) return "text-green-500";
  return "text-orange-500";
};

export const UploadInterface = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [stage, setStage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  }, []);

  const processFiles = (newFiles: File[]) => {
    const fileUploads: FileUpload[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(2),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      status: "uploading",
      progress: 0,
    }));

    setFiles(prev => [...prev, ...fileUploads]);

    // Simulate upload progress
    fileUploads.forEach((fileUpload) => {
      simulateUpload(fileUpload.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + Math.random() * 30, 100);
          const isCompleted = newProgress >= 100;
          return {
            ...file,
            progress: newProgress,
            status: isCompleted ? "completed" : "uploading"
          };
        }
        return file;
      }));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setFiles(prev => prev.map(file => 
        file.id === fileId ? { ...file, status: "completed", progress: 100 } : file
      ));
    }, 2000 + Math.random() * 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const startAnalysis = () => {
    // Handle analysis start
    console.log("Starting analysis for:", { companyName, stage, files });
  };

  const completedFiles = files.filter(f => f.status === "completed").length;
  const totalFiles = files.length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Upload Startup Materials</h1>
          <p className="text-muted-foreground">
            Upload pitch decks, financial documents, and call recordings for AI analysis
          </p>
        </div>

        {/* Company Info */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <Label htmlFor="funding-stage">Funding Stage</Label>
                <Input
                  id="funding-stage"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  placeholder="e.g., Seed, Series A"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                isDragging 
                  ? "border-accent bg-accent/5" 
                  : "border-border hover:border-accent/50"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Drag and drop files here, or click to browse
              </h3>
              <p className="text-muted-foreground mb-4">
                Supports PDF, DOCX, PPTX, MP3, MP4, and image files up to 20MB each
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.pptx,.mp3,.mp4,.jpg,.jpeg,.png,.webp"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button variant="outline" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose Files
                </label>
              </Button>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Uploaded Files ({completedFiles}/{totalFiles})</h4>
                  {totalFiles > 0 && (
                    <Badge variant="outline">
                      {Math.round((completedFiles / totalFiles) * 100)}% Complete
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  {files.map((file) => {
                    const FileIcon = getFileIcon(file.type);
                    const iconColor = getFileTypeColor(file.type);
                    
                    return (
                      <div
                        key={file.id}
                        className="flex items-center space-x-4 p-3 border border-border rounded-lg"
                      >
                        <FileIcon className={cn("h-5 w-5", iconColor)} />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium truncate">{file.name}</p>
                            <div className="flex items-center space-x-2">
                              {file.status === "uploading" && (
                                <Loader2 className="h-4 w-4 animate-spin text-accent" />
                              )}
                              {file.status === "completed" && (
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              )}
                              {file.status === "error" && (
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(file.id)}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Progress value={file.progress} className="flex-1 h-2" />
                            <span className="text-sm text-muted-foreground">
                              {file.size}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Button */}
        <div className="flex justify-center">
          <Button
            variant="hero"
            size="xl"
            onClick={startAnalysis}
            disabled={!companyName || !stage || completedFiles === 0}
            className="min-w-48"
          >
            {completedFiles > 0 && completedFiles < totalFiles ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Upload className="mr-2 h-5 w-5" />
            )}
            Start AI Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};