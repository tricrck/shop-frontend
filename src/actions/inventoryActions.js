import apiClient from '../api/apiClient';
import {
  WAREHOUSE_LIST_REQUEST,
  WAREHOUSE_LIST_SUCCESS,
  WAREHOUSE_LIST_FAIL,
  WAREHOUSE_DETAILS_REQUEST,
  WAREHOUSE_DETAILS_SUCCESS,
  WAREHOUSE_DETAILS_FAIL,
  WAREHOUSE_CREATE_REQUEST,
  WAREHOUSE_CREATE_SUCCESS,
  WAREHOUSE_CREATE_FAIL,
  WAREHOUSE_UPDATE_REQUEST,
  WAREHOUSE_UPDATE_SUCCESS,
  WAREHOUSE_UPDATE_FAIL,
  WAREHOUSE_DELETE_REQUEST,
  WAREHOUSE_DELETE_SUCCESS,
  WAREHOUSE_DELETE_FAIL,
  WAREHOUSE_INVENTORY_REQUEST,
  WAREHOUSE_INVENTORY_SUCCESS,
  WAREHOUSE_INVENTORY_FAIL,
  WAREHOUSE_STATS_REQUEST,
  WAREHOUSE_STATS_SUCCESS,
  WAREHOUSE_STATS_FAIL,
  WAREHOUSE_SET_PRIMARY_REQUEST,
  WAREHOUSE_SET_PRIMARY_SUCCESS,
  WAREHOUSE_SET_PRIMARY_FAIL,
  WAREHOUSE_STOCK_LIST_REQUEST,
  WAREHOUSE_STOCK_LIST_SUCCESS,
  WAREHOUSE_STOCK_LIST_FAIL,
  WAREHOUSE_STOCK_DETAILS_REQUEST,
  WAREHOUSE_STOCK_DETAILS_SUCCESS,
  WAREHOUSE_STOCK_DETAILS_FAIL,
  WAREHOUSE_STOCK_LOW_REQUEST,
  WAREHOUSE_STOCK_LOW_SUCCESS,
  WAREHOUSE_STOCK_LOW_FAIL,
  WAREHOUSE_STOCK_OUT_REQUEST,
  WAREHOUSE_STOCK_OUT_SUCCESS,
  WAREHOUSE_STOCK_OUT_FAIL,
  WAREHOUSE_STOCK_REORDER_REQUEST,
  WAREHOUSE_STOCK_REORDER_SUCCESS,
  WAREHOUSE_STOCK_REORDER_FAIL,
  WAREHOUSE_STOCK_ADJUST_REQUEST,
  WAREHOUSE_STOCK_ADJUST_SUCCESS,
  WAREHOUSE_STOCK_ADJUST_FAIL,
  WAREHOUSE_STOCK_RESERVE_REQUEST,
  WAREHOUSE_STOCK_RESERVE_SUCCESS,
  WAREHOUSE_STOCK_RESERVE_FAIL,
  STOCK_MOVEMENT_LIST_REQUEST,
  STOCK_MOVEMENT_LIST_SUCCESS,
  STOCK_MOVEMENT_LIST_FAIL,
  STOCK_MOVEMENT_DETAILS_REQUEST,
  STOCK_MOVEMENT_DETAILS_SUCCESS,
  STOCK_MOVEMENT_DETAILS_FAIL,
  STOCK_MOVEMENT_CREATE_REQUEST,
  STOCK_MOVEMENT_CREATE_SUCCESS,
  STOCK_MOVEMENT_CREATE_FAIL,
  STOCK_MOVEMENT_SUMMARY_REQUEST,
  STOCK_MOVEMENT_SUMMARY_SUCCESS,
  STOCK_MOVEMENT_SUMMARY_FAIL,
  STOCK_MOVEMENT_EXPORT_REQUEST,
  STOCK_MOVEMENT_EXPORT_SUCCESS,
  STOCK_MOVEMENT_EXPORT_FAIL,
  INVENTORY_TRANSFER_LIST_REQUEST,
  INVENTORY_TRANSFER_LIST_SUCCESS,
  INVENTORY_TRANSFER_LIST_FAIL,
  INVENTORY_TRANSFER_DETAILS_REQUEST,
  INVENTORY_TRANSFER_DETAILS_SUCCESS,
  INVENTORY_TRANSFER_DETAILS_FAIL,
  INVENTORY_TRANSFER_CREATE_REQUEST,
  INVENTORY_TRANSFER_CREATE_SUCCESS,
  INVENTORY_TRANSFER_CREATE_FAIL,
  INVENTORY_TRANSFER_APPROVE_REQUEST,
  INVENTORY_TRANSFER_APPROVE_SUCCESS,
  INVENTORY_TRANSFER_APPROVE_FAIL,
  INVENTORY_TRANSFER_SHIP_REQUEST,
  INVENTORY_TRANSFER_SHIP_SUCCESS,
  INVENTORY_TRANSFER_SHIP_FAIL,
  INVENTORY_TRANSFER_RECEIVE_REQUEST,
  INVENTORY_TRANSFER_RECEIVE_SUCCESS,
  INVENTORY_TRANSFER_RECEIVE_FAIL,
  INVENTORY_TRANSFER_CANCEL_REQUEST,
  INVENTORY_TRANSFER_CANCEL_SUCCESS,
  INVENTORY_TRANSFER_CANCEL_FAIL,
  STOCK_ALERT_LIST_REQUEST,
  STOCK_ALERT_LIST_SUCCESS,
  STOCK_ALERT_LIST_FAIL,
  STOCK_ALERT_DETAILS_REQUEST,
  STOCK_ALERT_DETAILS_SUCCESS,
  STOCK_ALERT_DETAILS_FAIL,
  STOCK_ALERT_RESOLVE_REQUEST,
  STOCK_ALERT_RESOLVE_SUCCESS,
  STOCK_ALERT_RESOLVE_FAIL,
  STOCK_ALERT_UNRESOLVED_REQUEST,
  STOCK_ALERT_UNRESOLVED_SUCCESS,
  STOCK_ALERT_UNRESOLVED_FAIL,
  STOCK_ALERT_CRITICAL_REQUEST,
  STOCK_ALERT_CRITICAL_SUCCESS,
  STOCK_ALERT_CRITICAL_FAIL,
  STOCK_COUNT_LIST_REQUEST,
  STOCK_COUNT_LIST_SUCCESS,
  STOCK_COUNT_LIST_FAIL,
  STOCK_COUNT_DETAILS_REQUEST,
  STOCK_COUNT_DETAILS_SUCCESS,
  STOCK_COUNT_DETAILS_FAIL,
  STOCK_COUNT_CREATE_REQUEST,
  STOCK_COUNT_CREATE_SUCCESS,
  STOCK_COUNT_CREATE_FAIL,
  STOCK_COUNT_START_REQUEST,
  STOCK_COUNT_START_SUCCESS,
  STOCK_COUNT_START_FAIL,
  STOCK_COUNT_RECORD_REQUEST,
  STOCK_COUNT_RECORD_SUCCESS,
  STOCK_COUNT_RECORD_FAIL,
  STOCK_COUNT_COMPLETE_REQUEST,
  STOCK_COUNT_COMPLETE_SUCCESS,
  STOCK_COUNT_COMPLETE_FAIL,
  INVENTORY_ANALYTICS_REQUEST,
  INVENTORY_ANALYTICS_SUCCESS,
  INVENTORY_ANALYTICS_FAIL,
  BULK_INVENTORY_UPDATE_REQUEST,
  BULK_INVENTORY_UPDATE_SUCCESS,
  BULK_INVENTORY_UPDATE_FAIL,
  SET_INVENTORY_FILTERS,
  CLEAR_INVENTORY_FILTERS,
  SET_INVENTORY_SORT,
} from '../constants/inventoryConstants';

