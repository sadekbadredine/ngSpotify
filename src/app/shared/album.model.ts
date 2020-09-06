export class Album{
    constructor(
        public album_group:string,
        public album_type: string,
        public artists:[{
            external_urls:{
                spotify: string
            },
            href:string,
            id: string,
            name: string,
            type: string,
            uri: string
        }],
        public external_urls:[{
           spotify: string 
        }],
        public href: string,
        public id: string,
        public images: [{
            height: number,
            url: string,
            width: string
        }],
        public name: string,
        public release_date: string,
        public release_date_precision: string,
        public total_tracks: number,
        public uri: string
    ){}
}