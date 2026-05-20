package com.fitcore.attendance;

public class StudentMember extends Member {
    public StudentMember(String name) {
        super(name);
    }

    @Override
    public String getMemberType() {
        return "Student";
    }

    @Override
    public double calculateDiscount() {
        return 0.20; // 20% discount for students
    }
}