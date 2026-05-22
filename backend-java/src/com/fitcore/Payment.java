package com.fitcore;

import java.time.LocalDate;


public class Payment {
    private String invoiceId;
    private Member member;
    private double baseAmount;
    private double finalAmount;
    private String type; // Card or Cash
    private String status;
    private String date;

    public Payment(String invoiceId, Member member, double baseAmount, String type, String status) {
        this.invoiceId = invoiceId;
        this.member = member;
        this.baseAmount = baseAmount;
        this.type = type;
        this.status = status;
        this.date = LocalDate.now().toString();

        // Dynamically compute polymorphic discount from Member type
        double discountRate = member.getDiscountPercentage();
        this.finalAmount = baseAmount - (baseAmount * discountRate / 100);
    }

    // Getters and helper for serialisation row
    public String getInvoiceId() { return invoiceId; }
    public Member getMember() { return member; }
    public double getBaseAmount() { return baseAmount; }
    public double getFinalAmount() { return finalAmount; }
    public String getType() { return type; }
    public String getStatus() { return status; }
    public String getDate() { return date; }

    public String toFileRowString() {
        // Standardised format for database text lines: InvoiceID, MemberID, FinalAmount, Type, Discount%, Status, Date
        return String.format("%s,%s,%.2f,%s,%.1f,%s,%s", 
            invoiceId, member.getId(), finalAmount, type, member.getDiscountPercentage(), status, date);
    }
}
