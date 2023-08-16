const Member = require("../database/Member");

const getOneMember = (memberId) => {
    try {
        const member = Member.getOneMember(memberId);

        return member;
    } catch (error) {
        console.log(`A exception occurred ${error}`);

        throw error;
    }
};

module.exports = {
    getOneMember
};
