"use client";
import { useState } from "react";
import Link from "next/link";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import useCreateUser from "@/hooks/mutations/useCreateUser";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const location = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { mutateAsync } = useCreateUser();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await mutateAsync(formData);
      console.log(res, "res  ");
      if (res.status === "error") {
        location.push("/login");
      }
    } catch (error) {
      console.error("Mutation failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono px-4">
      <div className="w-full max-w-md p-8 border border-slate-800 bg-slate-900/50 rounded-2xl backdrop-blur-xl">
        <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest italic">
          New_<span className="text-green-500">Account</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="FULL_NAME"
              className="w-full bg-black border border-slate-800 rounded-lg py-3 px-10 text-white focus:border-green-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
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
                setFormData({ ...formData, email: e.target.value })
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
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all uppercase text-sm tracking-widest mt-4">
            Initialize Access
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an ID?{" "}
          <Link href="/login" className="text-green-500 hover:underline">
            ACCESS_LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}
