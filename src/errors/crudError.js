class CrudError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = "CrudError";
    }
}

module.exports = {
    CrudError
}
