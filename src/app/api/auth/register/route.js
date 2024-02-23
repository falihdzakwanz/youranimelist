import { register } from "@/libs/auth-libs"

export async function POST(request) {
    const req = await request.json()
    const res = await register(req)
    return Response.json(
        { status: res.status, message: res.message }, 
        { status: res.statusCode }
    )
}