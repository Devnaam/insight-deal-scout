import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Eye
} from "lucide-react";

const mockDeals = [
  {
    id: 1,
    company: "TechFlow AI",
    status: "analyzing",
    progress: 75,
    stage: "Series A",
    valuation: "$15M",
    sector: "AI/ML",
    risk: "low",
    lastUpdate: "2 hours ago",
    metrics: {
      arr: "$2.4M",
      growth: "+180%",
      burn: "$400K/mo"
    }
  },
  {
    id: 2,
    company: "GreenLogistics",
    status: "completed",
    progress: 100,
    stage: "Seed",
    valuation: "$8M",
    sector: "Logistics",
    risk: "medium",
    lastUpdate: "1 day ago",
    metrics: {
      arr: "$800K",
      growth: "+120%",
      burn: "$150K/mo"
    }
  },
  {
    id: 3,
    company: "HealthSync",
    status: "pending",
    progress: 0,
    stage: "Series B",
    valuation: "$45M",
    sector: "HealthTech",
    risk: "high",
    lastUpdate: "3 days ago",
    metrics: {
      arr: "$8.2M",
      growth: "+95%",
      burn: "$1.2M/mo"
    }
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "success";
    case "analyzing": return "warning";
    case "pending": return "secondary";
    default: return "secondary";
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "low": return "success";
    case "medium": return "warning";
    case "high": return "destructive";
    default: return "secondary";
  }
};

export const Dashboard = () => {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-3 text-3d-lg">Investment Dashboard</h1>
          <p className="text-muted-foreground text-lg font-medium">Track and analyze your startup pipeline with AI precision</p>
        </div>
        <Button variant="hero" size="xl" className="animate-glow">
          <TrendingUp className="mr-2 h-6 w-6" />
          New Analysis
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="data-panel p-6 rounded-2xl hover:shadow-glow transition-all duration-500 group">
          <div className="flex flex-row items-center justify-between space-y-0 pb-3">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Total Deals</h3>
            <DollarSign className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-3xl font-bold text-3d mb-1">127</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-success font-semibold">+12%</span> from last month
            </p>
          </div>
        </div>

        <div className="data-panel p-6 rounded-2xl hover:shadow-glow transition-all duration-500 group">
          <div className="flex flex-row items-center justify-between space-y-0 pb-3">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">In Progress</h3>
            <Clock className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-3xl font-bold text-3d mb-1">18</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-warning font-semibold">3</span> completing soon
            </p>
          </div>
        </div>

        <div className="data-panel p-6 rounded-2xl hover:shadow-glow transition-all duration-500 group">
          <div className="flex flex-row items-center justify-between space-y-0 pb-3">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Avg Analysis Time</h3>
            <TrendingDown className="h-5 w-5 text-success group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-3xl font-bold text-3d mb-1">4.2m</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-success font-semibold">-18%</span> improvement
            </p>
          </div>
        </div>

        <div className="data-panel p-6 rounded-2xl hover:shadow-glow transition-all duration-500 group">
          <div className="flex flex-row items-center justify-between space-y-0 pb-3">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Investment Rate</h3>
            <Users className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-3xl font-bold text-3d mb-1">23%</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-success font-semibold">+5%</span> vs industry avg
            </p>
          </div>
        </div>
      </div>

      {/* Deal Pipeline */}
      <div className="glass-panel p-8 rounded-3xl shadow-elevated">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="h-6 w-6 text-accent animate-float" />
          <h2 className="text-2xl font-bold text-3d">Recent Deals</h2>
        </div>
        <div className="space-y-6">
          {mockDeals.map((deal) => (
            <div key={deal.id} className="flex items-center justify-between p-6 border border-border rounded-2xl hover:shadow-card transition-all duration-300 data-panel">
              <div className="flex items-center space-x-6 flex-1">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-foreground truncate text-lg text-3d">{deal.company}</h3>
                    <Badge variant="outline" className="font-semibold">{deal.stage}</Badge>
                    <Badge variant={getRiskColor(deal.risk)} className="text-xs font-semibold">
                      {deal.risk} risk
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
                    <span>{deal.sector}</span>
                    <span>•</span>
                    <span className="font-semibold">{deal.valuation}</span>
                    <span>•</span>
                    <span>{deal.lastUpdate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                {/* Metrics */}
                <div className="hidden md:flex flex-col text-right text-sm">
                  <span className="font-bold text-foreground text-3d">{deal.metrics.arr} ARR</span>
                  <span className="text-success font-semibold">{deal.metrics.growth}</span>
                </div>

                {/* Progress */}
                <div className="flex items-center space-x-4">
                  <div className="w-32">
                    <Progress value={deal.progress} className="h-3" />
                  </div>
                  <Badge variant={getStatusColor(deal.status)} className="font-semibold">
                    {deal.status === "completed" && <CheckCircle2 className="w-4 h-4 mr-1" />}
                    {deal.status === "analyzing" && <Clock className="w-4 h-4 mr-1 animate-spin" />}
                    {deal.status === "pending" && <AlertTriangle className="w-4 h-4 mr-1" />}
                    {deal.status}
                  </Badge>
                </div>

                {/* Actions */}
                <Button variant="terminal" size="sm" className="hover:scale-105 transition-transform">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};