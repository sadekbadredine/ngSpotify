export class Artist{
    constructor(
        public followers:{
            href: any,
            total: number
        },
        public id: string,
        public images:[{
            height: number,
            url: string,
            width: string
        }],
        public name: string,
        public popularity: string,
    ){}
}