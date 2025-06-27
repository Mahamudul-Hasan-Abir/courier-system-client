"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  MapPin,
  User,
  Clock,
  Truck,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Navigation,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Customer {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Agent {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Parcel {
  _id: string;
  customer: Customer;
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: string;
  parcelSize: string;
  codAmount: number;
  isPrepaid: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  assignedAgent?: Agent;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

const TrackParcel = () => {
  const params = useParams();
  const parcelId = params.id as string;
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (parcelId) {
      fetchParcel();
    } else {
      setError("No parcel ID provided");
      setIsLoading(false);
    }
  }, [parcelId]);

  const fetchParcel = async () => {
    try {
      const response = await fetch(
        `https://courier-system-server.vercel.app/api/v1/parcel/${parcelId}`
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setParcel(data.data);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch parcel details");
        toast.error(data.message || "Failed to fetch parcel details");
      }
    } catch (error) {
      console.error("Error fetching parcel:", error);
      setError("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        return <CheckCircle className="w-5 h-5" />;
      case "in transit":
        return <Truck className="w-5 h-5" />;
      case "booked":
        return <Package className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
          <p className="text-gray-600">Loading parcel details...</p>
        </div>
      </div>
    );
  }

  if (error || !parcel) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
          <p className="text-gray-600 mb-4">{error || "Parcel not found"}</p>
          <Link href="/dashboard/customer">
            <Button className="bg-[#f39f39] hover:bg-orange-600">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
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
          <h1 className="text-3xl font-bold text-gray-900">Track Parcel</h1>
        </div>
        <p className="text-gray-600">Order #{parcel._id.slice(-6)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-[#f39f39]" />
                <span>Delivery Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`flex items-center space-x-3 p-4 rounded-lg border ${getStatusColor(
                  parcel.status
                )}`}
              >
                {getStatusIcon(parcel.status)}
                <div>
                  <p className="font-semibold text-lg">
                    {formatStatus(parcel.status)}
                  </p>
                  <p className="text-sm opacity-75">
                    {parcel.status.toLowerCase() === "booked" &&
                      "Your parcel has been booked and is awaiting pickup"}
                    {parcel.status.toLowerCase() === "in transit" &&
                      "Your parcel is on its way to the destination"}
                    {parcel.status.toLowerCase() === "delivered" &&
                      "Your parcel has been successfully delivered"}
                    {parcel.status.toLowerCase() === "deliverd" &&
                      "Your parcel has been successfully delivered"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parcel Details */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-[#f39f39]" />
                <span>Parcel Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 text-[#f39f39] mr-2" />
                    Addresses
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Pickup Address
                      </p>
                      <p className="text-gray-900">{parcel.pickupAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Delivery Address
                      </p>
                      <p className="text-gray-900">{parcel.deliveryAddress}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Parcel Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{parcel.parcelType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{parcel.parcelSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment:</span>
                      <span className="font-medium">
                        {parcel.isPrepaid
                          ? "Prepaid"
                          : `৳${parcel.codAmount} (COD)`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[#f39f39]" />
                <span>Delivery Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-[#f39f39] rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Order Created</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(parcel.createdAt)}
                    </p>
                  </div>
                </div>
                {parcel.assignedAgent && (
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Assigned to Agent
                      </p>
                      <p className="text-sm text-gray-600">
                        {parcel.assignedAgent.name}
                      </p>
                    </div>
                  </div>
                )}
                {parcel.status.toLowerCase() === "in transit" && (
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">In Transit</p>
                      <p className="text-sm text-gray-600">
                        Parcel is on its way
                      </p>
                    </div>
                  </div>
                )}
                {(parcel.status.toLowerCase() === "delivered" ||
                  parcel.status.toLowerCase() === "deliverd") && (
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Delivered</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(parcel.updatedAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-[#f39f39]" />
                <span>Customer Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">Name</p>
                <p className="text-gray-900">{parcel.customer.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-900">{parcel.customer.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Agent Info */}
          {parcel.assignedAgent && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-[#f39f39]" />
                  <span>Assigned Agent</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-gray-900">{parcel.assignedAgent.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-900">{parcel.assignedAgent.email}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-[#f39f39] hover:bg-orange-600"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Map Placeholder */}
          {parcel.currentLocation ? (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-[#f39f39]" />
                  <span>Current Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-[#f39f39] mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Google Maps Integration
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Lat: {parcel.currentLocation.lat}, Lng:{" "}
                      {parcel.currentLocation.lng}
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-3 bg-[#f39f39] hover:bg-orange-600">
                  <Navigation className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-[#f39f39]" />
                  <span>Location Tracking</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Location not available
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Will be updated when assigned to agent
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackParcel;
