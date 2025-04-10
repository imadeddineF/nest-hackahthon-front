import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "next-view-transitions";
// import { useActionState } from "react";
// import { login } from "@/actions/login";
// import { useFormStatus } from "react-dom";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    // const [state, loginAction] = useActionState(login, undefined);
    // const { pending } = useFormStatus();

    return (
        <form
            // action={loginAction}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" required />
                    <Link
                        href="/forgotPassword"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>

                {/* {state?.error && (
                    <p className="text-sm text-red-500">{state.error.email}</p>
                )} */}

                {/* <Button disabled={pending} type="submit" className="w-full">
                    {pending ? "Loading..." : "Login"}
                </Button> */}
                <Link href={"/dashboard"} className="w-full">
                    <Button className="w-full">Login</Button>
                </Link>
            </div>
        </form>
    );
}
