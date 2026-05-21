package com.fitcore.workout.service;

import com.fitcore.workout.model.WorkoutPlan;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class WorkoutService {
    private static final String FILE_NAME = "workout_plans.txt";
    private List<WorkoutPlan> workoutPlans;

    public WorkoutService() {
        this.workoutPlans = new ArrayList<>();
        loadFromFile(); //
    }

    // 1. Create - Add a New workout Plan
    public void addWorkoutPlan(WorkoutPlan plan) {
        workoutPlans.add(plan);
        saveToFile();
    }

    // 2. Read - Take all Workout Plans
    public List<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlans;
    }

    // 3. File Handling - save the ala the Files  (Write)
    private void saveToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
            for (WorkoutPlan plan : workoutPlans) {
                //  (CSV format)
                String dataLine = plan.getPlanId() + "," +
                        plan.getProgramName() + "," +
                        plan.getDurationMinutes() + "," +
                        plan.getFitnessGoal();
                writer.write(dataLine);
                writer.newLine();
            }
        } catch (IOException e) {
            System.err.println("Error saving to file: " + e.getMessage());
        }
    }

    // 4. File Handling - Read the data files
    private void loadFromFile() {
        File file = new File(FILE_NAME);
        if (!file.exists()) return;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 4) {
                    WorkoutPlan plan = new WorkoutPlan(parts[0], parts[1], Integer.parseInt(parts[2]), parts[3]);
                    workoutPlans.add(plan);
                }
            }
        } catch (IOException e) {
            System.err.println("Error loading from file: " + e.getMessage());
        }
    }
}
