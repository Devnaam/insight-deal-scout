import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";
import { UploadInterface } from "@/components/UploadInterface";
import { AnalysisResults } from "@/components/AnalysisResults";
import { analyzeStartup, AnalysisResult } from "@/lib/gemini";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGetStarted = () => {
    setCurrentPage("dashboard");
  };

  const handleAnalysisStart = async (companyName: string, stage: string, files: string[]) => {
    setIsAnalyzing(true);
    try {
      toast({
        title: "Starting Analysis",
        description: "AI is analyzing your startup documents...",
      });

      const result = await analyzeStartup(companyName, stage, files);
      setAnalysisResult(result);
      setCurrentPage("analysis");
      
      toast({
        title: "Analysis Complete",
        description: "Your startup analysis is ready!",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed", 
        description: "Failed to analyze startup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToUpload = () => {
    setCurrentPage("upload");
    setAnalysisResult(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "upload":
        return <UploadInterface onAnalysisStart={handleAnalysisStart} />;
      case "analysis":
        return analysisResult ? (
          <AnalysisResults analysis={analysisResult} onBack={handleBackToUpload} />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Analysis Results</h1>
              <p className="text-muted-foreground">No analysis results available.</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Settings</h1>
              <p className="text-muted-foreground">Settings features coming soon...</p>
            </div>
          </div>
        );
      default:
        return <HeroSection onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage !== "home" && (
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      )}
      {renderPage()}
    </div>
  );
};

export default Index;