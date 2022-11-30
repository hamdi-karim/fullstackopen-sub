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
    console.log(bmiCalculator(185, 150));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}