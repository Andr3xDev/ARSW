export interface AuthFormData {
    email: string;
    password: string;
    confirmPassword?: string;
    username?: string;
}

export interface ValidationErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    username?: string;
}

export interface AuthInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ElementType;
    error?: string;
    showPasswordToggle?: boolean;
    onTogglePassword?: () => void;
    showPassword?: boolean;
}

export interface AuthButtonProps {
    onClick: () => void;
    loading: boolean;
    children: React.ReactNode;
    variant?: "primary" | "secondary";
}

export interface FormProps {
    onSubmit: (data: AuthFormData) => void;
    loading: boolean;
}

export interface LoginFormProps extends FormProps {
    onSwitchToRegister: () => void;
}

export interface RegisterFormProps extends FormProps {
    onSwitchToLogin: () => void;
}
