import { useState } from "react";
import { resetPassword, confirmResetPassword } from "aws-amplify/auth";

interface ForgotPasswordFormProps {
    onLoginLinkClick: () => void;
}

export function ForgotPasswordForm({
    onLoginLinkClick,
}: Readonly<ForgotPasswordFormProps>) {
    const [step, setStep] = useState<"request" | "confirm">("request");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState("");

    const handleRequestCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await resetPassword({ username: email });
            setStep("confirm");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrió un error inesperado");
            }
        }
    };

    const handleConfirmReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await confirmResetPassword({
                username: email,
                newPassword,
                confirmationCode,
            });
            alert(
                "Contraseña actualizada con éxito. Ahora puedes iniciar sesión."
            );
            onLoginLinkClick();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrió un error inesperado");
            }
        }
    };

    // Common styles
    const inputStyles =
        "w-full px-3 py-2 text-white bg-[#3C3836] border border-[#504945] rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500";
    const buttonStyles =
        "w-full px-4 py-2 font-bold text-white bg-[#C15328] rounded-md hover:bg-[#B1361E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500";

    if (step === "confirm") {
        return (
            <form onSubmit={handleConfirmReset} className="space-y-6">
                <h2 className="text-2xl font-bold text-center">
                    Create a New Password
                </h2>
                <div>
                    <label className="text-sm font-bold text-[#DDBEA9]">
                        Código de Confirmación
                    </label>
                    <input
                        type="text"
                        placeholder="123456"
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                        required
                        className={inputStyles}
                    />
                </div>
                <div>
                    <label className="text-sm font-bold text-[#DDBEA9]">
                        Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className={inputStyles}
                    />
                </div>
                <button type="submit" className={buttonStyles}>
                    Actualizar Contraseña
                </button>
                {error && <p className="text-sm text-red-500">{error}</p>}
            </form>
        );
    }

    return (
        <form onSubmit={handleRequestCode} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
                Recuperar Contraseña
            </h2>
            <p className="text-sm text-center text-[#83A598]">
                Enter your email to receive a recovery code.
            </p>
            <div>
                <label className="text-sm font-bold text-gray-400">Email</label>
                <input
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputStyles}
                />
            </div>
            <button type="submit" className={buttonStyles}>
                Enviar Código
            </button>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <p className="text-sm text-center">
                <a
                    href="#"
                    onClick={onLoginLinkClick}
                    className="font-medium text-[#83A598] hover:underline"
                >
                    Volver a inicio de sesión
                </a>
            </p>
        </form>
    );
}
