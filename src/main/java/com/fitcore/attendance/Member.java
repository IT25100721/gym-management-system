package com.fitcore.attendance;

/**
 * Abstract class representing a generic gym member.
 * Demonstrates Abstraction and Encapsulation as per Lecture 05.
 */

public abstract class Member {
    private String name; //

    public Member(String name) { this.name = name; }

    public String getName() { return name; }


    public abstract String getMemberType();
    public abstract double calculateDiscount();
}