import Global = NodeJS.Global;

export interface ProcessEnv {
    [key: string]: string | undefined
}

export interface Globals extends Global {
    $config: any
}