"use client";
import { useState } from "react";
import Link from "next/link";
import { LogIn, Mail, Lock } from "lucide-react";
import useLoginUser from "@/hooks/mutations/useLoginUser";
import { useRouter } from "next/navigation";
import { SuccessResponse } from "@/hooks/mutations/useCreateUser";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();
  const { mutateAsync } = useLoginUser();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await mutateAsync(credentials);
      const { success } = res as SuccessResponse;
      if (success) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono px-4">
      <div className="w-full max-w-md p-8 border border-slate-800 bg-slate-900/50 rounded-2xl backdrop-blur-xl">
        <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest italic">
          Secure_<span className="text-green-500">Login</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type="email"
              placeholder="EMAIL_ADDRESS"
              className="w-full bg-black border border-slate-800 rounded-lg py-3 px-10 text-white focus:border-green-500 outline-none transition-all"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full bg-black border border-slate-800 rounded-lg py-3 px-10 text-white focus:border-green-500 outline-none transition-all"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <button className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-green-500 transition-all uppercase text-sm tracking-widest mt-4">
            Authenticate
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          First time?{" "}
          <Link href="/register" className="text-green-500 hover:underline">
            CREATE_ID
          </Link>
        </p>
      </div>
    </div>
  );
}
