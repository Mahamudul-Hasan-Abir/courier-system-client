"use client";

import { useState } from "react";
import RoleProtectedRoute from "@/app/Utils/RoleProtectedRoute";
import {
  useGetAllParcelsQuery,
  useGetDashboardStatsQuery,
  useExportPDFMutation,
  useExportCSVMutation,
} from "@/redux/api/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Search,
  Package,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  TrendingUp,
  FileText,
  Download,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [parcelTypeFilter, setParcelTypeFilter] = useState("all");

  const {
    data: parcelsResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllParcelsQuery();
  const { data: dashboardStats, isLoading: statsLoading } =
    useGetDashboardStatsQuery();
  const [exportPDF, { isLoading: exportingPDF }] = useExportPDFMutation();
  const [exportCSV, { isLoading: exportingCSV }] = useExportCSVMutation();

  const parcels = parcelsResponse?.data || [];
  const stats = dashboardStats?.data;

  // Filter parcels based on search and filters
  const filteredParcels = parcels.filter((parcel) => {
    const matchesSearch =
      parcel.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.parcelType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || parcel.status === statusFilter;
    const matchesType =
      parcelTypeFilter === "all" || parcel.parcelType === parcelTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate statistics from parcels data
  const totalParcels = parcels.length;
  const bookedParcels = parcels.filter((p) => p.status === "Booked").length;
  const inTransitParcels = parcels.filter(
    (p) => p.status === "In Transit"
  ).length;
  const deliveredParcels = parcels.filter(
    (p) => p.status === "Deliverd"
  ).length;
  const unassignedParcels = parcels.filter((p) => !p.assignedAgent).length;

  const handleExportPDF = async () => {
    try {
      const blob = await exportPDF().unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `parcels-report-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("PDF exported successfully!");
    } catch {
      toast.error("Failed to export PDF");
    }
  };

  const handleExportCSV = async () => {
    try {
      const blob = await exportCSV().unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `parcels-report-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("CSV exported successfully!");
    } catch {
      toast.error("Failed to export CSV");
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

  if (isLoading || statsLoading) {
    return (
      <RoleProtectedRoute allowedRoles={["admin"]}>
        <div className="min-h-screen bg-gray-50 p-6 ">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
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
      <RoleProtectedRoute allowedRoles={["admin"]}>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
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
    <RoleProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage all parcels and assign delivery agents
                </p>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button
                  onClick={handleExportPDF}
                  disabled={exportingPDF}
                  variant="outline"
                  size="sm"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {exportingPDF ? "Exporting..." : "Export PDF"}
                </Button>
                <Button
                  onClick={handleExportCSV}
                  disabled={exportingCSV}
                  variant="outline"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {exportingCSV ? "Exporting..." : "Export CSV"}
                </Button>
              </div>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Parcels
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
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Today&apos;s Bookings
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {stats?.bookings.today || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total COD Amount
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      ${stats?.codAmount || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Failed Deliveries
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {stats?.failedDeliveries || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Booking Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Week</span>
                    <span className="font-semibold text-blue-600">
                      {stats?.bookings.week || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="font-semibold text-green-600">
                      {stats?.bookings.month || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Status Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Booked</span>
                    <span className="font-semibold text-blue-600">
                      {bookedParcels}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">In Transit</span>
                    <span className="font-semibold text-yellow-600">
                      {inTransitParcels}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Delivered</span>
                    <span className="font-semibold text-green-600">
                      {deliveredParcels}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2" />
                  Agent Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Assigned</span>
                    <span className="font-semibold text-green-600">
                      {totalParcels - unassignedParcels}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Unassigned</span>
                    <span className="font-semibold text-red-600">
                      {unassignedParcels}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search parcels..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Booked">Booked</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Deliverd">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={parcelTypeFilter}
                  onValueChange={setParcelTypeFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Document">Document</SelectItem>
                    <SelectItem value="Fragile">Fragile</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => refetch()} variant="outline">
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

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
                    Try adjusting your search or filters
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
                              Customer: {parcel.customer.name} (
                              {parcel.customer.email})
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                            <Badge className={getStatusColor(parcel.status)}>
                              {parcel.status}
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
                          {parcel.assignedAgent && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Agent:</span>{" "}
                              {parcel.assignedAgent.name}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 lg:ml-4">
                        <Link href={`/dashboard/admin/parcel/${parcel._id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                        {!parcel.assignedAgent && (
                          <Link
                            href={`/dashboard/admin/assign-agent/${parcel._id}`}
                          >
                            <Button size="sm">Assign Agent</Button>
                          </Link>
                        )}
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

export default AdminDashboard;
