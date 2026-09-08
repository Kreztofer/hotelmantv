"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Squares from "../components/animations/Squares";
import Image from "next/image";
import { images } from "../constants";
import Button from "../components/Button";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

const AffilatesSignup = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  return (
    <div className="w-full bg-white h-screen flex justify-between">
      <div className="w-[50%] flex flex-col items-center justify-center mb-20  gap-8">
        <Image
          className="mr-2"
          width={180}
          height={180}
          src={images.tvicon}
          alt="TV Icon"
        />
        <form
          onSubmit={handleSubmit(() => {
            const params = new URLSearchParams({ v1: "home" }).toString();
            router.push(`/dashboard?${params}`);
          })}
          className="w-[70%] flex-col flex gap-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-[#38adec]"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="********"
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-[#38adec]"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="gradient"
            className="w-full py-3 mt-10 text-[16px] hover:scale-[1.01]"
          >
            Sign in
          </Button>
        </form>
      </div>
      <div className="relative w-[50%] min-h-screen bg-gradient-to-b from-[#38adec] to-[#080917]">
        <Image
          className="mr-2 absolute -z-0 opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          width={220}
          height={220}
          src={images.icon}
          alt="TV Icon"
        />
        <Squares />
      </div>
    </div>
  );
};

export default AffilatesSignup;
