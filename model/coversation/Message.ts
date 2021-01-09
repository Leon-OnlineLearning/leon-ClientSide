import User from "../users/User";

export default class Message {
  // base class for message in conversation
  constructor(
    private _id: number,
    private _content: string,
    private time: Date,
    public sender: User
  ) {}

  public get id() : number {
      return this._id;
  }
  
  public set content(v: string) {
    this._content = v;
  }

  public get content(): string {
    return this._content;
  }
}
