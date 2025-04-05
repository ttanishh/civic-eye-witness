
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import { getReports } from "@/lib/reportUtils";
import { getCrimeStatisticsFromBlockchain } from "@/lib/contractInterface";
import { Report, CrimeCategory } from "@/types/report";
import { 
  AlertTriangle, 
  BarChart3, 
  ChartPie, 
  TrendingUp,
  MapPin,
  Info,
  Shield
} from "lucide-react";

export default function Statistics() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalReports: number;
    byCategoryCount: Record<CrimeCategory, number>;
    byStatusCount: Record<string, number>;
    byUrgencyCount: Record<number, number>;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const allReports = await getReports();
        setReports(allReports);
        
        const statistics = await getCrimeStatisticsFromBlockchain();
        setStats(statistics);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Define colors for charts
  const COLORS = [
    "#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57",
    "#ffc658", "#ff8042", "#ff6b6b", "#e57373", "#ba68c8", "#9575cd"
  ];
  
  // Status statistics
  const statusData = [
    { name: "Pending", value: stats?.byStatusCount?.pending || 0 },
    { name: "Investigating", value: stats?.byStatusCount?.investigating || 0 },
    { name: "Resolved", value: stats?.byStatusCount?.resolved || 0 }
  ];

  // Define crime categories as an array to use for mapping
  const crimeCategories: CrimeCategory[] = ["theft", "assault", "vandalism", "fraud", "harassment", "other"];

  // Crime category statistics
  const categoryData = crimeCategories.map(category => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: stats?.byCategoryCount?.[category] || 0
  }));

  // Urgency level statistics
  const urgencyData = [
    { name: "Very Low", value: stats?.byUrgencyCount?.[1] || 0 },
    { name: "Low", value: stats?.byUrgencyCount?.[2] || 0 },
    { name: "Medium", value: stats?.byUrgencyCount?.[3] || 0 },
    { name: "High", value: stats?.byUrgencyCount?.[4] || 0 },
    { name: "Critical", value: stats?.byUrgencyCount?.[5] || 0 }
  ];

  // Time-based statistics (last 7 days)
  const now = new Date();
  const timeData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - i));
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Count reports for this day
    const count = reports.filter(r => {
      const reportDate = new Date(r.timestamp);
      return reportDate.getDate() === date.getDate() &&
             reportDate.getMonth() === date.getMonth() &&
             reportDate.getFullYear() === date.getFullYear();
    }).length;
    
    return { name: dateStr, count };
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-8 animate-pulse">
        <div className="h-8 w-60 bg-muted rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-muted rounded"></div>
          <div className="h-40 bg-muted rounded"></div>
          <div className="h-40 bg-muted rounded"></div>
        </div>
        <div className="h-80 bg-muted rounded mt-6"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">KAVACH Analytics Dashboard</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time statistics and insights from crime reports across the blockchain network
        </p>
      </div>
      
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/50 backdrop-blur-sm border border-civic-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-civic-primary" />
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalReports || 0}</div>
            <p className="text-muted-foreground text-sm">Reports submitted to the KAVACH network</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/50 backdrop-blur-sm border border-civic-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{stats?.byStatusCount?.pending || 0}</div>
            <p className="text-muted-foreground text-sm">Reports awaiting review</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/50 backdrop-blur-sm border border-civic-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Investigating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">{stats?.byStatusCount?.investigating || 0}</div>
            <p className="text-muted-foreground text-sm">Reports under active investigation</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/50 backdrop-blur-sm border border-civic-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{stats?.byStatusCount?.resolved || 0}</div>
            <p className="text-muted-foreground text-sm">Reports successfully resolved</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <ChartPie className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-civic-primary/20">
              <CardHeader>
                <CardTitle>Report Status Distribution</CardTitle>
                <CardDescription>
                  Breakdown of reports by current status
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-civic-primary/20">
              <CardHeader>
                <CardTitle>Urgency Level Distribution</CardTitle>
                <CardDescription>
                  Breakdown of reports by reported urgency level
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={urgencyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Reports" fill="#8884d8">
                        {urgencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="mt-6">
          <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-civic-primary/20">
            <CardHeader>
              <CardTitle>Crime Categories</CardTitle>
              <CardDescription>
                Distribution of reports by crime category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" name="Reports" fill="#8884d8">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Alert className="mt-6 bg-civic-light border-civic-primary/20">
            <MapPin className="h-4 w-4" />
            <AlertTitle>Geographic Insights</AlertTitle>
            <AlertDescription>
              Geographic crime distribution data will be available in future releases of the KAVACH platform. 
              This will help identify crime hotspots and enhance community safety initiatives.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-6">
          <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border border-civic-primary/20">
            <CardHeader>
              <CardTitle>Reports Trend (Last 7 Days)</CardTitle>
              <CardDescription>
                Daily report submission activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      name="Reports" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white/50 backdrop-blur-sm border border-civic-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Insight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {timeData.reduce((sum, day) => sum + day.count, 0) > 10 
                    ? "There has been increased reporting activity over the past week, suggesting growing community engagement with the KAVACH platform."
                    : "Reporting activity has been relatively stable over the past week. Continued community outreach may help increase engagement."}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border border-civic-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Blockchain Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All KAVACH statistics are derived from immutable blockchain records, ensuring data integrity and transparency. 
                  This provides a reliable foundation for community safety planning and resource allocation.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-8" />
      
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">KAVACH: Powered by Blockchain</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          All data presented in this dashboard is securely stored on the blockchain, 
          ensuring transparency, immutability, and trust in crime reporting statistics.
        </p>
        
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm">
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            View on Blockchain
          </Button>
        </div>
      </div>
    </div>
  );
}
