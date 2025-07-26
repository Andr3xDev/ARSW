import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { sessionStorage } from "aws-amplify/utils";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./Context/AuthContext";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: "us-east-1_JgxrBZuxN",
            userPoolClientId: "6o1pf49she2kk2stp0plbpu15s",
            identityPoolId: "us-east-1:b26834cd-741c-4622-8aaf-c68ff8256511",
        },
    },
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

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
