package com.fitcore.attendance;
import java.util.ArrayList;
import java.io.*;

public class AttendanceManager {
    // We are putting this back because IntelliJ probably removed it!
    private ArrayList<AttendanceRecord> attendanceList = new ArrayList<>();
    private final String fileName = "attendance.txt";

    public AttendanceManager() { loadFromFile(); }

    public void addRecord(AttendanceRecord record) {
	// Defensive check: Ensure member object exists before processing
	if (record.getMember() == null) return;

        if (record != null && record.getMember() != null) {
            attendanceList.add(record);
            saveToFile();
        }
    }

    public void updateCheckOut(String name, String newTime) {
        for (AttendanceRecord r : attendanceList) {
            if (r.getMember().getName().equalsIgnoreCase(name)) {
                r.setCheckOutTime(newTime);
                break;
            }
        }
        saveToFile();
    }

    public void deleteRecord(String name) {
        attendanceList.removeIf(r -> r.getMember().getName().equalsIgnoreCase(name));
        saveToFile();
    }

    public ArrayList<AttendanceRecord> getAllRecords() {
        return attendanceList; }

    public void saveToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) {
            for (AttendanceRecord r : attendanceList) {
                String type = r.getMember().getMemberType();
                String name = r.getMember().getName();
                writer.write(type + "," + name + "," + r.getDate() + "," + r.getCheckInTime() + "," + r.getCheckOutTime());
                writer.newLine();
            }
        } catch (IOException e) { e.printStackTrace(); }
    }

    public void loadFromFile() {
        attendanceList.clear();
        File file = new File(fileName);
        if (!file.exists()) return;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                String[] p = line.split(",");
                if (p.length == 5) {
                    Member m = p[0].equalsIgnoreCase("Student") ? new StudentMember(p[1]) : new StaffMember(p[1]);
                    attendanceList.add(new AttendanceRecord(m, p[2], p[3], p[4]));
                }
            }
        } catch (IOException e) { e.printStackTrace(); }
    }
}