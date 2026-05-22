package com.fitcore;


public class PremiumMember extends Member {

    public PremiumMember(String id, String name, String joinDate) {
        super(id, name, joinDate);
    }

    // Dynamic Polymorphic Method Overriding
    @Override
    public double getDiscountPercentage() {
        return 10.0; // Premium members receive a 10% loyalty discount
    }
}
