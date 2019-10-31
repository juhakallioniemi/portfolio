import React, { useState } from "react";

export const PopupContext = React.createContext({
    // redirectUrl: "",
    // locationHash: "",
    // setContext: (
    //     activeType: string,
    //     redirectUrl: string,
    //     locationHash: string
    // ) => {}
});

export const PopupContextProvider = (props: any) => {
    const setContext = (
        activeType: string,
        redirectUrl: string,
        locationHash: string
    ) => {
        setState({
            ...state,
            activeType: activeType,
            redirectUrl: redirectUrl,
            locationHash: locationHash
        });
    };

    const popupType = {
        project: "project",
        confirmation: "confirmation"
    } as PopupType;

    const initState = {
        popupType: popupType,
        activeType: "",
        redirectUrl: "",
        locationHash: "",
        setContext: setContext
    };

    const [state, setState] = useState(initState);

    return (
        <PopupContext.Provider value={state}>
            {props.children}
        </PopupContext.Provider>
    );
};
