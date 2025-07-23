import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import GraphVisualization from "@/components/GraphVisualization";
import heroImage from "@/assets/aidagara-hero.jpg";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Network,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

const Dashboard = () => {
  // Sample graph data
  const sampleNodes = [
    { id: "cash", label: "Cash", type: "account" as const, value: 125000 },
    { id: "revenue", label: "Revenue", type: "account" as const, value: 450000 },
    { id: "expenses", label: "Expenses", type: "account" as const, value: 280000 },
    { id: "tx1", label: "Sale #1", type: "transaction" as const },
    { id: "tx2", label: "Payment", type: "transaction" as const },
    { id: "customer", label: "Customer A", type: "entity" as const },
  ];

  const sampleLinks = [
    { source: "tx1", target: "cash", value: 5000, type: "debit" as const },
    { source: "tx1", target: "revenue", value: 5000, type: "credit" as const },
    { source: "tx2", target: "cash", value: 3000, type: "credit" as const },
    { source: "tx2", target: "expenses", value: 3000, type: "debit" as const },
  ];

  const metrics = [
    {
      title: "Total Assets",
      value: "$9.7M",
      change: "+12.5%",
      trend: "up" as const,
      icon: TrendingUp,
      graphConnections: 156
    },
    {
      title: "Monthly Revenue",
      value: "$2.8M",
      change: "+8.2%",
      trend: "up" as const,
      icon: BarChart3,
      graphConnections: 89
    },
    {
      title: "Cash Flow",
      value: "$450K",
      change: "-3.1%",
      trend: "down" as const,
      icon: TrendingDown,
      graphConnections: 67
    },
    {
      title: "Graph Nodes",
      value: "2,547",
      change: "+156",
      trend: "up" as const,
      icon: Network,
      graphConnections: 2547
    }
  ];

  const alerts = [
    {
      type: "warning",
      title: "IFRS Validation Warning",
      description: "Account mapping requires review for Q4 compliance",
      time: "2 hours ago"
    },
    {
      type: "success",
      title: "iXBRL Export Complete",
      description: "Financial statements exported successfully",
      time: "4 hours ago"
    },
    {
      type: "info",
      title: "New Graph Connections",
      description: "45 new transaction relationships detected",
      time: "6 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-graph">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
          <div className="relative p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Aidagara
            </h1>
            <p className="text-xl mb-6 opacity-90 max-w-2xl">
              Transform your financial data into an interconnected graph of insights. 
              Revolutionary accounting with IFRS taxonomy integration.
            </p>
            <div className="flex items-center space-x-4">
              <Button size="lg" variant="secondary">
                <Network className="w-5 h-5 mr-2" />
                Explore Graph
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                View Statements
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="shadow-card-aidagara hover:shadow-graph transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Network className="w-3 h-3 mr-1" />
                      {metric.graphConnections}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center space-x-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-data-integration" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-ai-services" />
                      )}
                      <span className={`text-sm ${
                        metric.trend === "up" ? "text-data-integration" : "text-ai-services"
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Graph and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-card-aidagara">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="w-5 h-5" />
                <span>Live Transaction Graph</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GraphVisualization 
                nodes={sampleNodes} 
                links={sampleLinks}
                className="h-80"
              />
            </CardContent>
          </Card>

          <Card className="shadow-card-aidagara">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>System Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-border/50">
                    <div className="mt-1">
                      {alert.type === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                      {alert.type === "success" && <CheckCircle className="w-4 h-4 text-data-integration" />}
                      {alert.type === "info" && <Clock className="w-4 h-4 text-graph-accent" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card-aidagara">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <BarChart3 className="w-6 h-6" />
                <span className="text-sm">Generate Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Network className="w-6 h-6" />
                <span className="text-sm">Graph Analysis</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <CheckCircle className="w-6 h-6" />
                <span className="text-sm">IFRS Validation</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="w-6 h-6" />
                <span className="text-sm">Team Access</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;