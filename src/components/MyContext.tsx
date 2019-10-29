import React, { useState } from "react";

export const MyContext = React.createContext({
    isPopupVisible: false,
    setVisibility: (isPopupVisible: boolean) => {
        console.log("my-context: " + isPopupVisible);
    }
});

export const MyContextProvider = (props: any) => {
    const setVisibility = (isPopupVisible: boolean) => {
        console.log("context-provider: " + isPopupVisible);
        setState({ ...state, isPopupVisible: isPopupVisible });
    };

    const initState = {
        isPopupVisible: false,
        setVisibility: setVisibility
    };

    const [state, setState] = useState(initState);

    return (
        <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
    );
};
