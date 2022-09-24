import type {FormEventHandler} from "react";
import React, {memo, useState} from "react";
import {useConstCallback} from "powerhooks/useConstCallback";
import {I18n, KcContextBase, KcProps} from "keycloakify";
import {useCssAndCx} from "keycloakify/lib/tools/useCssAndCx";
import {Box, Button, Grid, Link, TextField, Typography, useMediaQuery} from "@mui/material";
import Template from "./Template";
import book from '../assets/book.jpg';
import education from '../assets/education.jpg';
import bright from '../assets/bright.jpg';
import studeFormat from '../assets/studeFormat.jpg';
import {useTheme} from '@mui/material/styles';

const Login = memo(({kcContext, i18n, ...props}: { kcContext: KcContextBase.Login; i18n: I18n } & KcProps) => {
    const {social, realm, url, usernameEditDisabled, login, auth, registrationDisabled} = kcContext;
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.up('sm'));
    const {msg, msgStr} = i18n;

    const {cx} = useCssAndCx();

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });

    return (
        <Grid container height={"100vh"} width={"100%"} justifyContent={"center"}>
            <Grid item xs={3} borderRadius={5} boxShadow={1} mt={4} ml={5}
                  sx={{backgroundColor: "white", maxHeight: "90%", display: {xs: "none", md: "block"}}}
            >
                {/*<Grid item xs={12} border={"solid"}>*/}
                    <Grid item xs={12} p={5}>
                        <Link href={"#"}>
                            <img src={education} height={80} width={80}/>
                        </Link>
                    </Grid>
                    <Grid item xs={12} p={1}>
                        <Typography variant={"h3"} fontWeight={"bold"} textAlign={"center"} color={"#1faf19"}>
                            Välkommen tillbaks
                        </Typography>
                    </Grid>
                    <Grid item pt={0}>
                        <img src={studeFormat} width={"100%"}/>
                    </Grid>
                {/*</Grid>*/}
            </Grid>
            <Grid item xs={8} sx={{'& .card-pf': {borderRadius: 10}}}>
                <Template
                    {...{kcContext, i18n, ...props}}
                    doFetchDefaultThemeResources={true}
                    // displayInfo={social.displayInfo}
                    // displayWide={realm.password && social.providers !== undefined}
                    headerNode={msg("doLogIn")}
                    formNode={
                        <Grid id="kc-form"
                              className={cx(realm.password && social.providers !== undefined && props.kcContentWrapperClass)}
                        >
                            <div
                                id="kc-form-wrapper"
                                className={cx(realm.password && social.providers && [props.kcFormSocialAccountContentClass, props.kcFormSocialAccountClass])}
                            >
                                {realm.password && (
                                    <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                                        <Grid container>
                                            {(() => {
                                                const label = !realm.loginWithEmailAllowed
                                                    ? "username"
                                                    : realm.registrationEmailAsUsername
                                                        ? "email"
                                                        : "usernameOrEmail";

                                                const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;

                                                return (
                                                    <>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                label="Email address"
                                                                color={"success"}
                                                                fullWidth
                                                                tabIndex={1}
                                                                id={autoCompleteHelper}
                                                                // className={cx(props.kcInputClass)}
                                                                name={autoCompleteHelper}
                                                                defaultValue={login.username ?? ""}
                                                                type="text"
                                                                {...(usernameEditDisabled
                                                                    ? {"disabled": true}
                                                                    : {
                                                                        "autoFocus": true,
                                                                        "autoComplete": "off"
                                                                    })}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} mt={2}>
                                                            <TextField
                                                                label={msg("password")}
                                                                color={"success"}
                                                                fullWidth
                                                                tabIndex={2}
                                                                id="password"
                                                                className={cx(props.kcInputClass)}
                                                                name="password"
                                                                type="password"
                                                                autoComplete="off"
                                                            />
                                                        </Grid>

                                                        {/*<label htmlFor={autoCompleteHelper} className={cx(props.kcLabelClass)}>*/}
                                                        {/*    {msg(label)}*/}
                                                        {/*</label>*/}
                                                        {/*<input*/}
                                                        {/*    tabIndex={1}*/}
                                                        {/*    id={autoCompleteHelper}*/}
                                                        {/*    className={cx(props.kcInputClass)}*/}
                                                        {/*    name={autoCompleteHelper}*/}
                                                        {/*    defaultValue={login.username ?? ""}*/}
                                                        {/*    type="text"*/}
                                                        {/*    {...(usernameEditDisabled*/}
                                                        {/*        ? {"disabled": true}*/}
                                                        {/*        : {*/}
                                                        {/*            "autoFocus": true,*/}
                                                        {/*            "autoComplete": "off"*/}
                                                        {/*        })}*/}
                                                        {/*/>*/}
                                                    </>
                                                );
                                            })()}
                                        </Grid>
                                        {/*<div className={cx(props.kcFormGroupClass)}>*/}
                                        {/*    <label htmlFor="password" className={cx(props.kcLabelClass)}>*/}
                                        {/*        {msg("password")}*/}
                                        {/*    </label>*/}
                                        {/*    <input*/}
                                        {/*        tabIndex={2}*/}
                                        {/*        id="password"*/}
                                        {/*        className={cx(props.kcInputClass)}*/}
                                        {/*        name="password"*/}
                                        {/*        type="password"*/}
                                        {/*        autoComplete="off"*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        <Grid container
                                              className={cx(props.kcFormGroupClass, props.kcFormSettingClass)}>
                                            <Grid item id="kc-form-options" mt={3}>
                                                {realm.rememberMe && !usernameEditDisabled && (
                                                    <div className="checkbox">
                                                        <label>
                                                            <input
                                                                tabIndex={3}
                                                                id="rememberMe"
                                                                name="rememberMe"
                                                                type="checkbox"
                                                                {...(login.rememberMe
                                                                    ? {
                                                                        "checked": true
                                                                    }
                                                                    : {})}
                                                            />
                                                            {msg("rememberMe")}
                                                        </label>
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item mt={3} className={cx(props.kcFormOptionsWrapperClass)}>
                                                {realm.resetPasswordAllowed && (
                                                    <span>
                                                <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                                                    {msg("doForgotPassword")}
                                                </a>
                                            </span>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <div id="kc-form-buttons" className={cx(props.kcFormGroupClass)}>
                                            <input
                                                type="hidden"
                                                id="id-hidden-input"
                                                name="credentialId"
                                                {...(auth?.selectedCredential !== undefined
                                                    ? {
                                                        "value": auth.selectedCredential
                                                    }
                                                    : {})}
                                            />
                                            <Button variant="contained"
                                                    fullWidth
                                                    name="login"
                                                    id="kc-login"
                                                    tabIndex={4}
                                                    type="submit"
                                                    value={msgStr("doLogIn")}
                                                    disabled={isLoginButtonDisabled}
                                            >
                                                {msgStr("doLogIn")}
                                            </Button>
                                            {/*<input*/}
                                            {/*    tabIndex={4}*/}
                                            {/*    className={cx(*/}
                                            {/*        props.kcButtonClass,*/}
                                            {/*        props.kcButtonPrimaryClass,*/}
                                            {/*        props.kcButtonBlockClass,*/}
                                            {/*        props.kcButtonLargeClass*/}
                                            {/*    )}*/}
                                            {/*    name="login"*/}
                                            {/*    id="kc-login"*/}
                                            {/*    type="submit"*/}
                                            {/*    value={msgStr("doLogIn")}*/}
                                            {/*    disabled={isLoginButtonDisabled}*/}
                                            {/*/>*/}
                                        </div>
                                    </form>
                                )}
                            </div>
                            {realm.password && social.providers !== undefined && (
                                <div id="kc-social-providers"
                                     className={cx(props.kcFormSocialAccountContentClass, props.kcFormSocialAccountClass)}>
                                    <ul
                                        className={cx(
                                            props.kcFormSocialAccountListClass,
                                            social.providers.length > 4 && props.kcFormSocialAccountDoubleListClass
                                        )}
                                    >
                                        {social.providers.map(p => (
                                            <li key={p.providerId}
                                                className={cx(props.kcFormSocialAccountListLinkClass)}>
                                                <a href={p.loginUrl} id={`zocial-${p.alias}`}
                                                   className={cx("zocial", p.providerId)}>
                                                    <span>{p.displayName}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Grid>
                    }
                    infoNode={
                        realm.password &&
                        realm.registrationAllowed &&
                        !registrationDisabled && (
                            <div id="kc-registration">
                        <span>
                            {msg("noAccount")}
                            <a tabIndex={6} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </span>
                            </div>
                        )
                    }
                />
            </Grid>

        </Grid>

    );
});

export default Login;
