package com.gym.model;

public abstract class Member {
//encapsulation using private
    private int id;
    private String name;
    private String email;
    private String phone;
    private String memberType;
    private String membershipStartDate;
    private String membershipEndDate;

    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getMemberType() { return memberType; }
    public void setMemberType(String memberType) { this.memberType = memberType; }
    public String getMembershipStartDate() { return membershipStartDate; }
    public void setMembershipStartDate(String startDate) { this.membershipStartDate = startDate; }
    public String getMembershipEndDate() { return membershipEndDate; }
    public void setMembershipEndDate(String endDate) { this.membershipEndDate = endDate; }
}