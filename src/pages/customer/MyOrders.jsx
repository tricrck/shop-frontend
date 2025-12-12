import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  DollarSign,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

// shadcn components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Redux actions
import { getMyOrders, listOrders, exportOrders } from '../../actions/orderActions';

// Customer Orders Page
const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const myOrders = useSelector(state => state.myOrders);
  const { loading, error, orders } = myOrders;

  console.log('My Orders:', orders);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      const params = statusFilter !== 'all' ? { status: statusFilter } : {};
      dispatch(getMyOrders(params));
    }
  }, [dispatch, navigate, userInfo, statusFilter]);

  const getStatusBadge = (order) => {
    if (order.isDelivered) {
      return <Badge className="bg-green-500">Delivered</Badge>;
    }
    if (order.isPaid) {
      return <Badge className="bg-blue-500">Processing</Badge>;
    }
    return <Badge variant="outline">Pending</Badge>;
  };

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.order_number?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by order number..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
              <Button onClick={() => navigate('/products')}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-lg">#{order.order_number}</h3>
                        {getStatusBadge(order)}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold text-gray-900">KSH {order.total}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>{order.items_count || 0} items</span>
                        </div>
                        {order.isPaid && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Paid</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate(`/order/${order.order_number}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {order.tracking_number && (
                        <Button variant="outline">
                          <Truck className="h-4 w-4 mr-2" />
                          Track
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {orders?.count > 10 && (
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" disabled={!orders.previous}>
              Previous
            </Button>
            <Button variant="outline" disabled={!orders.next}>
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Admin Orders Page
const AllOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    status: 'all',
    payment_status: 'all',
    search: ''
  });

  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderExport = useSelector(state => state.orderExport);
  const { loading: exportLoading } = orderExport;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate('/login');
    } else {
      const params = {};
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.payment_status !== 'all') params.payment_status = filters.payment_status;
      if (filters.search) params.order_number = filters.search;
      
      dispatch(listOrders(params));
    }
  }, [dispatch, navigate, userInfo, filters]);

  const handleExport = () => {
    const params = {};
    if (filters.status !== 'all') params.status = filters.status;
    dispatch(exportOrders(params));
  };

  const getStatusIcon = (order) => {
    if (order.isDelivered) return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (order.status === 'cancelled') return <XCircle className="h-4 w-4 text-red-500" />;
    return <Clock className="h-4 w-4 text-blue-500" />;
  };

  const stats = {
    total: orders?.count || 0,
    pending: orders?.filter(o => !o.isPaid).length || 0,
    processing: orders?.filter(o => o.isPaid && !o.isDelivered).length || 0,
    completed: orders?.filter(o => o.isDelivered).length || 0
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Orders</h1>
            <p className="text-gray-600">Manage and track all customer orders</p>
          </div>
          <Button onClick={handleExport} disabled={exportLoading}>
            <Download className="h-4 w-4 mr-2" />
            {exportLoading ? 'Exporting...' : 'Export CSV'}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Orders', value: stats.total, icon: Package, color: 'text-blue-600' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600' },
            { label: 'Processing', value: stats.processing, icon: Truck, color: 'text-purple-600' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-green-600' }
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by order number..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              
              <Select 
                value={filters.status} 
                onValueChange={(val) => setFilters({ ...filters, status: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.payment_status} 
                onValueChange={(val) => setFilters({ ...filters, payment_status: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Orders Table */}
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : orders?.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders?.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          #{order.order_number}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer_name || 'Guest'}</p>
                            <p className="text-sm text-gray-600">{order.customer_email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${order.total}
                        </TableCell>
                        <TableCell>
                          {order.isPaid ? (
                            <Badge className="bg-green-500">Paid</Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order)}
                            <span className="text-sm">
                              {order.isDelivered ? 'Delivered' : order.status || 'Processing'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/admin/order/${order.order_number}`)}
                          >
                            View
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {orders?.count > orders?.length && (
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" disabled={!orders.previous}>
              Previous
            </Button>
            <Button variant="outline" disabled={!orders.next}>
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Export both components
export { MyOrders, AllOrders };