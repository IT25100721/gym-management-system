package com.fitcore.attendance;

public class StaffMember extends Member {
    public StaffMember(String name) {
        super(name);
    }

    @Override
    public String getMemberType() {
        return "Staff";
    }

    @Override
    public double calculateDiscount() {
        return 0.05; // 5% discount for staff
    }
}