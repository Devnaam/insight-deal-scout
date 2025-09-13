import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";
import { UploadInterface } from "@/components/UploadInterface";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const handleGetStarted = () => {
    setCurrentPage("dashboard");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "upload":
        return <UploadInterface />;
      case "analysis":
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Analysis Results</h1>
              <p className="text-muted-foreground">Analysis features coming soon...</p>
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