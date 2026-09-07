import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

/**
 * Formato do access token emitido pelo backend (NestJS `AuthService`):
 * `jwtService.signAsync({ sub, email, role }, { secret: JWT_SECRET })`.
 * O `role` é uma claim plana ("STUDENT" | "INSTRUCTOR" | "ADMIN").
 */
interface AccessTokenPayload {
  sub?: string;
  email?: string;
  role?: string;
}

const PUBLIC_PATHS = ["/login", "/register", "/recover-password"];

/**
 * Deve ser o MESMO valor de `JWT_SECRET` do backend, senão toda verificação
 * falha e o usuário autenticado é jogado para /login. Resolvido a cada request
 * (e não no import) para não quebrar o Edge runtime quando a env não existe.
 */
function getSecret(): Uint8Array | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

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
  const secret = getSecret();

  if (!secret) {
    console.error("JWT_SECRET ausente no frontend; não é possível validar sessão.");
    if (isPublicPath) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicPath) {
    if (!token) return NextResponse.next();
    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/dashboard/home", req.url));
    } catch {
      // Token presente mas inválido (secret trocado, assinado por outro
      // backend, corrompido): limpa para não ficar preso num loop silencioso.
      const res = NextResponse.next();
      res.cookies.delete("token");
      res.cookies.delete("user");
      return res;
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const { role } = payload as AccessTokenPayload;

    if (!role || !hasAccess(pathname, role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? (error as { code?: string }).code
        : undefined;

    const reason =
      code === "ERR_JWT_EXPIRED" ? "expired" : "invalid";
    console.warn(
      `[middleware] JWT rejeitado (${reason}). Se você acabou de trocar o ` +
        `JWT_SECRET, reinicie o backend e o next dev e refaça o login.`,
    );

    // Redireciona para /login já limpando o cookie inválido, senão o próximo
    // request cai aqui de novo (loop "silencioso").
    const res = NextResponse.redirect(
      new URL(`/login?session=${reason}`, req.url),
    );
    res.cookies.delete("token");
    res.cookies.delete("user");
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
