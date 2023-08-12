class Database
{
    private static _instance: Database;

    private constructor() {}

    public static get Instance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    public parseFlags(data) : void {
        
    }
}

export default Database.Instance;