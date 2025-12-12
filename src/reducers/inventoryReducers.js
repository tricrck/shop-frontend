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

// ============ WAREHOUSE REDUCERS ============

export const warehouseListReducer = (state = { warehouses: [] }, action) => {
  switch (action.type) {
    case WAREHOUSE_LIST_REQUEST:
      return { loading: true, warehouses: [] };
    case WAREHOUSE_LIST_SUCCESS:
      return { loading: false, warehouses: action.payload };
    case WAREHOUSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseDetailsReducer = (state = { warehouse: {} }, action) => {
  switch (action.type) {
    case WAREHOUSE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case WAREHOUSE_DETAILS_SUCCESS:
      return { loading: false, warehouse: action.payload };
    case WAREHOUSE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WAREHOUSE_CREATE_REQUEST:
      return { loading: true };
    case WAREHOUSE_CREATE_SUCCESS:
      return { loading: false, success: true, warehouse: action.payload };
    case WAREHOUSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case WAREHOUSE_UPDATE_REQUEST:
      return { loading: true };
    case WAREHOUSE_UPDATE_SUCCESS:
      return { loading: false, success: true, warehouse: action.payload };
    case WAREHOUSE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WAREHOUSE_DELETE_REQUEST:
      return { loading: true };
    case WAREHOUSE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WAREHOUSE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseInventoryReducer = (state = { inventory: [] }, action) => {
  switch (action.type) {
    case WAREHOUSE_INVENTORY_REQUEST:
      return { loading: true, inventory: [] };
    case WAREHOUSE_INVENTORY_SUCCESS:
      return { loading: false, inventory: action.payload };
    case WAREHOUSE_INVENTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case WAREHOUSE_STATS_REQUEST:
      return { loading: true, stats: {} };
    case WAREHOUSE_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case WAREHOUSE_STATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseSetPrimaryReducer = (state = {}, action) => {
  switch (action.type) {
    case WAREHOUSE_SET_PRIMARY_REQUEST:
      return { loading: true };
    case WAREHOUSE_SET_PRIMARY_SUCCESS:
      return { loading: false, success: true };
    case WAREHOUSE_SET_PRIMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ WAREHOUSE STOCK REDUCERS ============

export const warehouseStockListReducer = (
  state = { stock: [], count: 0, next: null, previous: null },
  action
) => {
  switch (action.type) {
    case WAREHOUSE_STOCK_LIST_REQUEST:
      return { loading: true, stock: [], count: 0 };
    case WAREHOUSE_STOCK_LIST_SUCCESS:
      return {
        loading: false,
        stock: action.payload.results || action.payload,
        count: action.payload.count || 0,
        next: action.payload.next || null,
        previous: action.payload.previous || null,
      };
    case WAREHOUSE_STOCK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseStockDetailsReducer = (state = { stock: {} }, action) => {
  switch (action.type) {
    case WAREHOUSE_STOCK_DETAILS_REQUEST:
      return { loading: true, ...state };
    case WAREHOUSE_STOCK_DETAILS_SUCCESS:
      return { loading: false, stock: action.payload };
    case WAREHOUSE_STOCK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseStockLowReducer = (state = { stock: [] }, action) => {
  switch (action.type) {
    case WAREHOUSE_STOCK_LOW_REQUEST:
      return { loading: true, stock: [] };
    case WAREHOUSE_STOCK_LOW_SUCCESS:
      return { loading: false, stock: action.payload };
    case WAREHOUSE_STOCK_LOW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseStockOutReducer = (state = { stock: [] }, action) => {
  switch (action.type) {
    case WAREHOUSE_STOCK_OUT_REQUEST:
      return { loading: true, stock: [] };
    case WAREHOUSE_STOCK_OUT_SUCCESS:
      return { loading: false, stock: action.payload };
    case WAREHOUSE_STOCK_OUT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseStockReorderReducer = (state = { suggestions: [] }, action) => {
  switch (action.type) {
    case WAREHOUSE_STOCK_REORDER_REQUEST:
      return { loading: true, suggestions: [] };
    case WAREHOUSE_STOCK_REORDER_SUCCESS:
      return { loading: false, suggestions: action.payload };
    case WAREHOUSE_STOCK_REORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseStockAdjustReducer = (state = {}, action) => {
  switch (action.type) {
    case WAREHOUSE_STOCK_ADJUST_REQUEST:
      return { loading: true };
    case WAREHOUSE_STOCK_ADJUST_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case WAREHOUSE_STOCK_ADJUST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const warehouseStockReserveReducer = (state = {}, action) => {
  switch (action.type) {
    case WAREHOUSE_STOCK_RESERVE_REQUEST:
      return { loading: true };
    case WAREHOUSE_STOCK_RESERVE_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case WAREHOUSE_STOCK_RESERVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ STOCK MOVEMENT REDUCERS ============

export const stockMovementListReducer = (
  state = { movements: [], count: 0, next: null, previous: null },
  action
) => {
  switch (action.type) {
    case STOCK_MOVEMENT_LIST_REQUEST:
      return { loading: true, movements: [], count: 0 };
    case STOCK_MOVEMENT_LIST_SUCCESS:
      return {
        loading: false,
        movements: action.payload.results || action.payload,
        count: action.payload.count || 0,
        next: action.payload.next || null,
        previous: action.payload.previous || null,
      };
    case STOCK_MOVEMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockMovementDetailsReducer = (state = { movement: {} }, action) => {
  switch (action.type) {
    case STOCK_MOVEMENT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case STOCK_MOVEMENT_DETAILS_SUCCESS:
      return { loading: false, movement: action.payload };
    case STOCK_MOVEMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockMovementCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_MOVEMENT_CREATE_REQUEST:
      return { loading: true };
    case STOCK_MOVEMENT_CREATE_SUCCESS:
      return { loading: false, success: true, movement: action.payload };
    case STOCK_MOVEMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockMovementSummaryReducer = (state = { summary: {} }, action) => {
  switch (action.type) {
    case STOCK_MOVEMENT_SUMMARY_REQUEST:
      return { loading: true, summary: {} };
    case STOCK_MOVEMENT_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case STOCK_MOVEMENT_SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockMovementExportReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_MOVEMENT_EXPORT_REQUEST:
      return { loading: true };
    case STOCK_MOVEMENT_EXPORT_SUCCESS:
      return { loading: false, success: true };
    case STOCK_MOVEMENT_EXPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ INVENTORY TRANSFER REDUCERS ============

export const inventoryTransferListReducer = (
  state = { transfers: [], count: 0, next: null, previous: null },
  action
) => {
  switch (action.type) {
    case INVENTORY_TRANSFER_LIST_REQUEST:
      return { loading: true, transfers: [], count: 0 };
    case INVENTORY_TRANSFER_LIST_SUCCESS:
      return {
        loading: false,
        transfers: action.payload.results || action.payload,
        count: action.payload.count || 0,
        next: action.payload.next || null,
        previous: action.payload.previous || null,
      };
    case INVENTORY_TRANSFER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryTransferDetailsReducer = (state = { transfer: {} }, action) => {
  switch (action.type) {
    case INVENTORY_TRANSFER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case INVENTORY_TRANSFER_DETAILS_SUCCESS:
      return { loading: false, transfer: action.payload };
    case INVENTORY_TRANSFER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryTransferCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_TRANSFER_CREATE_REQUEST:
      return { loading: true };
    case INVENTORY_TRANSFER_CREATE_SUCCESS:
      return { loading: false, success: true, transfer: action.payload };
    case INVENTORY_TRANSFER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryTransferApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_TRANSFER_APPROVE_REQUEST:
      return { loading: true };
    case INVENTORY_TRANSFER_APPROVE_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case INVENTORY_TRANSFER_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryTransferShipReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_TRANSFER_SHIP_REQUEST:
      return { loading: true };
    case INVENTORY_TRANSFER_SHIP_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case INVENTORY_TRANSFER_SHIP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryTransferReceiveReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_TRANSFER_RECEIVE_REQUEST:
      return { loading: true };
    case INVENTORY_TRANSFER_RECEIVE_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case INVENTORY_TRANSFER_RECEIVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryTransferCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_TRANSFER_CANCEL_REQUEST:
      return { loading: true };
    case INVENTORY_TRANSFER_CANCEL_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case INVENTORY_TRANSFER_CANCEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ STOCK ALERT REDUCERS ============

export const stockAlertListReducer = (state = { alerts: [] }, action) => {
  switch (action.type) {
    case STOCK_ALERT_LIST_REQUEST:
      return { loading: true, alerts: [] };
    case STOCK_ALERT_LIST_SUCCESS:
      return { loading: false, alerts: action.payload };
    case STOCK_ALERT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockAlertDetailsReducer = (state = { alert: {} }, action) => {
  switch (action.type) {
    case STOCK_ALERT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case STOCK_ALERT_DETAILS_SUCCESS:
      return { loading: false, alert: action.payload };
    case STOCK_ALERT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockAlertResolveReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_ALERT_RESOLVE_REQUEST:
      return { loading: true };
    case STOCK_ALERT_RESOLVE_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case STOCK_ALERT_RESOLVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockAlertUnresolvedReducer = (state = { alerts: [] }, action) => {
  switch (action.type) {
    case STOCK_ALERT_UNRESOLVED_REQUEST:
      return { loading: true, alerts: [] };
    case STOCK_ALERT_UNRESOLVED_SUCCESS:
      return { loading: false, alerts: action.payload };
    case STOCK_ALERT_UNRESOLVED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockAlertCriticalReducer = (state = { alerts: [] }, action) => {
  switch (action.type) {
    case STOCK_ALERT_CRITICAL_REQUEST:
      return { loading: true, alerts: [] };
    case STOCK_ALERT_CRITICAL_SUCCESS:
      return { loading: false, alerts: action.payload };
    case STOCK_ALERT_CRITICAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ STOCK COUNT REDUCERS ============

export const stockCountListReducer = (state = { counts: [] }, action) => {
  switch (action.type) {
    case STOCK_COUNT_LIST_REQUEST:
      return { loading: true, counts: [] };
    case STOCK_COUNT_LIST_SUCCESS:
      return { loading: false, counts: action.payload };
    case STOCK_COUNT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockCountDetailsReducer = (state = { count: {} }, action) => {
  switch (action.type) {
    case STOCK_COUNT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case STOCK_COUNT_DETAILS_SUCCESS:
      return { loading: false, count: action.payload };
    case STOCK_COUNT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockCountCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_COUNT_CREATE_REQUEST:
      return { loading: true };
    case STOCK_COUNT_CREATE_SUCCESS:
      return { loading: false, success: true, count: action.payload };
    case STOCK_COUNT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockCountStartReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_COUNT_START_REQUEST:
      return { loading: true };
    case STOCK_COUNT_START_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case STOCK_COUNT_START_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockCountRecordReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_COUNT_RECORD_REQUEST:
      return { loading: true };
    case STOCK_COUNT_RECORD_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case STOCK_COUNT_RECORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockCountCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_COUNT_COMPLETE_REQUEST:
      return { loading: true };
    case STOCK_COUNT_COMPLETE_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case STOCK_COUNT_COMPLETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ ANALYTICS REDUCER ============

export const inventoryAnalyticsReducer = (state = { analytics: {} }, action) => {
  switch (action.type) {
    case INVENTORY_ANALYTICS_REQUEST:
      return { loading: true, analytics: {} };
    case INVENTORY_ANALYTICS_SUCCESS:
      return { loading: false, analytics: action.payload };
    case INVENTORY_ANALYTICS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ BULK OPERATIONS REDUCER ============

export const bulkInventoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BULK_INVENTORY_UPDATE_REQUEST:
      return { loading: true };
    case BULK_INVENTORY_UPDATE_SUCCESS:
      return { loading: false, success: true, results: action.payload };
    case BULK_INVENTORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ FILTER REDUCER ============

const initialFilterState = {
  warehouse: '',
  product: '',
  is_active: '',
  search: '',
  ordering: '-created_at',
};

export const inventoryFilterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case SET_INVENTORY_FILTERS:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_INVENTORY_FILTERS:
      return initialFilterState;
    case SET_INVENTORY_SORT:
      return {
        ...state,
        ordering: action.payload,
      };
    default:
      return state;
  }
};