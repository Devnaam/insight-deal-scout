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

interface UploadInterfaceProps {
  onAnalysisStart?: (companyName: string, stage: string, files: string[]) => Promise<void>;
}

export const UploadInterface = ({ onAnalysisStart }: UploadInterfaceProps = {}) => {
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

  const startAnalysis = async () => {
    if (!onAnalysisStart) return;
    const fileNames = files
      .filter(f => f.status === "completed")
      .map(f => f.name);
    if (fileNames.length === 0) return;
    const name = companyName?.trim() || "Untitled Startup";
    const s = stage?.trim() || "Unknown";
    await onAnalysisStart(name, s, fileNames);
  };

  const completedFiles = files.filter(f => f.status === "completed").length;
  const totalFiles = files.length;

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl animate-fade-in">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-3d-lg">Upload Startup Materials</h1>
          <p className="text-muted-foreground text-lg font-medium">
            Upload pitch decks, financial documents, and call recordings for AI analysis
          </p>
        </div>

        {/* Company Info */}
        <div className="glass-panel p-8 rounded-3xl shadow-elevated">
          <h2 className="text-2xl font-bold mb-6 text-3d">Company Information</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="company-name" className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-2 block">Company Name</Label>
                <Input
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  className="h-12 rounded-xl border-2 terminal-border font-medium"
                />
              </div>
              <div>
                <Label htmlFor="funding-stage" className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-2 block">Funding Stage</Label>
                <Input
                  id="funding-stage"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  placeholder="e.g., Seed, Series A"
                  className="h-12 rounded-xl border-2 terminal-border font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="glass-panel p-8 rounded-3xl shadow-elevated">
          <h2 className="text-2xl font-bold mb-6 text-3d">Document Upload</h2>
          <div
            className={cn(
              "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300",
              isDragging 
                ? "border-accent bg-accent/10 shadow-glow" 
                : "border-border hover:border-accent/50 hover:bg-accent/5"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-16 w-16 text-accent mx-auto mb-6 animate-float" />
            <h3 className="text-xl font-bold mb-3 text-3d">
              Drag and drop files here, or click to browse
            </h3>
            <p className="text-muted-foreground mb-6 font-medium text-lg">
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
            <Button variant="terminal" size="lg" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg text-3d">Uploaded Files ({completedFiles}/{totalFiles})</h4>
                  {totalFiles > 0 && (
                    <Badge variant="outline" className="font-semibold">
                      {Math.round((completedFiles / totalFiles) * 100)}% Complete
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-3">
                  {files.map((file) => {
                    const FileIcon = getFileIcon(file.type);
                    const iconColor = getFileTypeColor(file.type);
                    
                    return (
                      <div
                        key={file.id}
                        className="flex items-center space-x-4 p-4 border border-border rounded-xl data-panel hover:shadow-card transition-all duration-300"
                      >
                        <FileIcon className={cn("h-6 w-6", iconColor)} />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold truncate text-3d">{file.name}</p>
                            <div className="flex items-center space-x-3">
                              {file.status === "uploading" && (
                                <Loader2 className="h-5 w-5 animate-spin text-accent" />
                              )}
                              {file.status === "completed" && (
                                <CheckCircle2 className="h-5 w-5 text-success" />
                              )}
                              {file.status === "error" && (
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(file.id)}
                                className="h-8 w-8 p-0 hover:scale-110 transition-transform"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Progress value={file.progress} className="flex-1 h-3" />
                            <span className="text-sm text-muted-foreground font-semibold">
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
        </div>

        {/* Analysis Button */}
        <div className="flex justify-center">
          <Button
            variant="hero"
            size="xl"
            onClick={startAnalysis}
            disabled={completedFiles === 0}
            className="min-w-64 font-bold animate-glow"
          >
            {completedFiles > 0 && completedFiles < totalFiles ? (
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
            ) : (
              <Upload className="mr-3 h-6 w-6" />
            )}
            Start AI Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};