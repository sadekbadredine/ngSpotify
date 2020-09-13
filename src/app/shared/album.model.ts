// Album model is to define the returned Object from the spotify server
export class Album{
    constructor(
        public artists:[{
            name: string,
        }],
        public external_urls:[{
           spotify: string 
        }],
        public images: [{
            height: number,
            url: string,
            width: string
        }],
        public name: string,
        public release_date: string,
        public total_tracks: number,
    ){}
}