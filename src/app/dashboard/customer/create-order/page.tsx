"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Package,
  MapPin,
  Truck,
  CreditCard,
  DollarSign,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import RoleProtectedRoute from "@/app/Utils/RoleProtectedRoute";

interface FormData {
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: string;
  parcelSize: string;
  codAmount: number;
  isPrepaid: boolean;
}

const CreateOrderPage = () => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    pickupAddress: "",
    deliveryAddress: "",
    parcelType: "Document",
    parcelSize: "Small",
    codAmount: 0,
    isPrepaid: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "codAmount" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isPrepaid" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to create an order");
      router.push("/login");
      return;
    }

    if (!formData.pickupAddress.trim() || !formData.deliveryAddress.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.pickupAddress === formData.deliveryAddress) {
      toast.error("Pickup and delivery addresses cannot be the same");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5300/api/v1/parcel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Parcel order created successfully!", {
          description: `Order ID: ${data.data._id}`,
        });

        setFormData({
          pickupAddress: "",
          deliveryAddress: "",
          parcelType: "Document",
          parcelSize: "Small",
          codAmount: 0,
          isPrepaid: false,
        });

        // setTimeout(() => {
        //   router.push("/dashboard/customer/orders");
        // }, 2000);
      } else {
        toast.error(data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const parcelTypes = [
    { value: "Document", label: "Document", icon: "📄" },
    { value: "Electronics", label: "Electronics", icon: "📱" },
    { value: "Clothing", label: "Clothing", icon: "👕" },
    { value: "Fragile", label: "Fragile", icon: "⚠️" },
    { value: "Food", label: "Food", icon: "🍕" },
    { value: "Other", label: "Other", icon: "📦" },
  ];

  const parcelSizes = [
    { value: "Small", label: "Small (Up to 1kg)", price: "৳50" },
    { value: "Medium", label: "Medium (1-5kg)", price: "৳100" },
    { value: "Large", label: "Large (5-15kg)", price: "৳150" },
    { value: "Oversized", label: "Oversized (15kg+)", price: "৳200" },
  ];

  return (
    <RoleProtectedRoute allowedRoles={["customer"]}>
      <div className="max-w-5xl mx-auto p-6">
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
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Order
            </h1>
          </div>
          <p className="text-gray-600">
            Fill in the details below to create your parcel order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-[#f39f39]" />
                  <span>Parcel Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <MapPin className="w-5 h-5 text-[#f39f39] mr-2" />
                      Address Information
                    </h3>

                    <div>
                      <Label
                        htmlFor="pickupAddress"
                        className="text-sm font-medium"
                      >
                        Pickup Address *
                      </Label>
                      <Input
                        id="pickupAddress"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleInputChange}
                        placeholder="Enter pickup address"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="deliveryAddress"
                        className="text-sm font-medium"
                      >
                        Delivery Address *
                      </Label>
                      <Input
                        id="deliveryAddress"
                        name="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={handleInputChange}
                        placeholder="Enter delivery address"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Package className="w-5 h-5 text-[#f39f39] mr-2" />
                      Parcel Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Parcel Type
                        </Label>
                        <Select
                          value={formData.parcelType}
                          onValueChange={(value) =>
                            handleSelectChange("parcelType", value)
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {parcelTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <span className="flex items-center space-x-2">
                                  <span>{type.icon}</span>
                                  <span>{type.label}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Parcel Size
                        </Label>
                        <Select
                          value={formData.parcelSize}
                          onValueChange={(value) =>
                            handleSelectChange("parcelSize", value)
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {parcelSizes.map((size) => (
                              <SelectItem key={size.value} value={size.value}>
                                <span className="flex items-center justify-between w-full">
                                  <span>{size.label}</span>
                                  <span className="text-sm text-gray-500">
                                    {size.price}
                                  </span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <CreditCard className="w-5 h-5 text-[#f39f39] mr-2" />
                      Payment Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Payment Type
                        </Label>
                        <Select
                          value={formData.isPrepaid.toString()}
                          onValueChange={(value) =>
                            handleSelectChange("isPrepaid", value)
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select payment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">
                              <span className="flex items-center space-x-2">
                                <CreditCard className="w-4 h-4" />
                                <span>Prepaid</span>
                              </span>
                            </SelectItem>
                            <SelectItem value="false">
                              <span className="flex items-center space-x-2">
                                <DollarSign className="w-4 h-4" />
                                <span>Cash on Delivery</span>
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {!formData.isPrepaid && (
                        <div>
                          <Label
                            htmlFor="codAmount"
                            className="text-sm font-medium"
                          >
                            COD Amount (৳)
                          </Label>
                          <Input
                            type="number"
                            id="codAmount"
                            name="codAmount"
                            value={formData.codAmount}
                            onChange={handleInputChange}
                            placeholder="0"
                            className="mt-1"
                            min="0"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#f39f39] hover:bg-orange-600 text-white py-3 text-lg font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creating Order...
                      </>
                    ) : (
                      <>
                        <Package className="w-5 h-5 mr-2" />
                        Create Order
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Parcel Type:</span>
                  <span className="font-medium">{formData.parcelType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{formData.parcelSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className="font-medium">
                    {formData.isPrepaid ? "Prepaid" : "Cash on Delivery"}
                  </span>
                </div>
                {!formData.isPrepaid && formData.codAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">COD Amount:</span>
                    <span className="font-medium">৳{formData.codAmount}</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Estimated Cost:</span>
                    <span className="text-[#f39f39]">৳50-200</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Final cost will be calculated based on distance and weight
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Our customer support team is available 24/7 to assist you with
                  your order.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RoleProtectedRoute>
  );
};

export default CreateOrderPage;
