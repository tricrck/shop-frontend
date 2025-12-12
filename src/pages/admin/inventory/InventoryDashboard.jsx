// InventoryDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Package, 
  AlertTriangle, 
  BarChart3, 
  TrendingUp, 
  RefreshCw, 
  ArrowUpDown,
  Building2,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Truck,
  History,
  ClipboardCheck,
  Bell,
  Database
} from 'lucide-react';
import {
  getWarehouseStats,
  getLowStock,
  getOutOfStock,
  getInventoryAnalytics,
  listStockMovements,
  getUnresolvedAlerts
} from '../../../actions/inventoryActions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Skeleton } from '../../../components/ui/skeleton';

export const InventoryDashboard = () => {
  const dispatch = useDispatch();
  const [timeRange, setTimeRange] = useState('month');
  
  const { stats, loading: statsLoading } = useSelector(state => state.warehouseStats);
  const { stock: lowStock, loading: lowStockLoading } = useSelector(state => state.warehouseStockLow);
  const { stock: outOfStock, loading: outOfStockLoading } = useSelector(state => state.warehouseStockOut);
  const { analytics, loading: analyticsLoading } = useSelector(state => state.inventoryAnalytics);
  const { movements, loading: movementsLoading } = useSelector(state => state.stockMovementList);
  const { alerts: unresolvedAlerts, loading: alertsLoading } = useSelector(state => state.stockAlertUnresolved);

  useEffect(() => {
    dispatch(getWarehouseStats());
    dispatch(getLowStock());
    dispatch(getOutOfStock());
    dispatch(getInventoryAnalytics(timeRange));
    dispatch(listStockMovements({ ordering: '-created_at', page_size: 10 }));
    dispatch(getUnresolvedAlerts());
  }, [dispatch, timeRange]);

  const refreshDashboard = () => {
    dispatch(getWarehouseStats());
    dispatch(getLowStock());
    dispatch(getOutOfStock());
    dispatch(getInventoryAnalytics(timeRange));
    dispatch(listStockMovements({ ordering: '-created_at', page_size: 10 }));
    dispatch(getUnresolvedAlerts());
  };

  const getStockLevelBadge = (quantity, minQuantity) => {
    const percentage = minQuantity > 0 ? (quantity / minQuantity) * 100 : 0;
    
    if (quantity === 0) return { variant: "destructive", text: "Out of Stock" };
    if (percentage < 30) return { variant: "destructive", text: "Critical" };
    if (percentage < 60) return { variant: "warning", text: "Low" };
    if (percentage < 90) return { variant: "secondary", text: "Medium" };
    return { variant: "default", text: "Good" };
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Dashboard</h1>
          <p className="text-muted-foreground">Real-time overview of your inventory status</p>
        </div>
        <Button variant="outline" size="sm" onClick={refreshDashboard}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  ${stats?.total_value?.toLocaleString() || '0'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats?.item_count || 0} items across {stats?.warehouse_count || 0} warehouses
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            {lowStockLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{lowStock?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Items below reorder level
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            {outOfStockLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{outOfStock?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Items requiring immediate attention
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unresolved Alerts</CardTitle>
            <Bell className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            {alertsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{unresolvedAlerts?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Alerts pending resolution
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Stock Movements</CardTitle>
            <CardDescription>Latest inventory changes</CardDescription>
          </CardHeader>
          <CardContent>
            {movementsLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {movements?.slice(0, 5).map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{movement.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {movement.movement_type} • {movement.warehouse_name}
                        </p>
                      </div>
                    </div>
                    <Badge variant={
                      movement.movement_type === 'IN' ? 'default' : 
                      movement.movement_type === 'OUT' ? 'destructive' : 'secondary'
                    }>
                      {movement.quantity} units
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
            <CardDescription>Requires immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            {alertsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {unresolvedAlerts?.slice(0, 3).map((alert) => {
                  const badgeInfo = getStockLevelBadge(alert.current_quantity, alert.min_quantity);
                  return (
                    <div key={alert.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                          <div>
                            <p className="font-medium">{alert.product_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {alert.warehouse_name} • {alert.alert_type}
                            </p>
                          </div>
                        </div>
                        <Badge variant={badgeInfo.variant}>
                          {badgeInfo.text}
                        </Badge>
                      </div>
                      <p className="text-sm mt-2 text-red-700">
                        Current: {alert.current_quantity} • Minimum: {alert.min_quantity}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Analytics</CardTitle>
          <CardDescription>
            <div className="flex items-center space-x-4">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border rounded-md px-3 py-1"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
              <span className="text-sm text-muted-foreground">
                {analytics?.total_movements || 0} movements in period
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analyticsLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-40 w-full" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Inbound</span>
                  <Badge variant="default" className="ml-2">
                    {analytics?.inbound_count || 0}
                  </Badge>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ 
                      width: `${((analytics?.inbound_count || 0) / (analytics?.total_movements || 1)) * 100}%` 
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {analytics?.inbound_quantity || 0} units received
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Outbound</span>
                  <Badge variant="destructive" className="ml-2">
                    {analytics?.outbound_count || 0}
                  </Badge>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500" 
                    style={{ 
                      width: `${((analytics?.outbound_count || 0) / (analytics?.total_movements || 1)) * 100}%` 
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {analytics?.outbound_quantity || 0} units shipped
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Transfers</span>
                  <Badge variant="secondary" className="ml-2">
                    {analytics?.transfer_count || 0}
                  </Badge>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ 
                      width: `${((analytics?.transfer_count || 0) / (analytics?.total_movements || 1)) * 100}%` 
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {analytics?.transfer_quantity || 0} units transferred
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};