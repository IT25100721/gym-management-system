package workout.model;

public class StrengthWorkout extends WorkoutPlan {
    private int numberOfSets;

    public StrengthWorkout(String planId, String programName, int duration, String goal, int sets) {
        super(planId, programName, duration, goal);
        this.numberOfSets = sets;
    }

    public int getNumberOfSets() { return numberOfSets; }
    public void setNumberOfSets(int numberOfSets) { this.numberOfSets = numberOfSets; }

    @Override
    public double calculateCaloriesBurned() {
        return getDurationMinutes() * 8.5;
    }
}