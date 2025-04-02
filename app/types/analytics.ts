export interface Analytics {
  overview: {
    monthlyViews: number;
    monthlyVisitors: number;
    monthlyViewsChange: string;
    monthlyVisitorsChange: string;
  };
  topProducts: Array<{
    name: string;
    views: number;
    trend: string;
  }>;
  dailyVisits: Array<{
    date: string;
    visits: number;
  }>;
  productPerformance: Array<{
    name: string;
    views: number;
    revenue: number;
  }>;
  viewsByHour: Array<{
    hour: string;
    views: number;
  }>;
  recentActivity: Array<{
    time: string;
    event: string;
  }>;
}