// ============ WAREHOUSE ACTIONS ============

// List all warehouses
export const listWarehouses = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_LIST_REQUEST });

    const queryParams = new URLSearchParams();
    
    if (params.is_active !== undefined) queryParams.append('is_active', params.is_active);
    if (params.is_primary !== undefined) queryParams.append('is_primary', params.is_primary);
    if (params.city) queryParams.append('city', params.city);
    if (params.state) queryParams.append('state', params.state);
    if (params.country) queryParams.append('country', params.country);
    if (params.search) queryParams.append('search', params.search);
    if (params.ordering) queryParams.append('ordering', params.ordering);

    const { data } = await apiClient.get(`/inventory/warehouses/?${queryParams.toString()}`);

    dispatch({
      type: WAREHOUSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WAREHOUSE_LIST_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch warehouses',
    });
  }
};

// Get warehouse details
export const getWarehouseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_DETAILS_REQUEST });

    const { data } = await apiClient.get(`/inventory/warehouses/${id}/`);

    dispatch({
      type: WAREHOUSE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WAREHOUSE_DETAILS_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch warehouse details',
    });
  }
};

// Create warehouse (admin)
export const createWarehouse = (warehouseData) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_CREATE_REQUEST });

    const { data } = await apiClient.post('/inventory/warehouses/', warehouseData);

    dispatch({
      type: WAREHOUSE_CREATE_SUCCESS,
      payload: data,
    });

    return { success: true, warehouse: data };
  } catch (error) {
    dispatch({
      type: WAREHOUSE_CREATE_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to create warehouse',
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Update warehouse (admin)
export const updateWarehouse = (id, warehouseData) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_UPDATE_REQUEST });

    const { data } = await apiClient.put(`/inventory/warehouses/${id}/`, warehouseData);

    dispatch({
      type: WAREHOUSE_UPDATE_SUCCESS,
      payload: data,
    });

    // Refresh warehouse details
    dispatch(getWarehouseDetails(id));

    return { success: true, warehouse: data };
  } catch (error) {
    dispatch({
      type: WAREHOUSE_UPDATE_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to update warehouse',
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Delete warehouse (admin)
export const deleteWarehouse = (id) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_DELETE_REQUEST });

    await apiClient.delete(`/inventory/warehouses/${id}/`);

    dispatch({
      type: WAREHOUSE_DELETE_SUCCESS,
      payload: id,
    });

    return { success: true };
  } catch (error) {
    dispatch({
      type: WAREHOUSE_DELETE_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to delete warehouse',
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Get warehouse inventory
export const getWarehouseInventory = (id, params = {}) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_INVENTORY_REQUEST });

    const queryParams = new URLSearchParams();
    if (params.low_stock !== undefined) queryParams.append('low_stock', params.low_stock);
    if (params.out_of_stock !== undefined) queryParams.append('out_of_stock', params.out_of_stock);

    const { data } = await apiClient.get(
      `/inventory/warehouses/${id}/inventory/?${queryParams.toString()}`
    );

    dispatch({
      type: WAREHOUSE_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WAREHOUSE_INVENTORY_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch warehouse inventory',
    });
  }
};

