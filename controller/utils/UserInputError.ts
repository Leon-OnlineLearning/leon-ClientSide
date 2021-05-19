export default class UserInputError extends Error{
    constructor(message:string) {
        super(message);
        this.message = message;
        this.name = "UserInputError";
    }
}