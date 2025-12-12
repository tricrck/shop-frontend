import {
  MPESA_CONFIG_LIST_REQUEST,
  MPESA_CONFIG_LIST_SUCCESS,
  MPESA_CONFIG_LIST_FAIL,
  MPESA_CONFIG_DETAILS_REQUEST,
  MPESA_CONFIG_DETAILS_SUCCESS,
  MPESA_CONFIG_DETAILS_FAIL,
  MPESA_CONFIG_SET_DEFAULT_REQUEST,
  MPESA_CONFIG_SET_DEFAULT_SUCCESS,
  MPESA_CONFIG_SET_DEFAULT_FAIL,
  MPESA_CONFIG_TEST_REQUEST,
  MPESA_CONFIG_TEST_SUCCESS,
  MPESA_CONFIG_TEST_FAIL,
  MPESA_TRANSACTION_LIST_REQUEST,
  MPESA_TRANSACTION_LIST_SUCCESS,
  MPESA_TRANSACTION_LIST_FAIL,
  MPESA_TRANSACTION_LIST_RESET,
  MPESA_TRANSACTION_DETAILS_REQUEST,
  MPESA_TRANSACTION_DETAILS_SUCCESS,
  MPESA_TRANSACTION_DETAILS_FAIL,
  MPESA_TRANSACTION_DETAILS_RESET,
  MY_MPESA_TRANSACTIONS_REQUEST,
  MY_MPESA_TRANSACTIONS_SUCCESS,
  MY_MPESA_TRANSACTIONS_FAIL,
  MPESA_TRANSACTION_RETRY_REQUEST,
  MPESA_TRANSACTION_RETRY_SUCCESS,
  MPESA_TRANSACTION_RETRY_FAIL,
  MPESA_TRANSACTION_STATS_REQUEST,
  MPESA_TRANSACTION_STATS_SUCCESS,
  MPESA_TRANSACTION_STATS_FAIL,
  MPESA_PAYMENT_INITIATE_REQUEST,
  MPESA_PAYMENT_INITIATE_SUCCESS,
  MPESA_PAYMENT_INITIATE_FAIL,
  MPESA_PAYMENT_INITIATE_RESET,
  MPESA_PAYMENT_STATUS_REQUEST,
  MPESA_PAYMENT_STATUS_SUCCESS,
  MPESA_PAYMENT_STATUS_FAIL,
  MPESA_PAYMENT_STATUS_RESET,
  MPESA_REFUND_LIST_REQUEST,
  MPESA_REFUND_LIST_SUCCESS,
  MPESA_REFUND_LIST_FAIL,
  MPESA_REFUND_DETAILS_REQUEST,
  MPESA_REFUND_DETAILS_SUCCESS,
  MPESA_REFUND_DETAILS_FAIL,
  MPESA_REFUND_PROCESS_REQUEST,
  MPESA_REFUND_PROCESS_SUCCESS,
  MPESA_REFUND_PROCESS_FAIL,
  MPESA_PAYMENT_METHOD_LIST_REQUEST,
  MPESA_PAYMENT_METHOD_LIST_SUCCESS,
  MPESA_PAYMENT_METHOD_LIST_FAIL,
  MPESA_PAYMENT_METHOD_CREATE_REQUEST,
  MPESA_PAYMENT_METHOD_CREATE_SUCCESS,
  MPESA_PAYMENT_METHOD_CREATE_FAIL,
  MPESA_PAYMENT_METHOD_DELETE_REQUEST,
  MPESA_PAYMENT_METHOD_DELETE_SUCCESS,
  MPESA_PAYMENT_METHOD_DELETE_FAIL,
  MPESA_PAYMENT_METHOD_SET_DEFAULT_REQUEST,
  MPESA_PAYMENT_METHOD_SET_DEFAULT_SUCCESS,
  MPESA_PAYMENT_METHOD_SET_DEFAULT_FAIL,
  SET_MPESA_FILTERS,
  CLEAR_MPESA_FILTERS,
  SET_MPESA_SORT,
} from '../constants/paymentConstants';

