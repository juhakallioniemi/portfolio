declare module "shortid";

interface PopupContext {
    popupType: PopupType;
    activeType: string;
    redirectUrl: string;
    locationHash: string;
    setContext: (
        popupType: string,
        redirectUrl?: string,
        locationHash?: string
    ) => {};
}

interface PopupType {
    confirmation: string;
    project: string;
}

interface AppSettings {
    facebook: string;
    linkedin: string;
    github: string;
    brandGameUrl: string;
}
