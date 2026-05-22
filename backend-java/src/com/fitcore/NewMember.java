package com.fitcore;


public class NewMember extends Member {

    public NewMember(String id, String name, String joinDate) {
        // Calling parent general constructor using super() keyword
        super(id, name, joinDate);
    }

    // Overriding abstract method dynamically (Polymorphism)
    @Override
    public double getDiscountPercentage() {
        return 0.0; // 0% discount for regular/new signups
    }
}
