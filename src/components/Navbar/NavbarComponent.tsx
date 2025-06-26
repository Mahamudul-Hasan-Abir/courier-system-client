"use client";
import { Menu, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const NavbarComponent = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#f39f39] shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-5xl">
        {/* Logo */}
        <div className="flex items-center">
          <Truck className="size-10 text-white"></Truck>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/create-order"
            className="text-white font-medium hover:text-[#f39f39]"
          >
            Create Order
          </Link>
          <Link
            href="/contact"
            className="text-white font-medium hover:text-[#f39f39]"
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="text-white font-medium hover:text-[#f39f39]"
          >
            About Us
          </Link>
          <Button
            variant="outline"
            className="bg-white text-[#f39f39] hover:bg-gray-100"
          >
            Sign In
          </Button>
          <Button className="bg-white text-[#f39f39] hover:bg-gray-100">
            Register
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="text-white" />
            </SheetTrigger>
            <SheetContent side="left" className=" text-black">
              <div className="flex flex-col space-y-6 mt-10 mx-5">
                <Link
                  href="/create-order"
                  className="text-lg font-medium hover:text-[#f39f39]"
                >
                  Create Order
                </Link>
                <Link
                  href="/contact"
                  className="text-lg font-medium hover:text-[#f39f39]"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium hover:text-[#f39f39]"
                >
                  About Us
                </Link>
                <Button
                  variant="outline"
                  className="bg-[#f39f39] text-white hover:bg-gray-100"
                >
                  Sign In
                </Button>
                <Button
                  variant={"outline"}
                  className="bg-white text-[#f39f39] hover:bg-gray-100"
                >
                  Register
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavbarComponent;