// Get warehouse statistics
export const getWarehouseStats = (id) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_STATS_REQUEST });

    const { data } = await apiClient.get(`/inventory/warehouses/${id}/stats/`);

    dispatch({
      type: WAREHOUSE_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WAREHOUSE_STATS_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch warehouse stats',
    });
  }
};

// Set warehouse as primary (admin)
export const setWarehousePrimary = (id) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_SET_PRIMARY_REQUEST });

    const { data } = await apiClient.post(`/inventory/warehouses/${id}/set_primary/`);

    dispatch({
      type: WAREHOUSE_SET_PRIMARY_SUCCESS,
      payload: data,
    });

    // Refresh warehouse list
    dispatch(listWarehouses());

    return { success: true };
  } catch (error) {
    dispatch({
      type: WAREHOUSE_SET_PRIMARY_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to set primary warehouse',
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// ============ WAREHOUSE STOCK ACTIONS ============

// List warehouse stock
export const listWarehouseStock = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_STOCK_LIST_REQUEST });

    const queryParams = new URLSearchParams();
    
    if (params.warehouse) queryParams.append('warehouse', params.warehouse);
    if (params.product) queryParams.append('product', params.product);
    if (params.search) queryParams.append('search', params.search);
    if (params.ordering) queryParams.append('ordering', params.ordering);
    if (params.page) queryParams.append('page', params.page);

    const { data } = await apiClient.get(`/inventory/stock/?${queryParams.toString()}`);

    dispatch({
      type: WAREHOUSE_STOCK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WAREHOUSE_STOCK_LIST_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch warehouse stock',
    });
  }
};

// Get warehouse stock details
export const getWarehouseStockDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_STOCK_DETAILS_REQUEST });

    const { data } = await apiClient.get(`/inventory/stock/${id}/`);

    dispatch({
      type: WAREHOUSE_STOCK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WAREHOUSE_STOCK_DETAILS_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch stock details',
    });
  }
};

