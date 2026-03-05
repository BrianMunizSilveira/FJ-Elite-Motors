import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Implementação simplificada para demonstração.
        // Em produção, verificar no banco de dados com hash de senha.
        const user = { id: "1", name: "Admin", email: "admin@fjelitemotors.com" };

        if (credentials?.email === "admin@fjelitemotors.com" && credentials?.password === "admin123") {
          return user;
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
