"use client";
import { Menu, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

const NavbarComponent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // Get dashboard link based on role
  const dashboardLink =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "agent"
      ? "/dashboard/agent"
      : user?.role === "customer"
      ? "/dashboard/customer"
      : "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-[#f39f39]/90 shadow-lg border-b border-orange-200">
      <div className="container mx-auto flex h-16 items-center justify-between max-w-5xl">
        {/* Logo & Branding */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-white rounded-full p-1.5 shadow-sm border border-orange-200 transition group-hover:scale-105">
            <Truck className="size-8 text-[#f39f39]" />
          </div>
          <span className="ml-2 text-xl font-extrabold tracking-tight text-white drop-shadow-sm group-hover:text-black transition">
            Courier<span className="text-black">X</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden items-center space-x-2 md:flex">
          {user && (
            <Link
              href={dashboardLink}
              className="px-3 py-2 rounded-md text-white font-medium hover:bg-white/20 hover:text-black transition"
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/contact"
            className="px-3 py-2 rounded-md text-white font-medium hover:bg-white/20 hover:text-black transition"
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 rounded-md text-white font-medium hover:bg-white/20 hover:text-black transition"
          >
            About Us
          </Link>
          {/* Divider */}
          <div className="h-6 w-px bg-white/30 mx-2" />
          {user ? (
            <Button
              variant="outline"
              className="bg-white text-[#f39f39] border-orange-300 hover:bg-orange-50 hover:text-black font-semibold rounded-md px-4 py-2 shadow-sm transition"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="bg-white text-[#f39f39] border-orange-300 hover:bg-orange-50 hover:text-black font-semibold rounded-md px-4 py-2 shadow-sm transition"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="bg-black text-white border-orange-300 hover:bg-[#f39f39] hover:text-black font-semibold rounded-md px-4 py-2 shadow-sm transition"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="text-white size-7" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="text-black bg-white/95 border-r border-orange-100"
            >
              <div className="flex items-center gap-2 mb-8 mt-2 ml-4">
                <div className="bg-[#f39f39] rounded-full p-1.5 shadow-sm border border-orange-200">
                  <Truck className="size-7 text-white" />
                </div>
                <span className="ml-2 text-lg font-extrabold tracking-tight text-[#f39f39]">
                  Courier<span className="text-black">X</span>
                </span>
              </div>
              <div className="flex flex-col space-y-4 mx-2">
                {user && (
                  <Link
                    href={dashboardLink}
                    className="text-base font-medium rounded-md px-3 py-2 hover:bg-[#f39f39]/10 hover:text-[#f39f39] transition"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/contact"
                  className="text-base font-medium rounded-md px-3 py-2 hover:bg-[#f39f39]/10 hover:text-[#f39f39] transition"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium rounded-md px-3 py-2 hover:bg-[#f39f39]/10 hover:text-[#f39f39] transition"
                >
                  About Us
                </Link>
                <div className="border-t border-orange-100 my-2" />
                {user ? (
                  <Button
                    variant="outline"
                    className="bg-[#f39f39] text-white border-orange-300 hover:bg-orange-400 hover:text-black font-semibold rounded-md px-4 py-2 shadow-sm transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="bg-[#f39f39] text-white border-orange-300 hover:bg-orange-400 hover:text-black font-semibold rounded-md px-4 py-2 shadow-sm transition w-full"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        variant="outline"
                        className="bg-black text-white border-orange-300 hover:bg-[#f39f39] hover:text-black font-semibold rounded-md px-4 py-2 shadow-sm transition w-full"
                      >
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavbarComponent;
