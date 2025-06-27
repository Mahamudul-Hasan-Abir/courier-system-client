import { baseApi } from "./api";

// Types for the API responses
export interface Parcel {
  _id: string;
  customer: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: string;
  parcelSize: string;
  codAmount: number;
  isPrepaid: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  assignedAgent?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface Agent {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AllParcelsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Parcel[];
}

export interface AllAgentsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Agent[];
}

export interface AssignAgentRequest {
  agentId: string;
}

export interface DashboardStats {
  bookings: {
    today: number;
    week: number;
    month: number;
  };
  codAmount: number;
  failedDeliveries: number;
}

export interface DashboardResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: DashboardStats;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllParcels: builder.query<AllParcelsResponse, void>({
      query: () => ({
        url: "/parcel",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    getParcelById: builder.query<{ data: Parcel }, string>({
      query: (id) => ({
        url: `/parcel/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    getAllAgents: builder.query<AllAgentsResponse, void>({
      query: () => ({
        url: "/admin/get-all-agent",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    assignAgent: builder.mutation<
      { data: Parcel },
      { parcelId: string; agentId: string }
    >({
      query: ({ parcelId, agentId }) => ({
        url: `/parcel/assign/${parcelId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { agentId },
      }),
    }),
    getDashboardStats: builder.query<DashboardResponse, void>({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    exportPDF: builder.mutation<Blob, void>({
      query: () => ({
        url: "/admin/export/pdf",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
    exportCSV: builder.mutation<Blob, void>({
      query: () => ({
        url: "/admin/export/csv",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetAllParcelsQuery,
  useGetParcelByIdQuery,
  useGetAllAgentsQuery,
  useAssignAgentMutation,
  useGetDashboardStatsQuery,
  useExportPDFMutation,
  useExportCSVMutation,
} = adminApi;
