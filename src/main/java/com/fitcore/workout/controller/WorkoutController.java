package com.fitcore.workout.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.fitcore.workout.model.WorkoutPlan;
import com.fitcore.workout.service.WorkoutService;

@Controller
@RequestMapping("/workout")
public class WorkoutController {

    private final WorkoutService workoutService = new WorkoutService();

    // 1. Showing Workout list (Read)
    @GetMapping("/list")
    public String viewWorkoutPlans(Model model) {
        model.addAttribute("plans", workoutService.getAllWorkoutPlans());
        return "workout-list"; // We need to create HTML this name
    }

    // 2. Add new  Workout to Form
    @GetMapping("/add")
    public String showAddForm(){
        return "add-workout"; // we need to Create HTML this name
    }

    // 3. Save the data from form (Create)
    @PostMapping("/save")
    public String saveWorkout(@RequestParam String planId,
                              @RequestParam String programName,
                              @RequestParam int duration,
                              @RequestParam String goal) {

        WorkoutPlan newPlan = new WorkoutPlan(planId, programName, duration, goal);
        workoutService.addWorkoutPlan(newPlan);

        return "redirect:/workout/list";
    }
    // 4. Delete request handle
    @GetMapping("/delete/{id}")
    public String deleteWorkout(@PathVariable String id) {
        workoutService.deleteWorkoutPlan(id);
        return "redirect:/workout/list";
    }

    // 5. shows Edit page
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable String id, Model model) {
        WorkoutPlan plan = workoutService.getPlanById(id);
        model.addAttribute("plan", plan);
        return "edit-workout"; // අපි මේ HTML එක හදන්න ඕනේ
    }
}
