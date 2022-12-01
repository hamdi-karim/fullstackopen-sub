interface bmiCalculatorArguments {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): bmiCalculatorArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

const bmiCalculator = (height: number, weight: number): string => {
    const heightInMeters: number = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal (healthy weight)';
    } else if (bmi < 18.5) {
        return 'Underweight (nutrition deficiency)'
    } else if (bmi > 24.9) {
        return 'Overweight (health risks)'
    } else {
        throw new Error('BMI Calculator Failed!');
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(bmiCalculator(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}