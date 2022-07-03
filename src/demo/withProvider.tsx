import React from "react";
import { LocalToastProvider } from "react-local-toast";
import { LocalToastProviderProps } from "react-local-toast/dist/provider";
import { DefaultToastData } from "react-local-toast/dist/types";

export const withProvider = (Component: any, props: LocalToastProviderProps<DefaultToastData> = {}) => {
    return (innerProps: any) => {
        return (<LocalToastProvider {...props}>
            <Component {...innerProps} />
        </LocalToastProvider>);
    };
}