package com.fitcore;


public abstract class Member {
    private String id;
    private String name;
    private String joinDate;

    // Parameterized Constructor
    public Member(String id, String name, String joinDate) {
        this.id = id;
        this.name = name;
        this.joinDate = joinDate;
    }

    // Getters and Setters promoting information security
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getJoinDate() { return joinDate; }
    public void setJoinDate(String joinDate) { this.joinDate = joinDate; }

    // Polymorphic Abstract Method (Lecture 4 & 5)
    public abstract double getDiscountPercentage();
}
