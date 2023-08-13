const DB = require("./db.json");
const { saveToDatabase } = require("./utils");
const { CrudError } = require('./../errors/crudError');

const getAllWorkouts = () => {
    try {
        return DB.workouts;
    } catch (error) {
        throw new CrudError(error, 500);
    }
};

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);

        if (!workout) {
            throw new CrudError(`Can't find workout with the id '${workoutId}'`);
        }

        return workout;
    } catch (error) {
        throw new CrudError(error?.message || error, error?.status || 500);
    }
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

    if (isAlreadyAdded) {
        throw new CrudError(`Workout with the name '${newWorkout.name}' already exists`, 400);
    }

    try {
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);

        return newWorkout;
    } catch (error) {
        throw new CrudError(error?.message || error, error?.status || 500);
    }
};

const updateOneWorkout = (workoutId, changes) => {
    try {
        const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;

        if (isAlreadyAdded) {
            throw new CrudError(`Workout with the name '${changes.name}' already exists`, 400);
        }

        const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);

        if (indexForUpdate === -1) {
            throw new CrudError(`Can't find workout with the id '${workoutId}`, 400);
        }

        const updatedWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleDateString("pt-BR", { timeZone: "UTC" })
        };

        DB.workouts[indexForUpdate] = updatedWorkout;
        saveToDatabase(DB);

        return updatedWorkout;
    } catch (error) {
        throw new CrudError(error?.status || 500, error?.message || error);
    }
};

const deleteOneWorkout = (workoutId) => {
    try {
        const indexForDeletion = DB.workouts.findIndex((workout) => workout.id === workoutId);

        if (indexForDeletion === -1) {
            throw new CrudError(`Can't find workout with the id '${workoutId}'`, 400);
        }

        DB.workouts.splice(indexForDeletion, 1);

        saveToDatabase(DB);
    } catch (error) {
        throw new CrudError(error?.status || 500, error?.message || error);
    }
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};
