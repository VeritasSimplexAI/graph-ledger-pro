import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Network, TrendingUp, TrendingDown } from "lucide-react";

interface StatementItem {
  label: string;
  amount: number;
  ifrsCode?: string;
  graphConnections?: number;
  trend?: 'up' | 'down' | 'stable';
}

interface StatementSection {
  title: string;
  items: StatementItem[];
}

const FinancialStatements = () => {
  const balanceSheetData: StatementSection[] = [
    {
      title: "Assets",
      items: [
        { label: "Cash and Cash Equivalents", amount: 1250000, ifrsCode: "IFRS.1.1.1", graphConnections: 24, trend: 'up' },
        { label: "Accounts Receivable", amount: 850000, ifrsCode: "IFRS.1.1.2", graphConnections: 18, trend: 'down' },
        { label: "Inventory", amount: 2100000, ifrsCode: "IFRS.1.1.3", graphConnections: 32, trend: 'up' },
        { label: "Property, Plant & Equipment", amount: 5500000, ifrsCode: "IFRS.1.2.1", graphConnections: 12, trend: 'stable' },
      ]
    },
    {
      title: "Liabilities",
      items: [
        { label: "Accounts Payable", amount: 750000, ifrsCode: "IFRS.2.1.1", graphConnections: 28, trend: 'up' },
        { label: "Short-term Debt", amount: 1200000, ifrsCode: "IFRS.2.1.2", graphConnections: 8, trend: 'down' },
        { label: "Long-term Debt", amount: 3500000, ifrsCode: "IFRS.2.2.1", graphConnections: 6, trend: 'stable' },
      ]
    },
    {
      title: "Equity",
      items: [
        { label: "Share Capital", amount: 2000000, ifrsCode: "IFRS.3.1.1", graphConnections: 4, trend: 'stable' },
        { label: "Retained Earnings", amount: 2250000, ifrsCode: "IFRS.3.2.1", graphConnections: 45, trend: 'up' },
      ]
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-data-integration" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-ai-services" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Statements</h1>
          <p className="text-muted-foreground mt-2">
            Graph-based view with IFRS taxonomy integration
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Network className="w-4 h-4 mr-2" />
            View Graph
          </Button>
          <Button variant="secondary" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Export iXBRL
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {balanceSheetData.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="shadow-card-aidagara">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors bg-card/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{item.label}</span>
                        {getTrendIcon(item.trend)}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        {item.ifrsCode && (
                          <Badge variant="outline" className="text-xs">
                            {item.ifrsCode}
                          </Badge>
                        )}
                        {item.graphConnections && (
                          <Badge variant="secondary" className="text-xs">
                            <Network className="w-3 h-3 mr-1" />
                            {item.graphConnections} connections
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {formatCurrency(item.amount)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Graph-Based Intelligence</h3>
              <p className="text-sm text-muted-foreground">
                Aidagara automatically maps your accounts to IFRS taxonomy and validates relationships in real-time. 
                Click any item above to explore its graph connections.
              </p>
            </div>
            <Button variant="secondary">
              Explore Graph
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialStatements;