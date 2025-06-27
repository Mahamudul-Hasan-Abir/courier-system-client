"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Package,
  Clock,
  CheckCircle,
  TrendingUp,
  MapPin,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function CustomerDashboardHome() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { token } = useSelector((state: RootState) => state.auth);
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchParcels();
  }, [token]);

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

  // Calculate stats from real data
  const stats = [
    {
      title: "Total Orders",
      value: parcels.length.toString(),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Orders",
      value: parcels
        .filter((p) => p.status === "Booked" || p.status === "In Transit")
        .length.toString(),
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Delivered",
      value: parcels
        .filter((p) => p.status === "Deliverd" || p.status === "Delivered")
        .length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "In Transit",
      value: parcels.filter((p) => p.status === "In Transit").length.toString(),
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "deliverd":
        return "text-green-600 bg-green-50";
      case "in transit":
        return "text-blue-600 bg-blue-50";
      case "booked":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
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
          <button
            onClick={fetchParcels}
            className="bg-[#f39f39] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#f39f39] to-orange-500 rounded-xl p-6 text-white mt-10">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name || "Customer"}! 👋
        </h1>
        <p className="text-orange-100">
          Track your deliveries and manage your orders from your dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-[#f39f39]" />
            <span>Recent Orders</span>
            {parcels.length > 0 && (
              <span className="text-sm text-gray-500">
                ({parcels.length} total)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {parcels.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start by creating your first parcel order
              </p>
              <Link href="/dashboard/customer/create-order">
                <button className="bg-[#f39f39] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  Create Your First Order
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {parcels.slice(0, 5).map((parcel) => (
                <Link
                  key={parcel._id}
                  href={`/dashboard/customer/track-parcel/${parcel._id}`}
                >
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-[#f39f39] rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Order #{parcel._id.slice(-6)}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{parcel.deliveryAddress}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {parcel.parcelType} • {parcel.parcelSize}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {parcel.isPrepaid
                            ? "Prepaid"
                            : `৳${parcel.codAmount}`}
                        </p>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(parcel.createdAt)}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          parcel.status
                        )}`}
                      >
                        {formatStatus(parcel.status)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {parcels.length > 5 && (
            <div className="mt-6 text-center">
              <Link href="/dashboard/customer/orders">
                <button className="text-[#f39f39] hover:text-orange-600 font-medium transition-colors duration-200">
                  View All Orders ({parcels.length}) →
                </button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1  gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-[#f39f39]" />
              <span>Create New Order</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Send packages quickly and easily with our streamlined ordering
              process.
            </p>
            <Link href="/dashboard/customer/create-order">
              <button className="w-full bg-[#f39f39] text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium">
                Create Order
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
