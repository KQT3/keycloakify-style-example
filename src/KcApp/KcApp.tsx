import "./KcApp.css";
import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import KcAppBase, { defaultKcProps } from "keycloakify";
import { useI18n } from "./i18n";
import Login from "./Login";
import UpdateUserProfile from "./UpdateUserProfile";
import LoginConfigTotp from "./LoginConfigTotp";


const Register = lazy(() => import("./Register"));
const Terms = lazy(() => import("./Terms"));
const MyExtraPage2 = lazy(() => import("./MyExtraPage2"));
const MyExtraPage1 = lazy(() => import("./MyExtraPage1"));

export type Props = {
    kcContext: KcContext;
};

export default function KcApp({ kcContext }: Props) {
    const i18n = useI18n({ kcContext });

    //NOTE: Locales not yet downloaded
    if (i18n === null) {
        return null;
    }

    const props = {
        i18n,
        ...defaultKcProps,
        // NOTE: The classes are defined in ./KcApp.css
        "kcHeaderWrapperClass": "my-color my-font",
    };

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "register.ftl": return <Register {...{ kcContext, ...props }} />;
                    case "login.ftl": return <Login {...{ kcContext, ...props }} />;
                    case "terms.ftl": return <Terms {...{ kcContext, ...props }} />;
                    case "update-user-profile.ftl": return <UpdateUserProfile {...{ kcContext, ...props }} />;
                    case "login-config-totp.ftl": return <LoginConfigTotp {...{ kcContext, ...props }} />;
                    case "my-extra-page-1.ftl": return <MyExtraPage1 {...{ kcContext, ...props }} />;
                    case "my-extra-page-2.ftl": return <MyExtraPage2 {...{ kcContext, ...props }} />;
                    default: return <KcAppBase {...{ kcContext, ...props }} />;
                }
            })()}
        </Suspense>
    );

}
