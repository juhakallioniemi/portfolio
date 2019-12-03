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
    forgottenCredentials: string;
}

interface LocationHashContext {
    isProjectActive: boolean;
}

interface LoginInfo {
    username: string;
    timeStamp: number;
}

interface AppSettings {
    brandGameUrl: string;
    lastModified: string;
    readmeEN: string;
    readmeFI: string;
    loginPassPhrase: string;
    apiUrl: string;
}

interface ApiResponse {
    text: string;
    type: string;
}

interface Todos {
    id: number;
    title: string;
}

interface Tasks {
    id: number;
    task: string;
    todo_id: number;
}
