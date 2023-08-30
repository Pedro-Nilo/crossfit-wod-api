const DB = require("./db.json");
const { saveToDatabase } = require("./utils");
const { CrudError } = require('./../errors/crudError');

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: Tommy V  
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
const getAllWorkouts = (filterParams) => {
    try {
        let workouts =  DB.workouts;
        
        if (filterParams.mode) {
            workouts = workouts.filter((workout) => 
                workout.mode.toLowerCase().includes(filterParams.mode)
            );
        }

        if (filterParams.equipment) {
            workouts = workouts.filter((workout) => 
                workout.equipment.includes(filterParams.equipment)
            );
        }        

        if (filterParams.length && filterParams.length >= 0) {
            workouts = workouts.slice(0, filterParams.length);
        }

        return workouts;
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