// ============ M-PESA CONFIGURATION REDUCERS ============

export const mpesaConfigListReducer = (state = { configurations: [] }, action) => {
  switch (action.type) {
    case MPESA_CONFIG_LIST_REQUEST:
      return { loading: true, configurations: [] };
    case MPESA_CONFIG_LIST_SUCCESS:
      return { loading: false, configurations: action.payload };
    case MPESA_CONFIG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mpesaConfigDetailsReducer = (state = { configuration: {} }, action) => {
  switch (action.type) {
    case MPESA_CONFIG_DETAILS_REQUEST:
      return { loading: true, ...state };
    case MPESA_CONFIG_DETAILS_SUCCESS:
      return { loading: false, configuration: action.payload };
    case MPESA_CONFIG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mpesaConfigSetDefaultReducer = (state = {}, action) => {
  switch (action.type) {
    case MPESA_CONFIG_SET_DEFAULT_REQUEST:
      return { loading: true };
    case MPESA_CONFIG_SET_DEFAULT_SUCCESS:
      return { loading: false, success: true, configuration: action.payload };
    case MPESA_CONFIG_SET_DEFAULT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mpesaConfigTestReducer = (state = {}, action) => {
  switch (action.type) {
    case MPESA_CONFIG_TEST_REQUEST:
      return { loading: true };
    case MPESA_CONFIG_TEST_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case MPESA_CONFIG_TEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ M-PESA TRANSACTION REDUCERS ============

export const mpesaTransactionListReducer = (
  state = { transactions: [], count: 0, next: null, previous: null },
  action
) => {
  switch (action.type) {
    case MPESA_TRANSACTION_LIST_REQUEST:
      return { loading: true, transactions: [], count: 0 };
    case MPESA_TRANSACTION_LIST_SUCCESS:
      return {
        loading: false,
        transactions: action.payload.results || action.payload,
        count: action.payload.count || 0,
        next: action.payload.next || null,
        previous: action.payload.previous || null,
      };
    case MPESA_TRANSACTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MPESA_TRANSACTION_LIST_RESET:
      return { transactions: [], count: 0, next: null, previous: null };
    default:
      return state;
  }
};

export const mpesaTransactionDetailsReducer = (state = { transaction: {} }, action) => {
  switch (action.type) {
    case MPESA_TRANSACTION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case MPESA_TRANSACTION_DETAILS_SUCCESS:
      return { loading: false, transaction: action.payload };
    case MPESA_TRANSACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case MPESA_TRANSACTION_DETAILS_RESET:
      return { transaction: {} };
    default:
      return state;
  }
};

export const myMpesaTransactionsReducer = (
  state = { transactions: [], count: 0 },
  action
) => {
  switch (action.type) {
    case MY_MPESA_TRANSACTIONS_REQUEST:
      return { loading: true, transactions: [] };
    case MY_MPESA_TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        transactions: action.payload.results || action.payload,
        count: action.payload.count || 0,
        next: action.payload.next || null,
        previous: action.payload.previous || null,
      };
    case MY_MPESA_TRANSACTIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mpesaTransactionRetryReducer = (state = {}, action) => {
  switch (action.type) {
    case MPESA_TRANSACTION_RETRY_REQUEST:
      return { loading: true };
    case MPESA_TRANSACTION_RETRY_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case MPESA_TRANSACTION_RETRY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mpesaTransactionStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case MPESA_TRANSACTION_STATS_REQUEST:
      return { loading: true, stats: {} };
    case MPESA_TRANSACTION_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case MPESA_TRANSACTION_STATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ PAYMENT INITIATION REDUCERS ============

export const mpesaPaymentInitiateReducer = (state = {}, action) => {
  switch (action.type) {
    case MPESA_PAYMENT_INITIATE_REQUEST:
      return { loading: true };
    case MPESA_PAYMENT_INITIATE_SUCCESS:
      return { loading: false, success: true, paymentInfo: action.payload };
    case MPESA_PAYMENT_INITIATE_FAIL:
      return { loading: false, error: action.payload };
    case MPESA_PAYMENT_INITIATE_RESET:
      return {};
    default:
      return state;
  }
};

export const mpesaPaymentStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case MPESA_PAYMENT_STATUS_REQUEST:
      return { loading: true };
    case MPESA_PAYMENT_STATUS_SUCCESS:
      return { loading: false, success: true, statusInfo: action.payload };
    case MPESA_PAYMENT_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case MPESA_PAYMENT_STATUS_RESET:
      return {};
    default:
      return state;
  }
};

// ============ M-PESA REFUND REDUCERS ============

export const mpesaRefundListReducer = (
  state = { refunds: [], count: 0 },
  action
) => {
  switch (action.type) {
    case MPESA_REFUND_LIST_REQUEST:
      return { loading: true, refunds: [] };
    case MPESA_REFUND_LIST_SUCCESS:
      return {
        loading: false,
        refunds: action.payload.results || action.payload,
        count: action.payload.count || 0,
        next: action.payload.next || null,
        previous: action.payload.previous || null,
      };
    case MPESA_REFUND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mpesaRefundDetailsReducer = (state = { refund: {} }, action) => {
  switch (action.type) {
    case MPESA_REFUND_DETAILS_REQUEST:
      return { loading: true, ...state };
    case MPESA_REFUND_DETAILS_SUCCESS:
      return { loading: false, refund: action.payload };
    case MPESA_REFUND_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mpesaRefundProcessReducer = (state = {}, action) => {
  switch (action.type) {
    case MPESA_REFUND_PROCESS_REQUEST:
      return { loading: true };
    case MPESA_REFUND_PROCESS_SUCCESS:
      return { loading: false, success: true, refund: action.payload };
    case MPESA_REFUND_PROCESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ PAYMENT METHOD REDUCERS ============

export const mpesaPaymentMethodListReducer = (
  state = { paymentMethods: [] },
  action
) => {
  switch (action.type) {
    case MPESA_PAYMENT_METHOD_LIST_REQUEST:
      return { loading: true, paymentMethods: [] };
    case MPESA_PAYMENT_METHOD_LIST_SUCCESS:
      return { loading: false, paymentMethods: action.payload };
    case MPESA_PAYMENT_METHOD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mpesaPaymentMethodCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MPESA_PAYMENT_METHOD_CREATE_REQUEST:
      return { loading: true };
    case MPESA_PAYMENT_METHOD_CREATE_SUCCESS:
      return { loading: false, success: true, paymentMethod: action.payload };
    case MPESA_PAYMENT_METHOD_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mpesaPaymentMethodDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MPESA_PAYMENT_METHOD_DELETE_REQUEST:
      return { loading: true };
    case MPESA_PAYMENT_METHOD_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MPESA_PAYMENT_METHOD_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mpesaPaymentMethodSetDefaultReducer = (state = {}, action) => {
  switch (action.type) {
    case MPESA_PAYMENT_METHOD_SET_DEFAULT_REQUEST:
      return { loading: true };
    case MPESA_PAYMENT_METHOD_SET_DEFAULT_SUCCESS:
      return { loading: false, success: true, paymentMethod: action.payload };
    case MPESA_PAYMENT_METHOD_SET_DEFAULT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ============ FILTER REDUCER ============

const initialFilterState = {
  status: '',
  transaction_type: '',
  amount_min: '',
  amount_max: '',
  phone_number: '',
  date_from: '',
  date_to: '',
  is_successful: '',
  ordering: '-initiated_at',
};

export const mpesaFilterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case SET_MPESA_FILTERS:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_MPESA_FILTERS:
      return initialFilterState;
    case SET_MPESA_SORT:
      return {
        ...state,
        ordering: action.payload,
      };
    default:
      return state;
  }
};