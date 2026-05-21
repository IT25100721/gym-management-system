package workout.model;

import java.io.Serializable;

public abstract class ExerciseProgram implements Serializable {
    private String programName;

    public ExerciseProgram(String programName) {
        this.programName = programName;
    }

    public String getProgramName() { return programName; }
    public void setProgramName(String programName) { this.programName = programName; }

    public abstract double calculateCaloriesBurned();
}
