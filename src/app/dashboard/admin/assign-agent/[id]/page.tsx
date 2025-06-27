"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RoleProtectedRoute from "@/app/Utils/RoleProtectedRoute";
import {
  useGetParcelByIdQuery,
  useGetAllAgentsQuery,
  useAssignAgentMutation,
} from "@/redux/api/adminApi";
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
  ArrowLeft,
  Package,
  User,
  Truck,
  Mail,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const AssignAgentPage = () => {
  const params = useParams();
  const router = useRouter();
  const parcelId = params.id as string;

  const [selectedAgentId, setSelectedAgentId] = useState("");

  const { data: parcelResponse, isLoading: parcelLoading } =
    useGetParcelByIdQuery(parcelId);
  const { data: agentsResponse, isLoading: agentsLoading } =
    useGetAllAgentsQuery();
  const [assignAgent, { isLoading: assigning }] = useAssignAgentMutation();

  const parcel = parcelResponse?.data;
  const agents = agentsResponse?.data || [];

  const handleAssignAgent = async () => {
    if (!selectedAgentId) {
      toast.error("Please select an agent");
      return;
    }

    try {
      await assignAgent({ parcelId, agentId: selectedAgentId }).unwrap();
      toast.success("Agent assigned successfully!");
      router.push(`/dashboard/admin/parcel/${parcelId}`);
    } catch {
      toast.error("Failed to assign agent");
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

  if (parcelLoading || agentsLoading) {
    return (
      <RoleProtectedRoute allowedRoles={["admin"]}>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RoleProtectedRoute>
    );
  }

  if (!parcel) {
    return (
      <RoleProtectedRoute allowedRoles={["admin"]}>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="text-red-500 text-xl mb-4">Parcel not found</div>
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
              Back
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Assign Agent
                </h1>
                <p className="text-gray-600">
                  Assign a delivery agent to parcel #{parcel._id.slice(-8)}
                </p>
              </div>
              <Badge className={getStatusColor(parcel.status)}>
                {parcel.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Parcel Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Parcel Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                </div>
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
                  <p className="text-gray-900 mt-1">{parcel.deliveryAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Customer
                  </label>
                  <p className="text-gray-900 mt-1">
                    {parcel.customer.name} ({parcel.customer.email})
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Agent Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Select Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">
                    Choose an agent to assign
                  </label>
                  <Select
                    value={selectedAgentId}
                    onValueChange={setSelectedAgentId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent._id} value={agent._id}>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{agent.name}</span>
                            <span className="text-gray-500">
                              ({agent.email})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedAgentId && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-900">
                        Selected Agent
                      </span>
                    </div>
                    {(() => {
                      const selectedAgent = agents.find(
                        (agent) => agent._id === selectedAgentId
                      );
                      return selectedAgent ? (
                        <div className="space-y-1">
                          <p className="text-blue-800 font-medium">
                            {selectedAgent.name}
                          </p>
                          <p className="text-blue-700 flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {selectedAgent.email}
                          </p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    onClick={handleAssignAgent}
                    disabled={!selectedAgentId || assigning}
                    className="w-full"
                  >
                    {assigning ? "Assigning..." : "Assign Agent"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Agents List */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Available Agents ({agents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent) => (
                  <div
                    key={agent._id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAgentId === agent._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedAgentId(agent._id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {agent.name}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {agent.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleProtectedRoute>
  );
};

export default AssignAgentPage;
