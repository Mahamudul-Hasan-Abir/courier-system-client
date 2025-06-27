"use client";

import { useState } from "react";
import RoleProtectedRoute from "@/app/Utils/RoleProtectedRoute";
import {
  useGetMyParcelsQuery,
  useUpdateParcelStatusMutation,
  useGetOptimizedRouteQuery,
} from "@/redux/api/agentApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  MapPin,
  Calendar,
  DollarSign,
  Truck,
  Route,
  CheckCircle,
  Clock,
  AlertTriangle,
  Navigation,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const AgentDashboard = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState("");

  const {
    data: parcelsResponse,
    isLoading,
    error,
    refetch,
  } = useGetMyParcelsQuery();
  const { data: routeResponse, isLoading: routeLoading } =
    useGetOptimizedRouteQuery();
  const [updateStatus, { isLoading: updating }] =
    useUpdateParcelStatusMutation();

  const parcels = parcelsResponse?.data || [];
  const routeData = routeResponse?.data;

  // Filter parcels based on status
  const filteredParcels = parcels.filter((parcel) => {
    return statusFilter === "all" || parcel.status === statusFilter;
  });

  // Calculate statistics
  const totalParcels = parcels.length;
  const bookedParcels = parcels.filter((p) => p.status === "Booked").length;
  const inTransitParcels = parcels.filter(
    (p) => p.status === "In Transit"
  ).length;
  const deliveredParcels = parcels.filter(
    (p) => p.status === "Deliverd"
  ).length;

  const handleStatusUpdate = async () => {
    if (!selectedParcelId || !newStatus) {
      toast.error("Please select a parcel and status");
      return;
    }

    try {
      // Get current location (you might want to get this from GPS)
      const location = {
        lat: 23.8103, // Default location - in real app, get from GPS
        lng: 90.4125,
      };

      await updateStatus({
        parcelId: selectedParcelId,
        status: newStatus,
        location,
      }).unwrap();

      toast.success("Status updated successfully!");
      setSelectedParcelId(null);
      setNewStatus("");
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-blue-100 text-blue-800";
      case "In Transit":
        return "bg-yellow-100 text-yellow-800";
      case "Deliverd":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getParcelTypeColor = (type: string) => {
    switch (type) {
      case "Electronics":
        return "bg-purple-100 text-purple-800";
      case "Clothing":
        return "bg-pink-100 text-pink-800";
      case "Document":
        return "bg-blue-100 text-blue-800";
      case "Fragile":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Booked":
        return <Clock className="h-4 w-4" />;
      case "In Transit":
        return <Truck className="h-4 w-4" />;
      case "Deliverd":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <RoleProtectedRoute allowedRoles={["agent"]}>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RoleProtectedRoute>
    );
  }

  if (error) {
    return (
      <RoleProtectedRoute allowedRoles={["agent"]}>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-12">
              <div className="text-red-500 text-xl mb-4">
                Error loading parcels
              </div>
              <Button onClick={() => refetch()}>Try Again</Button>
            </div>
          </div>
        </div>
      </RoleProtectedRoute>
    );
  }

  return (
    <RoleProtectedRoute allowedRoles={["agent"]}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Agent Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage your assigned parcels and delivery routes
                </p>
              </div>
              <Button onClick={() => refetch()} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Assigned
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalParcels}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Booked</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {bookedParcels}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Truck className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      In Transit
                    </p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {inTransitParcels}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Delivered
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {deliveredParcels}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Route Optimization */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Route className="h-5 w-5 mr-2" />
                Optimized Route
              </CardTitle>
            </CardHeader>
            <CardContent>
              {routeLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ) : routeData ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Total Parcels:
                    </span>
                    <span className="font-semibold">
                      {routeData.totalParcels}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Active Parcels:
                    </span>
                    <span className="font-semibold text-blue-600">
                      {routeData.activeParcels}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Route Optimized:
                    </span>
                    <Badge
                      className={
                        routeData.optimized
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {routeData.optimized ? "Yes" : "No"}
                    </Badge>
                  </div>
                  {routeData.googleResponse.status === "REQUEST_DENIED" && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="text-sm text-yellow-800">
                          Google Maps API not configured. Route optimization
                          unavailable.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">No route data available</p>
              )}
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Booked">Booked</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Deliverd">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Status Update Modal */}
          {selectedParcelId && (
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Update Parcel Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="Deliverd">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleStatusUpdate}
                      disabled={!newStatus || updating}
                      size="sm"
                    >
                      {updating ? "Updating..." : "Update Status"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedParcelId(null);
                        setNewStatus("");
                      }}
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Parcels List */}
          <div className="space-y-4">
            {filteredParcels.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No parcels found
                  </h3>
                  <p className="text-gray-600">
                    You don&apos;t have any assigned parcels yet
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredParcels.map((parcel) => (
                <Card
                  key={parcel._id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              Parcel #{parcel._id.slice(-8)}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Customer ID: {parcel.customer}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                            <Badge className={getStatusColor(parcel.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(parcel.status)}
                                <span>{parcel.status}</span>
                              </div>
                            </Badge>
                            <Badge
                              className={getParcelTypeColor(parcel.parcelType)}
                            >
                              {parcel.parcelType}
                            </Badge>
                            <Badge variant="outline">{parcel.parcelSize}</Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Pickup
                              </p>
                              <p className="text-sm text-gray-600">
                                {parcel.pickupAddress}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Delivery
                              </p>
                              <p className="text-sm text-gray-600">
                                {parcel.deliveryAddress}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>COD: ${parcel.codAmount}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(
                                  parcel.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 lg:ml-4">
                        {parcel.status === "Booked" && (
                          <Button
                            onClick={() => setSelectedParcelId(parcel._id)}
                            size="sm"
                          >
                            <Truck className="h-4 w-4 mr-2" />
                            Start Delivery
                          </Button>
                        )}
                        {parcel.status === "In Transit" && (
                          <Button
                            onClick={() => setSelectedParcelId(parcel._id)}
                            size="sm"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Delivered
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Navigation className="h-4 w-4 mr-2" />
                          Navigate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </RoleProtectedRoute>
  );
};

export default AgentDashboard;
