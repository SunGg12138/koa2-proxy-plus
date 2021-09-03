interface KoaContext {
    path: string,

    req: IncomingMessage,

    [propname: string]: any,
}