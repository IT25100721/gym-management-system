package com.fitcore.attendance;

public abstract class Member {
    private String name; //

    public Member(String name) { this.name = name; }

    public String getName() { return name; }


    public abstract String getMemberType();
    public abstract double calculateDiscount();
}