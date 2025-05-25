import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

interface SupabaseUserPayload {
  user_metadata?: {
    name?: string;
  };
  app_metadata?: {
    role?: string;
  };
}

const PUBLIC_PATHS = ["/login", "/register", "/recover-password"];

const secret = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET
);

function hasAccess(path: string, role: string): boolean {
  const accessMap: Record<string, string[]> = {
    "/admin": ["ADMIN"],
    "/instructor": ["INSTRUCTOR", "ADMIN"],
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
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (isPublicPath && token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/dashboard/home", req.url));
    } catch (err) {
      console.warn("Token inválido em rota pública. Deixando prosseguir.");
      const res = NextResponse.next();
      res.cookies.delete("token");
      res.cookies.delete("user");
      return res;
    }
  }

  if (isPublicPath && !token) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const userPayload = payload as SupabaseUserPayload;
    const role = userPayload.app_metadata?.role;

    if (!role || !hasAccess(pathname, role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erro ao verificar JWT:", error);
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token");
    return res;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/instructor/:path*",
    "/login",
    "/register",
    "/recover-password",
  ],
};
