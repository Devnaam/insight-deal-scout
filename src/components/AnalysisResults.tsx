import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign,
  Target,
  Clock,
  BarChart3,
  ArrowLeft
} from "lucide-react";
import { AnalysisResult } from "@/lib/gemini";

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  onBack: () => void;
}

export const AnalysisResults = ({ analysis, onBack }: AnalysisResultsProps) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "success";
      case "Medium": return "warning"; 
      case "High": return "destructive";
      default: return "default";
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "Invest": return "success";
      case "Track": return "warning";
      case "Pass": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl animate-fade-in">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-4 hover:scale-105 transition-transform"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Upload
            </Button>
            <h1 className="text-4xl font-bold text-3d-lg mb-2">
              Analysis Results
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              AI-powered investment analysis for {analysis.companyName}
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-lg font-bold">
            {analysis.stage}
          </Badge>
        </div>

        {/* Investibility Status */}
        <Card className="glass-panel shadow-elevated">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {analysis.recommendation.decision === "Invest" ? (
                <CheckCircle2 className="h-8 w-8 text-success" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-destructive" />
              )}
              <div>
                <h2 className="text-2xl font-bold text-3d">
                  {analysis.recommendation.decision === "Invest" ? "Investible" : analysis.recommendation.decision === "Track" ? "Track - Needs More Data" : "Not Investible"}
                </h2>
                <p className="text-muted-foreground font-medium">
                  Confidence: {analysis.recommendation.confidence}% • Stage: {analysis.stage}
                </p>
              </div>
            </div>
            <Badge variant={getDecisionColor(analysis.recommendation.decision)} className="text-lg font-bold px-4 py-2">
              {analysis.recommendation.decision}
            </Badge>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <Card className="glass-panel shadow-elevated">
          <CardHeader>
            <CardTitle className="text-2xl text-3d flex items-center">
              <BarChart3 className="mr-3 h-6 w-6 text-accent" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium leading-relaxed">{analysis.summary}</p>
          </CardContent>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analysis.keyMetrics.map((metric, index) => (
            <Card key={index} className="data-panel hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {metric.name}
                  </p>
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>
                <p className="text-2xl font-bold text-3d">{metric.value}</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  {metric.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Financial Overview */}
        <Card className="glass-panel shadow-elevated">
          <CardHeader>
            <CardTitle className="text-2xl text-3d flex items-center">
              <DollarSign className="mr-3 h-6 w-6 text-accent" />
              Financial Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Revenue</p>
                <p className="text-xl font-bold text-3d">{analysis.financialMetrics.revenue}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Burn Rate</p>
                <p className="text-xl font-bold text-3d">{analysis.financialMetrics.burnRate}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Runway</p>
                <p className="text-xl font-bold text-3d">{analysis.financialMetrics.runway}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Valuation</p>
                <p className="text-xl font-bold text-3d">{analysis.financialMetrics.valuation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment & Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Assessment */}
          <Card className="glass-panel shadow-elevated">
            <CardHeader>
              <CardTitle className="text-2xl text-3d flex items-center">
                <AlertTriangle className="mr-3 h-6 w-6 text-accent" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Risk Level:</span>
                <Badge variant={getRiskColor(analysis.riskAssessment.level)} className="font-bold">
                  {analysis.riskAssessment.level}
                </Badge>
              </div>
              <div>
                <p className="font-semibold mb-3">Risk Factors:</p>
                <ul className="space-y-2">
                  {analysis.riskAssessment.factors.map((factor, index) => (
                    <li key={index} className="flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-warning" />
                      <span className="font-medium">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Investment Recommendation */}
          <Card className="glass-panel shadow-elevated">
            <CardHeader>
              <CardTitle className="text-2xl text-3d flex items-center">
                <Target className="mr-3 h-6 w-6 text-accent" />
                Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Decision:</span>
                <Badge variant={getDecisionColor(analysis.recommendation.decision)} className="font-bold text-lg px-4 py-2">
                  {analysis.recommendation.decision}
                </Badge>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Confidence:</span>
                  <span className="font-bold text-3d">{analysis.recommendation.confidence}%</span>
                </div>
                <Progress value={analysis.recommendation.confidence} className="h-3" />
              </div>
              <div>
                <p className="font-semibold mb-2">Rationale:</p>
                <p className="font-medium leading-relaxed">{analysis.recommendation.rationale}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button variant="terminal" size="lg" className="font-bold">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Save Analysis
          </Button>
          <Button variant="outline" size="lg" className="font-bold">
            <Clock className="mr-2 h-5 w-5" />
            Schedule Follow-up
          </Button>
        </div>
      </div>
    </div>
  );
};