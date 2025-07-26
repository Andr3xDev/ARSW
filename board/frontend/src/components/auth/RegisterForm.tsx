import { useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";

interface RegisterFormProps {
    onLoginLinkClick: () => void;
}

export function RegisterForm({
    onLoginLinkClick,
}: Readonly<RegisterFormProps>) {
    const [step, setStep] = useState<"register" | "confirm">("register");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signUp({
                username: email,
                password,
                options: {
                    userAttributes: {
                        name,
                    },
                },
            });
            setStep("confirm");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await confirmSignUp({ username: email, confirmationCode });
            alert("Register completed! Now you can sign-in.");
            onLoginLinkClick();
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Common styles
    const inputStyles =
        "w-full px-3 py-2 text-white bg-[#3C3836] border border-[#504945] rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500";
    const buttonStyles =
        "w-full px-4 py-2 font-bold text-white bg-[#275359] rounded-md hover:bg-[#376349] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500";

    if (step === "confirm") {
        return (
            <form onSubmit={handleConfirm} className="space-y-6">
                <h2 className="text-2xl font-bold text-center">
                    Confirm Registration
                </h2>
                <p className="text-sm text-center text-gray-400">
                    A code has been sent to {email}
                </p>
                <div>
                    <input
                        type="text"
                        placeholder="Confirmation code"
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                        required
                        className={inputStyles}
                    />
                </div>
                <button type="submit" className={buttonStyles}>
                    Confirm!
                </button>
                {error && <p className="text-sm text-red-500">{error}</p>}
            </form>
        );
    }

    return (
        <form onSubmit={handleRegister} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Boardes register</h2>
            <div>
                <label className="text-sm font-bold text-[#DDBEA9]">
                    Username
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputStyles}
                />
            </div>
            <div>
                <label className="text-sm font-bold text-[#DDBEA9]">
                    Email
                </label>
                <input
                    type="email"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputStyles}
                />
            </div>
            <button type="submit" className={buttonStyles}>
                Registrarse
            </button>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <p className="text-sm text-center">
                Do you already have an account?{" "}
                <a
                    href="#"
                    onClick={onLoginLinkClick}
                    className="font-medium text-[#83A598] hover:underline"
                >
                    Sign-In
                </a>
            </p>
        </form>
    );
}
