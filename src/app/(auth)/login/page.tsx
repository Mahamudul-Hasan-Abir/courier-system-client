/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import lottieData from "../../../../public/lottie/8.json";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/features/authSlice";
import Lottie from "lottie-react";
import Link from "next/link";
import { Truck } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials({ user: res.data, token: res.token }));
      if (res.data.role === "admin") {
        router.push("/dashboard/admin");
      } else if (res.data.role === "agent") {
        router.push("/dashboard/agent");
      } else {
        router.push("/dashboard/customer");
      }
    } catch (err: any) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl py-10 mx-auto items-center md:items-stretch min-h-[70vh]">
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 hidden md:flex justify-center items-center order-1 mb-6 md:mb-0">
        <Lottie
          animationData={lottieData}
          loop
          autoplay
          style={{ width: 400, height: 400 }}
        />
      </div>

      {/* Login Card */}
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
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            Sign in to your account
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            Welcome back! Please enter your credentials.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
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

            <Button
              type="submit"
              className="w-full bg-[#f39f39] text-white font-semibold rounded-md hover:bg-black hover:text-[#f39f39] transition"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="w-full flex items-center my-6">
            <div className="flex-1 h-px bg-orange-100" />
            <span className="mx-3 text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-orange-100" />
          </div>
          <p className="text-sm text-gray-700">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#f39f39] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
