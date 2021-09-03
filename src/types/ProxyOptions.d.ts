interface ProxyOptions {
    targets: {
        [propname: string]: {
            query: {
                [propname: string]: any
            },
            body: {
                [propname: string]: any
            },
            headers: {
                [propname: string]: string | number
            },
            buffer: Stream,
            
            [propname: string]: any
        }
    }
}