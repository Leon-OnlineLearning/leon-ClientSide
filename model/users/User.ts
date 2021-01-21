export default class User {

    constructor(private _name: string, private _id: number) { }

    public get name() : string {
        return this._name
    }
    
    public set name(v : string) {
        this.name = v;
    }
    
    public get id(): number {
        return this._id;
    }
    
}