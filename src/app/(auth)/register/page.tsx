"use client";
import lottieData from "../../../../public/lottie/8.json";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Truck } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/features/authSlice";
import { toast } from "sonner";
import Lottie from "lottie-react";

export default function RegisterPage() {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "customer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(formData).unwrap();
      dispatch(setCredentials({ user: res.data, token: res.token }));
      if (res.data.role === "admin") {
        router.push("/dashboard/admin");
      } else if (res.data.role === "agent") {
        router.push("/dashboard/agent");
      } else {
        router.push("/dashboard/customer");
      }
      toast.success("Registered");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl py-10 mx-auto items-center md:items-stretch min-h-[70vh]">
      {/* Lottie: left on desktop, top on mobile */}
      <div className="w-full hidden md:w-1/2 md:flex justify-center items-center order-1 mb-6 md:mb-0">
        <Lottie
          animationData={lottieData}
          loop
          autoplay
          style={{ width: 400, height: 400 }}
        />
      </div>
      {/* Text and form: right on desktop, bottom on mobile */}
      <div className="w-full md:w-1/2 flex flex-col justify-center order-2 px-4">
        <div className="bg-white/90 rounded-2xl shadow-xl border border-orange-100 p-8 md:p-10 flex flex-col items-center">
          {/* Branding */}
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="bg-[#f39f39] rounded-full p-2 shadow-sm border border-orange-200 group-hover:scale-105 transition">
              <Truck className="size-7 text-white" />
            </div>
            <span className="ml-2 text-xl font-extrabold tracking-tight text-[#f39f39] group-hover:text-black transition">
              Courier<span className="text-black">X</span>
            </span>
          </Link>
          <h1 className="text-2xl font-semibold mb-2 text-gray-900">
            Create an Account
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            Sign up to get started with CourierX.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
            <div>
              <Label className="mb-2" htmlFor="name">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-[#f39f39] focus:border-[#f39f39] transition"
              />
            </div>

            <div>
              <Label className="mb-2" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-[#f39f39] focus:border-[#f39f39] transition"
              />
            </div>

            <div>
              <Label className="mb-2" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-[#f39f39] focus:border-[#f39f39] transition"
              />
            </div>

            <div>
              <Label className="mb-2" htmlFor="phone">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="01XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-[#f39f39] focus:border-[#f39f39] transition"
              />
            </div>

            <div>
              <Label className="mb-2" htmlFor="address">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Street, City"
                value={formData.address}
                onChange={handleChange}
                className="focus:ring-2 focus:ring-[#f39f39] focus:border-[#f39f39] transition"
              />
            </div>

            <div>
              <Label className="mb-2" htmlFor="role">
                Role
              </Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="focus:ring-2 focus:ring-[#f39f39] focus:border-[#f39f39] transition">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#f39f39] text-white font-semibold rounded-md hover:bg-black hover:text-[#f39f39] transition"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </Button>
          </form>
          <div className="w-full flex items-center my-6">
            <div className="flex-1 h-px bg-orange-100" />
            <span className="mx-3 text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-orange-100" />
          </div>
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#f39f39] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
