package workout.model;

public class CardioWorkout extends WorkoutPlan {
    private int intensityLevel;

    public CardioWorkout(String planId, String programName, int duration, String goal, int intensity) {
        super(planId, programName, duration, goal);
        this.intensityLevel = intensity;
    }

    public int getIntensityLevel() { return intensityLevel; }
    public void setIntensityLevel(int intensityLevel) { this.intensityLevel = intensityLevel; }

    @Override
    public double calculateCaloriesBurned() {
        return getDurationMinutes() * 12.0;
    }
}