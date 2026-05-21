package com.gym.model;

public class Trainer {
    // private class
    private int id;
    private String name;
    private String email;
    private String phone;
    private String specialization;
    private double salary;

    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }
}