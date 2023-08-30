const { v4: uuid } = require("uuid");

const Workout = require("../database/Workout");

const getAllWorkouts = (filterParams) => {
    try {
        const allWorkouts = Workout.getAllWorkouts(filterParams);

        return allWorkouts;
    } catch (error) {
        console.log(`A exception occurred ${error}`);

        throw error;
    }
};

const getOneWorkout = (workoutId) => {
    try {
        const workout = Workout.getOneWorkout(workoutId);

        return workout;
    } catch (error) {
        console.log(`A exception occurred ${error}`);

        throw error;
    }
};

const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleDateString("pt-BR", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleDateString("pt-BR", { timeZone: "UTC" })
    };

    try {
        const createdWorkout = Workout.createNewWorkout(workoutToInsert);

        return createdWorkout;
    } catch (error) {
        console.log(`A exception occurred ${error}`);

        throw error;
    }
};

const updateOneWorkout = (workoutId, changes) => {
    try {
        const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);

        return updatedWorkout;
    } catch (error) {
        console.log(`A exception occurred ${error}`);

        throw error;
    }
};

const deleteOneWorkout = (workoutId) => {
    try {
        Workout.deleteOneWorkout(workoutId);
    } catch (error) {
        console.log(`A exception occurred ${error}`);

        throw error;
    }
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};
