"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Parcel {
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
  currentLocation?: {
    lat: number;
    lng: number;
  };
  assignedAgent?: string;
}

const AllOrders = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [filteredParcels, setFilteredParcels] = useState<Parcel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchParcels();
  }, [token]);

  useEffect(() => {
    filterAndSortParcels();
  }, [parcels, searchTerm, statusFilter, typeFilter, sortBy]);

  const fetchParcels = async () => {
    if (!token) {
      setError("No authorization token found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5300/api/v1/parcel/my", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setParcels(data.data);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch parcels");
        toast.error(data.message || "Failed to fetch parcels");
      }
    } catch (error) {
      console.error("Error fetching parcels:", error);
      setError("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortParcels = () => {
    let filtered = [...parcels];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (parcel) =>
          parcel._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parcel.pickupAddress
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          parcel.deliveryAddress
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          parcel.parcelType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (parcel) => parcel.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(
        (parcel) => parcel.parcelType.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "status":
          return a.status.localeCompare(b.status);
        case "amount":
          return b.codAmount - a.codAmount;
        default:
          return 0;
      }
    });

    setFilteredParcels(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "deliverd":
        return "text-green-600 bg-green-50 border-green-200";
      case "in transit":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "booked":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "deliverd":
        return <CheckCircle className="w-4 h-4" />;
      case "in transit":
        return <Truck className="w-4 h-4" />;
      case "booked":
        return <Package className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const getUniqueParcelTypes = () => {
    const types = [...new Set(parcels.map((parcel) => parcel.parcelType))];
    return types.sort();
  };

  const getUniqueStatuses = () => {
    const statuses = [...new Set(parcels.map((parcel) => parcel.status))];
    return statuses.sort();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#f39f39]" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={fetchParcels}
            className="bg-[#f39f39] hover:bg-orange-600"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/customer"
          className="inline-flex items-center text-[#f39f39] hover:text-orange-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-[#f39f39] rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
        </div>
        <p className="text-gray-600">
          Manage and track all your parcel orders ({parcels.length} total)
        </p>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-[#f39f39]" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {getUniqueStatuses().map((status) => (
                  <SelectItem key={status} value={status.toLowerCase()}>
                    {formatStatus(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {getUniqueParcelTypes().map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="status">By Status</SelectItem>
                <SelectItem value="amount">By Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredParcels.length} of {parcels.length} orders
        </p>
      </div>

      {/* Orders Grid */}
      {filteredParcels.length === 0 ? (
        <Card className="shadow-lg">
          <CardContent className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600 mb-4">
              {parcels.length === 0
                ? "You haven't created any orders yet."
                : "Try adjusting your search or filters."}
            </p>
            {parcels.length === 0 && (
              <Link href="/dashboard/customer/create-order">
                <Button className="bg-[#f39f39] hover:bg-orange-600">
                  Create Your First Order
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredParcels.map((parcel) => (
            <Card
              key={parcel._id}
              className="shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#f39f39] rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Order #{parcel._id.slice(-6)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(parcel.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                      parcel.status
                    )}`}
                  >
                    {getStatusIcon(parcel.status)}
                    <span>{formatStatus(parcel.status)}</span>
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Addresses */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-[#f39f39] mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600">From</p>
                      <p className="text-sm text-gray-900 truncate">
                        {parcel.pickupAddress}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-[#f39f39] mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600">To</p>
                      <p className="text-sm text-gray-900 truncate">
                        {parcel.deliveryAddress}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Parcel Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-medium">{parcel.parcelType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Size</p>
                    <p className="font-medium">{parcel.parcelSize}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment</p>
                    <p className="font-medium">
                      {parcel.isPrepaid ? "Prepaid" : `৳${parcel.codAmount}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Agent</p>
                    <p className="font-medium">
                      {parcel.assignedAgent ? "Assigned" : "Pending"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2 border-t">
                  <Link
                    href={`/dashboard/customer/track-parcel/${parcel._id}`}
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-[#f39f39] hover:bg-orange-600"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Track
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
