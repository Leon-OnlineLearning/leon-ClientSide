import User from "./User"

export default class Admin extends User {
    constructor(firstName: string, lastName: string, email: string, id?: string) {
        super(firstName, lastName, email, "admin", id ?? id);
    }
}
