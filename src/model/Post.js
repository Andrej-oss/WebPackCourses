export default class Post {
    constructor(tittle, img) {
        this.tittle = tittle;
        this.date = new Date();
        this.img = img;
    }
    toStringPost(){
        return JSON.stringify({
            tittle: this.tittle,
            date: this.date.toJSON(),
            image: this.img,
            post: 'Post'
        }, null, 2)
    }
}
