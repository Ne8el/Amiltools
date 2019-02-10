export const IS_AUTH = 'IS_AUTH'

export function isAuthActions(isLogged){
    return {
        type: IS_AUTH,
        payload: isLogged
    }
}


export const SAVE_USER = 'SAVE_USER'

export function saveUserActions(tableParams){
    return {
        type: SAVE_USER,
        payload: tableParams
    }
}

export const LAST_REPORT = 'LAST_REPORT'

export function getLastReportActions(Params){
    return {
        type: LAST_REPORT,
        payload: Params
    }
}