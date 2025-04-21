import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

interface SupabaseUser {
  user_metadata: {
    name: string;
  };
  app_metadata: {
    role: string;
  };
}

const secret = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET
);

function hasAccess(path: string, role: string): boolean {
  const accessMap: Record<string, string[]> = {
    "/admin": ["ADMIN"],
    "/teacher": ["INSTRUCTOR", "ADMIN"],
    "/dashboard": ["STUDENT", "INSTRUCTOR", "ADMIN"],
  };

  for (const route in accessMap) {
    if (path.startsWith(route)) {
      return accessMap[route].includes(role);
    }
  }

  return true;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const user = payload as unknown as SupabaseUser;
    const userRole = user.app_metadata?.role;

    if (!hasAccess(pathname, userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erro ao verificar JWT:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/teacher",
    "/teacher/:path*",
  ],
};
