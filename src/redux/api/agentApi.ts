import { baseApi } from "./api";

// Types for the API responses
export interface AgentParcel {
  _id: string;
  customer: string;
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: string;
  parcelSize: string;
  codAmount: number;
  isPrepaid: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  assignedAgent: string;
}

export interface AgentParcelsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: AgentParcel[];
}

export interface UpdateStatusRequest {
  status: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface UpdateStatusResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: AgentParcel;
}

export interface OptimizedRouteResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    optimized: boolean;
    googleResponse: {
      error_message?: string;
      routes: unknown[];
      status: string;
    };
    totalParcels: number;
    activeParcels: number;
  };
}

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyParcels: builder.query<AgentParcelsResponse, void>({
      query: () => ({
        url: "/parcel/agent/my-parcels",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    updateParcelStatus: builder.mutation<
      UpdateStatusResponse,
      {
        parcelId: string;
        status: string;
        location: { lat: number; lng: number };
      }
    >({
      query: ({ parcelId, status, location }) => ({
        url: `/parcel/status/${parcelId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { status, location },
      }),
    }),
    getOptimizedRoute: builder.query<OptimizedRouteResponse, void>({
      query: () => ({
        url: "/route-optimization/my-optimized-route",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMyParcelsQuery,
  useUpdateParcelStatusMutation,
  useGetOptimizedRouteQuery,
} = agentApi;