// Get low stock items
export const getLowStock = () => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_STOCK_LOW_REQUEST });

    const { data } = await apiClient.get('/inventory/stock/low_stock/');

    dispatch({
      type: WAREHOUSE_STOCK_LOW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WAREHOUSE_STOCK_LOW_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch low stock items',
    });
  }
};

// Get out of stock items
export const getOutOfStock = () => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_STOCK_OUT_REQUEST });

    const { data } = await apiClient.get('/inventory/stock/out_of_stock/');

    dispatch({
      type: WAREHOUSE_STOCK_OUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WAREHOUSE_STOCK_OUT_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch out of stock items',
    });
  }
};

// Get reorder suggestions
export const getReorderSuggestions = () => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_STOCK_REORDER_REQUEST });

    const { data } = await apiClient.get('/inventory/stock/reorder_suggestions/');

    dispatch({
      type: WAREHOUSE_STOCK_REORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WAREHOUSE_STOCK_REORDER_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch reorder suggestions',
    });
  }
};

// Adjust stock (admin)
export const adjustStock = (id, adjustmentData) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_STOCK_ADJUST_REQUEST });

    const { data } = await apiClient.post(`/inventory/stock/${id}/adjust_stock/`, adjustmentData);

    dispatch({
      type: WAREHOUSE_STOCK_ADJUST_SUCCESS,
      payload: data,
    });

    // Refresh stock details
    dispatch(getWarehouseStockDetails(id));

    return { success: true, data };
  } catch (error) {
    dispatch({
      type: WAREHOUSE_STOCK_ADJUST_FAIL,
      payload:
        error.response?.data?.error || error.message || 'Failed to adjust stock',
    });
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

// Reserve stock (admin)
export const reserveStock = (id, quantity) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_STOCK_RESERVE_REQUEST });

    const { data } = await apiClient.post(`/inventory/stock/${id}/reserve/`, { quantity });

    dispatch({
      type: WAREHOUSE_STOCK_RESERVE_SUCCESS,
      payload: data,
    });

    return { success: true, data };
  } catch (error) {
    dispatch({
      type: WAREHOUSE_STOCK_RESERVE_FAIL,
      payload:
        error.response?.data?.error || error.message || 'Failed to reserve stock',
    });
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

// ============ STOCK MOVEMENT ACTIONS ============

// List stock movements
export const listStockMovements = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_MOVEMENT_LIST_REQUEST });

    const queryParams = new URLSearchParams();
    
    if (params.warehouse) queryParams.append('warehouse', params.warehouse);
    if (params.product) queryParams.append('product', params.product);
    if (params.movement_type) queryParams.append('movement_type', params.movement_type);
    if (params.created_by) queryParams.append('created_by', params.created_by);
    if (params.search) queryParams.append('search', params.search);
    if (params.ordering) queryParams.append('ordering', params.ordering);
    if (params.page) queryParams.append('page', params.page);

    const { data } = await apiClient.get(`/inventory/movements/?${queryParams.toString()}`);

    dispatch({
      type: STOCK_MOVEMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_MOVEMENT_LIST_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch stock movements',
    });
  }
};

// Get stock movement details
export const getStockMovementDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_MOVEMENT_DETAILS_REQUEST });

    const { data } = await apiClient.get(`/inventory/movements/${id}/`);

    dispatch({
      type: STOCK_MOVEMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_MOVEMENT_DETAILS_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch movement details',
    });
  }
};

// Create stock movement (admin)
export const createStockMovement = (movementData) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_MOVEMENT_CREATE_REQUEST });

    const { data } = await apiClient.post('/inventory/movements/', movementData);

    dispatch({
      type: STOCK_MOVEMENT_CREATE_SUCCESS,
      payload: data,
    });

    return { success: true, movement: data };
  } catch (error) {
    dispatch({
      type: STOCK_MOVEMENT_CREATE_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to create stock movement',
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Get stock movement summary
export const getStockMovementSummary = (days = 30) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_MOVEMENT_SUMMARY_REQUEST });

    const { data } = await apiClient.get(`/inventory/movements/summary/?days=${days}`);

    dispatch({
      type: STOCK_MOVEMENT_SUMMARY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_MOVEMENT_SUMMARY_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch movement summary',
    });
  }
};

