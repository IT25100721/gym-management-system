package com.fitcore.attendance;
import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class AttendanceRecord {
    private Member member;
    private String date;
    private String checkInTime;
    private String checkOutTime;

    public AttendanceRecord(Member member, String date, String checkInTime, String checkOutTime) {
        this.member = member;
        this.date = date;
        this.checkInTime = (checkInTime == null || checkInTime.isEmpty()) ? "00:00" : checkInTime;
        this.checkOutTime = (checkOutTime == null || checkOutTime.isEmpty()) ? "00:00" : checkOutTime;
    }

    public Member getMember() { return member; }
    public String getDate() { return date; }
    public String getCheckInTime() { return checkInTime; }
    public String getCheckOutTime() { return checkOutTime; }
    public void setCheckOutTime(String checkOutTime) { this.checkOutTime = checkOutTime; }

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
            return "Pending"; // It shows "pending". without crashing :)
        }
    }
}