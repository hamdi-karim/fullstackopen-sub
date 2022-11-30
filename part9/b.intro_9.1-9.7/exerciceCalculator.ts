type Rating = 1 | 2 | 3;

interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (dailyExercices: Array<number>, targetHours: number) => {
    let sumTrainingHours: number = 0;

    let result: Result = {
        periodLength: dailyExercices.length,
        trainingDays: 0,
        success: null, 
        rating: null,
        ratingDescription: null,
        target: targetHours,
        average: null 
    };

    for (let index: number = 0; index < result.periodLength; index++) {
        if (dailyExercices[index] > 0) {
            result.trainingDays++;
            sumTrainingHours += dailyExercices[index];
        }
    }
    result.average = sumTrainingHours / result.periodLength
    result.success = result.average >= result.target ? true : false;

    const workingHoursPercentage : number = (result.average / result.target) * 100;
    if (workingHoursPercentage < 70) {
        result.rating = 1;
        result.ratingDescription = 'Your work could be improved';
    } else if (workingHoursPercentage < 100) {
        result.rating = 2;
        result.ratingDescription = 'Good Work. Stay consistent!';
    } else {
        result.rating = 3;
        result.ratingDescription = 'Congratulatins, target reached!';
    }
    return result;
}

try {
    console.log(calculateExercises([3, 0, 2, 1.5, 0, 3, 1], 2));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}