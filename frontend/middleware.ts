import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {  
    
    // Jika pengguna mencoba mengakses halaman root, arahkan ke login
    if (request.nextUrl.pathname === "/") {
        const redirectAdmin = request.nextUrl.clone();
        redirectAdmin.pathname = "/login";
        return NextResponse.redirect(redirectAdmin);
    }

    // Untuk semua halaman lainnya, lanjutkan tanpa perubahan
    return NextResponse.next();
}
