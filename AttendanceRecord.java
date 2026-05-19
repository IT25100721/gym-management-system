package com.fitcore.attendance;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class AttendanceRecord {
    // Encapsulation: Private attributes
    private String memberName;
    private String date;
    private String checkInTime;
    private String checkOutTime;

    // Default Constructor
    public AttendanceRecord() {}

    // Parameterized Constructor
    public AttendanceRecord(String memberName, String date, String checkInTime, String checkOutTime) {
        this.memberName = memberName;
        this.date = date;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
    }

    // Getters and Setters
    public String getMemberName() { return memberName; }
    public void setMemberName(String memberName) { this.memberName = memberName; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getCheckInTime() { return checkInTime; }
    public void setCheckInTime(String checkInTime) { this.checkInTime = checkInTime; }

    public String getCheckOutTime() { return checkOutTime; }
    public void setCheckOutTime(String checkOutTime) { this.checkOutTime = checkOutTime; }

    // Logic to calculate duration for the UI
    public String getDuration() {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
            LocalTime start = LocalTime.parse(this.checkInTime, formatter);
            LocalTime end = LocalTime.parse(this.checkOutTime, formatter);
            Duration duration = Duration.between(start, end);

            long hours = duration.toHours();
            long minutes = duration.toMinutesPart();
            return hours + "h " + minutes + "m";
        } catch (Exception e) {
            return "N/A"; // Exception Handling
        }
    }
}
