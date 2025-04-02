"use client";

import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  Package,
  Search,
  ChevronUp,
  ChevronDown,
  Edit2,
  Calendar,
  Plus,
  Upload
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import Sidebar from '@/app/components/sidebar';
import { Product, ProductFormData } from '@/app/types/product';
import { getProducts, getAnalytics } from '@/app/lib/data';
import Storefront from '@/app/components/Storefront';

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'name' | 'category' | 'views' | 'monthlyTrend' | 'stock' | 'price' | null;

interface Product {
  id: number;
  name: string;
  category: string;
  views: number;
  monthlyTrend: string;
  stock: number;
  price: number;
}

const analytics = getAnalytics();

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [products, setProducts] = useState(getProducts());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductFormData>({
    Brand: 'Good Bud',
    Title: '',
    Images: [],
    Description: '',
    Price: 0,
    Serving: ''
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedProducts = () => {
    if (!sortField) return products;

    return [...products].sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      switch (sortField) {
        case 'name':
          return direction * a.Title.localeCompare(b.Title);
        case 'category':
          return direction * (a.category || '').localeCompare(b.category || '');
        case 'views':
          return direction * ((a.views || 0) - (b.views || 0));
        case 'monthlyTrend':
          const trendA = parseInt(a.monthlyTrend?.replace('%', '') || '0');
          const trendB = parseInt(b.monthlyTrend?.replace('%', '') || '0');
          return direction * (trendA - trendB);
        case 'stock':
          return direction * ((a.stock || 0) - (b.stock || 0));
        case 'price':
          return direction * (a.Price - b.Price);
        default:
          return 0;
      }
    });
  };

  const filteredProducts = getSortedProducts().filter(product =>
    product.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;

    setProducts(products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    ));
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeTab === 'overview' && 'Dashboard'}
              {activeTab === 'products' && 'All Products'}
              {activeTab === 'analytics' && 'Analytics'}
              {activeTab === 'storefront' && 'Storefront'}
            </h1>
          </div>
        </header>

        <main className="p-6">
            {activeTab === 'storefront' && (
                <Storefront />
            )
            }
          {activeTab === 'overview' && (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-gray-500 text-sm font-medium">Monthly Views</h3>
                  <p className="text-2xl font-semibold text-gray-900">{analytics.overview.monthlyViews.toLocaleString()}</p>
                  <p className="text-green-600 text-sm mt-2">{analytics.overview.monthlyViewsChange} from last month</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-gray-500 text-sm font-medium">Monthly Visitors</h3>
                  <p className="text-2xl font-semibold text-gray-900">{analytics.overview.monthlyVisitors.toLocaleString()}</p>
                  <p className="text-green-600 text-sm mt-2">{analytics.overview.monthlyVisitorsChange} from last month</p>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Views</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.topProducts.map((product, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-3 px-4 text-sm text-gray-900">{product.name}</td>
                            <td className="py-3 px-4 text-sm text-gray-900">{product.views.toLocaleString()}</td>
                            <td className="py-3 px-4 text-sm">
                              <span className={product.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                                {product.trend}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {analytics.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900">{activity.event}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
                  <button
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Views</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product._id} className="border-b last:border-b-0">
                          <td className="py-3 px-4 text-sm text-gray-900">{product.Title}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">{product.views?.toLocaleString() || '0'}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">{product.monthlyTrend || '0%'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Date Range Selector */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <select
                      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      defaultValue="7days"
                    >
                      <option value="24h">Last 24 Hours</option>
                      <option value="7days">Last 7 Days</option>
                      <option value="30days">Last 30 Days</option>
                      <option value="90days">Last 90 Days</option>
                      <option value="custom">Custom Range</option>
                    </select>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                      <Calendar className="w-4 h-4" />
                      <span>Custom Date</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600">
                      Export Data
                    </button>
                  </div>
                </div>
              </div>

              {/* Traffic Overview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Traffic Overview</h2>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.dailyVisits}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#10B981"
                        activeDot={{ r: 8 }}
                        name="Page Views"
                      />
                      <Line
                        type="monotone"
                        dataKey="visits"
                        stroke="#6366F1"
                        activeDot={{ r: 8 }}
                        name="Unique Visits"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Product Performance */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Product Performance</h2>
                  <select
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    defaultValue="views"
                  >
                    <option value="views">Views</option>
                    <option value="revenue">Revenue</option>
                    <option value="both">Views & Revenue</option>
                  </select>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.productPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#10B981" />
                      <YAxis yAxisId="right" orientation="right" stroke="#6366F1" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="views" fill="#10B981" name="Views" />
                      <Bar yAxisId="right" dataKey="revenue" fill="#6366F1" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Daily Traffic Pattern */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Daily Traffic Pattern</h2>
                  <select
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    defaultValue="today"
                  >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="lastweek">Last Week Average</option>
                  </select>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.viewsByHour}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="views" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-900">{activity.event}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-500">Total Views Today</h3>
                  <p className="text-2xl font-semibold text-gray-900">5,123</p>
                  <p className="text-sm text-green-600 mt-2">+12.5% from yesterday</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-500">Average Time on Site</h3>
                  <p className="text-2xl font-semibold text-gray-900">4m 32s</p>
                  <p className="text-sm text-green-600 mt-2">+5.2% from last week</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
                  <p className="text-2xl font-semibold text-gray-900">2.8%</p>
                  <p className="text-sm text-red-600 mt-2">-0.5% from last week</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-500">Bounce Rate</h3>
                  <p className="text-2xl font-semibold text-gray-900">32%</p>
                  <p className="text-sm text-green-600 mt-2">-3.2% from last week</p>
                </div>
              </div>
            </div>
          )}

          {/* Edit Product Modal */}
          {isEditModalOpen && editingProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={editingProduct.Title}
                      onChange={(e) => setEditingProduct({ ...editingProduct, Title: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      value={editingProduct.Price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, Price: parseFloat(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Add Product Modal */}
          {isAddProductModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={newProduct.Title}
                      onChange={(e) => setNewProduct({ ...newProduct, Title: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={newProduct.Description}
                      onChange={(e) => setNewProduct({ ...newProduct, Description: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        value={newProduct.Price}
                        onChange={(e) => setNewProduct({ ...newProduct, Price: parseFloat(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Serving</label>
                      <input
                        type="text"
                        value={newProduct.Serving}
                        onChange={(e) => setNewProduct({ ...newProduct, Serving: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Images</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                          >
                            <span>Upload files</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAddProductModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Add product logic here
                      setIsAddProductModalOpen(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}