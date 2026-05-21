package workout.model;

public class WorkoutPlan extends ExerciseProgram {
    private String planId;
    private int durationMinutes;
    private String fitnessGoal;

    public WorkoutPlan(String planId, String programName, int durationMinutes, String fitnessGoal) {
        super(programName);
        this.planId = planId;
        this.durationMinutes = durationMinutes;
        this.fitnessGoal = fitnessGoal;
    }

    public String getPlanId() { return planId; }
    public void setPlanId(String planId) { this.planId = planId; }

    public int getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(int durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getFitnessGoal() { return fitnessGoal; }
    public void setFitnessGoal(String fitnessGoal) { this.fitnessGoal = fitnessGoal; }

    @Override
    public double calculateCaloriesBurned() {
        return durationMinutes * 5.0;
    }
}
