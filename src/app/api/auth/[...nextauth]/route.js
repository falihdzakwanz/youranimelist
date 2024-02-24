import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"
import { login } from "@/libs/auth-libs";
import { compare } from "bcrypt";

export const authOptions  = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"},
            },

            async authorize (credentials) {
                const { email, password } = credentials
                const user = await login({ email, password }) 

                if(user) {
                    const passwordConfirm = await compare(password, user.password)
                    if(passwordConfirm) {
                        return user
                    }
                    return null
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account?.provider === "credentials"){
                token.email = user.email;
                token.username = user.username;
            }
            return token;
        },
        async session({session, token}){            
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("username" in token) {
                session.user.name = token.username;
            }          
            return session;
        }
    },
    pages: {
        signIn: "/login"
    }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }