package com.fitcore;

import java.io.IOException;
import java.util.ArrayList;


public class Main {
    public static void main(String[] args) {
        System.out.println("=== FitCore Persistence & Calculation Runner ===");

        // Setup members (polymorphic list setup)
        ArrayList<Member> members = new ArrayList<>();
        members.add(new PremiumMember("M001", "Kasun Silva", "2024-01-15"));
        members.add(new NewMember("M002", "Nimal Perera", "2025-02-01"));

        // Initialize Controller
        PaymentController controller = new PaymentController("payments.txt");

        try {
            // Load preexisting records
            controller.loadPayments(members);
            System.out.println("Payments file database synchronized.");

            // Create and process new payment
            Member activeMember = members.get(0); // Premium member
            Payment p = new Payment("INV-100", activeMember, 5000.0, "Card", "Paid");

            System.out.println("Processing receipt: " + p.getInvoiceId() + " for " + activeMember.getName());
            System.out.println("Base Fee: 5000.00 LKR");
            System.out.println("Final amount calculated: " + p.getFinalAmount() + " LKR (" + activeMember.getDiscountPercentage() + "% Loyalty applied Polymorphically)");

            controller.savePayment(p);
            System.out.println("Record successfully printed to flat database file: payments.txt!");

        } catch (PaymentException e) {
            System.err.println("OOP Logic Exception: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("File read/write system error: " + e.getMessage());
        }
    }
}