// Export stock movements (admin)
export const exportStockMovements = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_MOVEMENT_EXPORT_REQUEST });

    const queryParams = new URLSearchParams();
    if (params.warehouse) queryParams.append('warehouse', params.warehouse);
    if (params.movement_type) queryParams.append('movement_type', params.movement_type);

    const response = await apiClient.get(`/inventory/movements/export/?${queryParams.toString()}`, {
      responseType: 'blob',
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `stock_movements_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    dispatch({
      type: STOCK_MOVEMENT_EXPORT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: STOCK_MOVEMENT_EXPORT_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to export movements',
    });
  }
};

// ============ INVENTORY TRANSFER ACTIONS ============

// List inventory transfers
export const listInventoryTransfers = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_TRANSFER_LIST_REQUEST });

    const queryParams = new URLSearchParams();
    
    if (params.status) queryParams.append('status', params.status);
    if (params.from_warehouse) queryParams.append('from_warehouse', params.from_warehouse);
    if (params.to_warehouse) queryParams.append('to_warehouse', params.to_warehouse);
    if (params.search) queryParams.append('search', params.search);
    if (params.ordering) queryParams.append('ordering', params.ordering);
    if (params.page) queryParams.append('page', params.page);

    const { data } = await apiClient.get(`/inventory/transfers/?${queryParams.toString()}`);

    dispatch({
      type: INVENTORY_TRANSFER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVENTORY_TRANSFER_LIST_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch inventory transfers',
    });
  }
};

// Get inventory transfer details
export const getInventoryTransferDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_TRANSFER_DETAILS_REQUEST });

    const { data } = await apiClient.get(`/inventory/transfers/${id}/`);

    dispatch({
      type: INVENTORY_TRANSFER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVENTORY_TRANSFER_DETAILS_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch transfer details',
    });
  }
};

// Create inventory transfer (admin)
export const createInventoryTransfer = (transferData) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_TRANSFER_CREATE_REQUEST });

    const { data } = await apiClient.post('/inventory/transfers/', transferData);

    dispatch({
      type: INVENTORY_TRANSFER_CREATE_SUCCESS,
      payload: data,
    });

    return { success: true, transfer: data };
  } catch (error) {
    dispatch({
      type: INVENTORY_TRANSFER_CREATE_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to create transfer',
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Approve inventory transfer (admin)
export const approveInventoryTransfer = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_TRANSFER_APPROVE_REQUEST });

    const { data } = await apiClient.post(`/inventory/transfers/${id}/approve/`);

    dispatch({
      type: INVENTORY_TRANSFER_APPROVE_SUCCESS,
      payload: data,
    });

    // Refresh transfer details
    dispatch(getInventoryTransferDetails(id));

    return { success: true, data };
  } catch (error) {
    dispatch({
      type: INVENTORY_TRANSFER_APPROVE_FAIL,
      payload:
        error.response?.data?.error || error.message || 'Failed to approve transfer',
    });
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

// Ship inventory transfer (admin)
export const shipInventoryTransfer = (id, trackingNumber) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_TRANSFER_SHIP_REQUEST });

    const { data } = await apiClient.post(`/inventory/transfers/${id}/ship/`, {
      tracking_number: trackingNumber,
    });

    dispatch({
      type: INVENTORY_TRANSFER_SHIP_SUCCESS,
      payload: data,
    });

    // Refresh transfer details
    dispatch(getInventoryTransferDetails(id));

    return { success: true, data };
  } catch (error) {
    dispatch({
      type: INVENTORY_TRANSFER_SHIP_FAIL,
      payload:
        error.response?.data?.error || error.message || 'Failed to ship transfer',
    });
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

// Receive inventory transfer (admin)
export const receiveInventoryTransfer = (id, receivedItems = null) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_TRANSFER_RECEIVE_REQUEST });

    const { data } = await apiClient.post(`/inventory/transfers/${id}/receive/`, {
      items: receivedItems,
    });

    dispatch({
      type: INVENTORY_TRANSFER_RECEIVE_SUCCESS,
      payload: data,
    });

    // Refresh transfer details
    dispatch(getInventoryTransferDetails(id));

    return { success: true, data };
  } catch (error) {
    dispatch({
      type: INVENTORY_TRANSFER_RECEIVE_FAIL,
      payload:
        error.response?.data?.error || error.message || 'Failed to receive transfer',
    });
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

// Cancel inventory transfer (admin)
export const cancelInventoryTransfer = (id, reason = '') => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_TRANSFER_CANCEL_REQUEST });

    const { data } = await apiClient.post(`/inventory/transfers/${id}/cancel/`, { reason });

    dispatch({
      type: INVENTORY_TRANSFER_CANCEL_SUCCESS,
      payload: data,
    });

    // Refresh transfer details
    dispatch(getInventoryTransferDetails(id));

    return { success: true, data };
  } catch (error) {
    dispatch({
      type: INVENTORY_TRANSFER_CANCEL_FAIL,
      payload:
        error.response?.data?.error || error.message || 'Failed to cancel transfer',
    });
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

// ============ STOCK ALERT ACTIONS ============

// List stock alerts
export const listStockAlerts = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_ALERT_LIST_REQUEST });

    const queryParams = new URLSearchParams();
    
    if (params.alert_type) queryParams.append('alert_type', params.alert_type);
    if (params.priority) queryParams.append('priority', params.priority);
    if (params.warehouse) queryParams.append('warehouse', params.warehouse);
    if (params.is_resolved !== undefined) queryParams.append('is_resolved', params.is_resolved);
    if (params.ordering) queryParams.append('ordering', params.ordering);

    const { data } = await apiClient.get(`/inventory/alerts/?${queryParams.toString()}`);

    dispatch({
      type: STOCK_ALERT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_ALERT_LIST_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch stock alerts',
    });
  }
};

// Get stock alert details
export const getStockAlertDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_ALERT_DETAILS_REQUEST });

    const { data } = await apiClient.get(`/inventory/alerts/${id}/`);

    dispatch({
      type: STOCK_ALERT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_ALERT_DETAILS_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch alert details',
    });
  }
};

// Resolve stock alert (admin)
export const resolveStockAlert = (id, notes = '') => async (dispatch) => {
  try {
    dispatch({ type: STOCK_ALERT_RESOLVE_REQUEST });

    const { data } = await apiClient.post(`/inventory/alerts/${id}/resolve/`, { notes });

    dispatch({
      type: STOCK_ALERT_RESOLVE_SUCCESS,
      payload: data,
    });

    // Refresh alert lists
    dispatch(listStockAlerts());

    return { success: true, data };
  } catch (error) {
    dispatch({
      type: STOCK_ALERT_RESOLVE_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to resolve alert',
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Get unresolved alerts
export const getUnresolvedAlerts = () => async (dispatch) => {
  try {
    dispatch({ type: STOCK_ALERT_UNRESOLVED_REQUEST });

    const { data } = await apiClient.get('/inventory/alerts/unresolved/');

    dispatch({
      type: STOCK_ALERT_UNRESOLVED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_ALERT_UNRESOLVED_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch unresolved alerts',
    });
  }
};

// Get critical alerts
export const getCriticalAlerts = () => async (dispatch) => {
  try {
    dispatch({ type: STOCK_ALERT_CRITICAL_REQUEST });

    const { data } = await apiClient.get('/inventory/alerts/critical/');

    dispatch({
      type: STOCK_ALERT_CRITICAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_ALERT_CRITICAL_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch critical alerts',
    });
  }
};

// ============ STOCK COUNT ACTIONS ============

// List stock counts (admin)
export const listStockCounts = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_COUNT_LIST_REQUEST });

    const queryParams = new URLSearchParams();
    
    if (params.warehouse) queryParams.append('warehouse', params.warehouse);
    if (params.status) queryParams.append('status', params.status);
    if (params.count_type) queryParams.append('count_type', params.count_type);
    if (params.assigned_to) queryParams.append('assigned_to', params.assigned_to);
    if (params.ordering) queryParams.append('ordering', params.ordering);

    const { data } = await apiClient.get(`/inventory/counts/?${queryParams.toString()}`);

    dispatch({
      type: STOCK_COUNT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_COUNT_LIST_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch stock counts',
    });
  }
};

// Get stock count details (admin)
export const getStockCountDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_COUNT_DETAILS_REQUEST });

    const { data } = await apiClient.get(`/inventory/counts/${id}/`);

    dispatch({
      type: STOCK_COUNT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_COUNT_DETAILS_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch count details',
    });
  }
};

// Create stock count (admin)
export const createStockCount = (countData) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_COUNT_CREATE_REQUEST });

    const { data } = await apiClient.post('/inventory/counts/', countData);

    dispatch({
      type: STOCK_COUNT_CREATE_SUCCESS,
      payload: data,
    });

    return { success: true, count: data };
  } catch (error) {
    dispatch({
      type: STOCK_COUNT_CREATE_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to create stock count',
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Start stock count (admin)
export const startStockCount = (id) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_COUNT_START_REQUEST });

    const { data } = await apiClient.post(`/inventory/counts/${id}/start/`);

    dispatch({
      type: STOCK_COUNT_START_SUCCESS,
      payload: data,
    });

    // Refresh count details
    dispatch(getStockCountDetails(id));

    return { success: true, data };
  } catch (error) {
    dispatch({
      type: STOCK_COUNT_START_FAIL,
      payload:
        error.response?.data?.error || error.message || 'Failed to start count',
    });
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

// Record count for item (admin)
export const recordStockCount = (countId, recordData) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_COUNT_RECORD_REQUEST });

    const { data } = await apiClient.post(`/inventory/counts/${countId}/record_count/`, recordData);

    dispatch({
      type: STOCK_COUNT_RECORD_SUCCESS,
      payload: data,
    });

    // Refresh count details
    dispatch(getStockCountDetails(countId));

    return { success: true, data };
  } catch (error) {
    dispatch({
      type: STOCK_COUNT_RECORD_FAIL,
      payload:
        error.response?.data?.error || error.message || 'Failed to record count',
    });
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

// Complete stock count (admin)
export const completeStockCount = (id, applyAdjustments = true) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_COUNT_COMPLETE_REQUEST });

    const { data } = await apiClient.post(`/inventory/counts/${id}/complete/`, {
      apply_adjustments: applyAdjustments,
    });

    dispatch({
      type: STOCK_COUNT_COMPLETE_SUCCESS,
      payload: data,
    });

    // Refresh count details
    dispatch(getStockCountDetails(id));

    return { success: true, data };
  } catch (error) {
    dispatch({
      type: STOCK_COUNT_COMPLETE_FAIL,
      payload:
        error.response?.data?.error || error.message || 'Failed to complete count',
    });
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

// ============ ANALYTICS ACTIONS ============

// Get inventory analytics
export const getInventoryAnalytics = (period = 'month', warehouseId = null) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_ANALYTICS_REQUEST });

    const queryParams = new URLSearchParams();
    queryParams.append('period', period);
    if (warehouseId) queryParams.append('warehouse', warehouseId);

    const { data } = await apiClient.get(`/inventory/analytics/?${queryParams.toString()}`);

    dispatch({
      type: INVENTORY_ANALYTICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVENTORY_ANALYTICS_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to fetch analytics',
    });
  }
};

// ============ BULK OPERATIONS ACTIONS ============

// Bulk update inventory (admin)
export const bulkUpdateInventory = (updates) => async (dispatch) => {
  try {
    dispatch({ type: BULK_INVENTORY_UPDATE_REQUEST });

    const { data } = await apiClient.post('/inventory/bulk-operations/', { updates });

    dispatch({
      type: BULK_INVENTORY_UPDATE_SUCCESS,
      payload: data,
    });

    return { success: true, results: data.results };
  } catch (error) {
    dispatch({
      type: BULK_INVENTORY_UPDATE_FAIL,
      payload:
        error.response?.data?.message || error.message || 'Failed to perform bulk update',
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// ============ FILTER ACTIONS ============

// Set inventory filters
export const setInventoryFilters = (filters) => (dispatch) => {
  dispatch({
    type: SET_INVENTORY_FILTERS,
    payload: filters,
  });
};

// Clear inventory filters
export const clearInventoryFilters = () => (dispatch) => {
  dispatch({ type: CLEAR_INVENTORY_FILTERS });
};

// Set inventory sort option
export const setInventorySort = (sortOption) => (dispatch) => {
  dispatch({
    type: SET_INVENTORY_SORT,
    payload: sortOption,
  });
};