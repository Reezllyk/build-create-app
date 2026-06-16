import { LoginForm } from "@/components/login-form"
import {auth} from "@/auth";
import {redirect} from "next/navigation";

export default async function Page() {
    const session = await auth()

    if (session?.user) {
        redirect("/dashboard")
    }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
          <div className="fixed inset-0 -z-20">
              <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
          </div>
        <LoginForm />
      </div>
    </div>
  )
}
