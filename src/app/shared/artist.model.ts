export class Artist{
    constructor(
        public external_urls: {
            spotify: string    
        },
        public followers:{
            href: any,
            total: number
        },
        public genres:[],
        public href: string,
        public id: string,
        public images:[{
            height: number,
            url: string,
            width: string
        }],
        public name: string,
        public popularity: string,
        public type: string,
        public uri: string  
    ){}
}