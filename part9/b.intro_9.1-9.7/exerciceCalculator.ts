type Rating = 1 | 2 | 3;

interface ExerciseArguments {
    target: number;
    exerciseHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
    if (args.length < 4) throw new Error("Not enough arguments");
  
    const exerciseValues = args.slice(2);
  
    const notValid = exerciseValues.some((arg) => isNaN(Number(arg)));
  
    const validArgs = exerciseValues.map((arg) =>
      !isNaN(Number(arg)) ? Number(arg) : null
    );
  
    const target = validArgs.shift();
  
    const exerciseHours = validArgs;
  
    if (!notValid) {
      return {
        exerciseHours,
        target,
      };
    } else {
      throw new Error("Provided values were not numbers!");
    }
  };
interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (dailyExercices: Array<number>, targetHours: number): Result => {
    let sumTrainingHours: number = 0;

    let result: Result = {
        periodLength: dailyExercices.length,
        trainingDays: 0,
        success: false, 
        rating: 1,
        ratingDescription: '',
        target: targetHours,
        average: 0 
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
        result.ratingDescription = 'Congratulatins 🎉 Target reached!';
    }
    return result;
}

try {
    const { exerciseHours, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}