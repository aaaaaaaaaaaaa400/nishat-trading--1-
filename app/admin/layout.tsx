"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Home, LogOut, User, FolderTree } from "lucide-react";
import { getCookie, deleteCookie } from "cookies-next";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated via cookie
    const authCookie = getCookie("admin-auth");
    const isAuth = authCookie === "true";
    setIsAuthenticated(isAuth);
    setIsLoading(false);

    // If not authenticated and not on login page, redirect to login
    if (!isAuth && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    deleteCookie("admin-auth");
    router.push("/admin/login");
  };

  // Show loading indicator while checking authentication
  if (isLoading && pathname !== "/admin/login") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // If this is the login page or user is not authenticated, just show the content
  if (pathname === "/admin/login" || !isAuthenticated) {
    return <>{children}</>;
  }

  // Admin layout with navigation
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center">
              <h1 className="text-xl font-bold tracking-tight">Nishat Trading Admin</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/40 px-4 py-6 hidden md:block">
          <nav className="flex flex-col gap-2">
            <Link href="/admin/dashboard">
              <Button
                variant={pathname === "/admin/dashboard" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button
                variant={pathname.includes("/admin/products") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Package className="mr-2 h-4 w-4" />
                Products
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button
                variant={pathname.includes("/admin/categories") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <FolderTree className="mr-2 h-4 w-4" />
                Categories
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
