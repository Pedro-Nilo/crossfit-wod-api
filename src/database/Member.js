const DB = require('./db.json');
const { CrudError } = require('./../errors/crudError');

const getOneMember = (memberId) => {
    try {
        const member = DB.members.find((member) => member.id === memberId);

        if (!member) {
            throw new CrudError(`Can't find member with the id '${memberId}'`);
        }

        return member;
    } catch (error) {
        throw new CrudError(error?.message || error, error?.status || 500);
    }
};

module.exports = {
    getOneMember
};
