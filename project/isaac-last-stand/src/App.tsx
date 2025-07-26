import { AppRoutes } from "./routes.tsx";
import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { sessionStorage } from "aws-amplify/utils";
import { AuthProvider } from "./context/AuthContext.tsx";

// Amplify config to login
Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
            userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
            identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
        },
    },
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

// Normal app call
function App() {
    return (
        <AuthProvider>
            <div className="App">
                <AppRoutes />
            </div>
        </AuthProvider>
    );
}

export default App;
