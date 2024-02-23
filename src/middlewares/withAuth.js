import { getToken } from "next-auth/jwt"

export default function withAuth(middleware, requireAuth){
    return async (req, next) => {
        const pathname = req.nextUrl.pathname

        if(pathname.startsWith("/users")){
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET
            })
            if(!token) {
                const url = new URL("/login", req.url)
                url.searchParams.set("callbackUrl", encodeURI(req.url))
                return Response.redirect(url)
            }
            return middleware(req, next)
        }
    }
}