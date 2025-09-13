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
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Investment Dashboard</h1>
          <p className="text-muted-foreground">Track and analyze your startup pipeline</p>
        </div>
        <Button variant="hero" size="lg">
          <TrendingUp className="mr-2 h-5 w-5" />
          New Analysis
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-warning">3</span> completing soon
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Analysis Time</CardTitle>
            <TrendingDown className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2m</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">-18%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investment Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+5%</span> vs industry avg
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Deal Pipeline */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Recent Deals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDeals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{deal.company}</h3>
                      <Badge variant="outline">{deal.stage}</Badge>
                      <Badge variant={getRiskColor(deal.risk)} className="text-xs">
                        {deal.risk} risk
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{deal.sector}</span>
                      <span>•</span>
                      <span>{deal.valuation}</span>
                      <span>•</span>
                      <span>{deal.lastUpdate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Metrics */}
                  <div className="hidden md:flex flex-col text-right text-sm">
                    <span className="font-medium">{deal.metrics.arr} ARR</span>
                    <span className="text-success">{deal.metrics.growth}</span>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center space-x-3">
                    <div className="w-24">
                      <Progress value={deal.progress} className="h-2" />
                    </div>
                    <Badge variant={getStatusColor(deal.status)}>
                      {deal.status === "completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {deal.status === "analyzing" && <Clock className="w-3 h-3 mr-1 animate-spin" />}
                      {deal.status === "pending" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {deal.status}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};