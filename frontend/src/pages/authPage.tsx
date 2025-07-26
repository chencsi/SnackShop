import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type AuthPageProps = {
    mode: 'login' | 'register'
}

const loginSchema = z.object({
    username: z.string()
        .min(1, "Felhasználónév megadása kötelező"),
    password: z.string()
        .min(1, "Jelszó megadása kötelező"),
});

const registerSchema = z.object({
    username: z.string()
        .min(1, "Felhasználónév megadása kötelező")
        .min(3, "A felhasználónévnek legalább 3 karakterből kell állnia")
        .max(20, "A felhasználónév legfeljebb 20 karakterből állhat")
        .regex(/^[a-zA-Z0-9_]+$/, "A felhasználónév csak betűket, számokat és aláhúzásokat tartalmazhat")
        .refine(val => !/('|;|--|\/\*|\*\/)/.test(val), {
            message: "A felhasználónév nem tartalmazhat speciális karaktereket"
        }),
    password: z.string()
        .min(1, "Jelszó megadása kötelező")
        .min(8, "A jelszónak legalább 8 karakterből kell állnia")
        .refine(val => /[0-9]/.test(val), {
            message: "A jelszónak legalább egy számot kell tartalmaznia"
        })
        .refine(val => /[A-Z]/.test(val), {
            message: "A jelszónak legalább egy nagybetűt kell tartalmaznia"
        }),
    passwordConfirm: z.string()
        .min(1, "Jelszó megerősítése kötelező")
}).refine((data) => data.password === data.passwordConfirm, {
    message: "A jelszavak nem egyeznek",
    path: ["passwordConfirm"],
})

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage({ mode }: AuthPageProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormValues | RegisterFormValues>({
        resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
    });

    const onSubmit = (data: LoginFormValues | RegisterFormValues) => {
        console.log(data)
    }

    return (
        <div className="flex items-center justify-center">
            <div className="backdrop-blur-md bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-black/80 mb-6 drop-shadow-sm">
                    {mode === 'login' ? 'Bejelentkezés' : 'Regisztráció'}
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <label className="block text-black/80 font-semibold" htmlFor="username">Felhasználónév</label>
                        <input
                            id="username"
                            type="text"
                            className="w-full px-4 py-2 rounded-lg bg-gray-200/50 text-gray-800 focus:outline-none"
                            placeholder="Felhasználónév"
                            {...register("username")}
                        />
                        {errors.username && (
                            <span className="text-red-500 text-sm">{errors.username.message?.toString()}</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-black/80 font-semibold mb-1" htmlFor="password">Jelszó</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-200/50 text-gray-800 focus:outline-none"
                            placeholder="Jelszó"
                            {...register("password")}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message?.toString()}</span>
                        )}
                    </div>
                    {mode === 'register' && (
                        <div>
                            <label className="block text-black/80 font-semibold mb-1" htmlFor="passwordConfirm">Jelszó megerősítése</label>
                            <input
                                id="passwordConfirm"
                                type="password"
                                className="w-full px-4 py-2 rounded-lg bg-gray-200/50 text-gray-800 focus:outline-none"
                                placeholder="Jelszó újra"
                                {...register("passwordConfirm")}
                            />
                            {(errors as FieldErrors<RegisterFormValues>).passwordConfirm && (
                                <span className="text-red-500 text-sm">{(errors as FieldErrors<RegisterFormValues>).passwordConfirm?.message?.toString()}</span>
                            )}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-md transition cursor-pointer"
                    >
                        {mode === 'login' ? 'Bejelentkezés' : 'Regisztráció'}
                    </button>
                </form>
                <div className="mt-6 text-center text-black/80">
                    {mode === 'login' ? 'Nincs fiókod?' : 'Van már fiókod?'}{" "}
                    <a
                        href={mode === 'login' ? '/register' : '/login'}
                        className="underline font-semibold hover:text-black transition"
                    >
                        {mode === 'login' ? 'Regisztráció' : 'Bejelentkezés'}
                    </a>
                </div>
            </div>
        </div>
    )
}