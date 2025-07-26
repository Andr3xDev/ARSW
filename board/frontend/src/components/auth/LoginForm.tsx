import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
    onRegisterLinkClick: () => void;
    onForgotPasswordClick: () => void;
}

export function LoginForm({
    onRegisterLinkClick,
    onForgotPasswordClick,
}: Readonly<LoginFormProps>) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const { isSignedIn } = await signIn({ username: email, password });

            if (isSignedIn) {
                navigate("/", { replace: true });
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Common properties
    const inputStyles =
        "w-full px-3 py-2 text-white bg-[#3C3836] border border-[#504945] rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500";
    const buttonStyles =
        "w-full px-4 py-2 font-bold text-white bg-[#275359] rounded-md hover:bg-[#376349] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500";

    return (
        <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Boardes Login</h2>
            <div>
                <label className="text-sm font-bold text-[#DDBEA9]">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputStyles}
                />
            </div>
            <div>
                <label className="text-sm font-bold text-[#DDBEA9]">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputStyles}
                />
            </div>

            <div className="text-right text-sm">
                <a
                    href="#"
                    onClick={onForgotPasswordClick}
                    className="font-medium text-[#83A598] hover:underline"
                >
                    Did you forgot your password?
                </a>
            </div>

            {error && (
                <p className="text-sm text-center text-red-500">{error}</p>
            )}

            <button type="submit" className={buttonStyles}>
                Sign-In
            </button>

            <p className="text-sm text-center">
                You don't have an account?{"  "}
                <a
                    href="#"
                    onClick={onRegisterLinkClick}
                    className="font-medium text-[#83A598] hover:underline"
                >
                    Register
                </a>
            </p>
        </form>
    );
}
