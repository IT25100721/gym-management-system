package Java;

abstract public class BMI {

    public static double calBMI(double weightKg, double heightCm) {
        double heightM = heightCm / 100;
        double bmi = weightKg / (heightM * heightM);
        return bmi;
    }

    public static String Category(double bmi) {
        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi < 25.0) {
            return "Normal";
        } else if (bmi < 30.0) {
            return "Overweight";
        } else {
            return "Obese";
        }
    }
}
