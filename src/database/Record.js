const DB = require('./db.json');
const { CrudError } = require('./../errors/crudError');

const getRecordForWorkout = (workoutId) => {
    try {
        const record = DB.records.filter((record) => record.workout === workoutId);

        if (!record) {
            throw new CrudError(`Can't find record with the workout id = '${workoutId}'`, 400);
        }

        return record;
    } catch (error) {
        throw new CrudError(error?.message || error, error?.status || 500);
    }
};

module.exports = {
    getRecordForWorkout
};
