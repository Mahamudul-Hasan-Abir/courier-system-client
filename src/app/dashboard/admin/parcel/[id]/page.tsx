"use client";

import { useParams, useRouter } from "next/navigation";
import RoleProtectedRoute from "@/app/Utils/RoleProtectedRoute";
import { useGetParcelByIdQuery } from "@/redux/api/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Package,
  MapPin,
  User,
  Calendar,
  Truck,
  Mail,
} from "lucide-react";
import Link from "next/link";

const ParcelDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const parcelId = params.id as string;

  const {
    data: parcelResponse,
    isLoading,
    error,
  } = useGetParcelByIdQuery(parcelId);
  const parcel = parcelResponse?.data;

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

  if (isLoading) {
    return (
      <RoleProtectedRoute allowedRoles={["admin"]}>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RoleProtectedRoute>
    );
  }

  if (error || !parcel) {
    return (
      <RoleProtectedRoute allowedRoles={["admin"]}>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="text-red-500 text-xl mb-4">
                Error loading parcel details
              </div>
              <Button onClick={() => router.back()}>Go Back</Button>
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
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Parcel Details
                </h1>
                <p className="text-gray-600">Parcel ID: {parcel._id}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(parcel.status)}>
                  {parcel.status}
                </Badge>
                <Badge className={getParcelTypeColor(parcel.parcelType)}>
                  {parcel.parcelType}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Parcel Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Parcel Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Parcel Type
                      </label>
                      <p className="text-gray-900">{parcel.parcelType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Parcel Size
                      </label>
                      <p className="text-gray-900">{parcel.parcelSize}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Payment Type
                      </label>
                      <p className="text-gray-900">
                        {parcel.isPrepaid ? "Prepaid" : "Cash on Delivery"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        COD Amount
                      </label>
                      <p className="text-gray-900">${parcel.codAmount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Pickup Address
                    </label>
                    <p className="text-gray-900 mt-1">{parcel.pickupAddress}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Delivery Address
                    </label>
                    <p className="text-gray-900 mt-1">
                      {parcel.deliveryAddress}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Order Created
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(parcel.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {parcel.assignedAgent && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Agent Assigned
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(parcel.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Last Updated
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(parcel.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Name
                    </label>
                    <p className="text-gray-900">{parcel.customer.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {parcel.customer.email}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Agent Information */}
              {parcel.assignedAgent ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Assigned Agent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Name
                      </label>
                      <p className="text-gray-900">
                        {parcel.assignedAgent.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Email
                      </label>
                      <p className="text-gray-900 flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {parcel.assignedAgent.email}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Agent Assignment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">No agent assigned yet</p>
                    <Link href={`/dashboard/admin/assign-agent/${parcel._id}`}>
                      <Button className="w-full">Assign Agent</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {!parcel.assignedAgent && (
                    <Link href={`/dashboard/admin/assign-agent/${parcel._id}`}>
                      <Button className="w-full">Assign Agent</Button>
                    </Link>
                  )}
                  <Button variant="outline" className="w-full">
                    Update Status
                  </Button>
                  <Button variant="outline" className="w-full">
                    View on Map
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </RoleProtectedRoute>
  );
};

export default ParcelDetailsPage;
