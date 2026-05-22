package com.fitcore;

import java.io.*;
import java.util.ArrayList;


public class PaymentController {
    private final String filename;
    private ArrayList<Payment> payments;

    public PaymentController(String filename) {
        this.filename = filename;
        this.payments = new ArrayList<>();
    }

    // File Read Handling
    public void loadPayments(ArrayList<Member> members) throws IOException {
        payments.clear();
        File file = new File(filename);
        if (!file.exists()) {
            file.createNewFile();
            return;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length < 7) continue;

                String invoiceId = parts[0];
                String memberId = parts[1];
                double amount = Double.parseDouble(parts[2]);
                String type = parts[3];
                String status = parts[5];
                String date = parts[6];

                // Associate with existing Member instance (Aggregation matching)
                Member matchingMember = null;
                for (Member m : members) {
                    if (m.getId().equals(memberId)) {
                        matchingMember = m;
                        break;
                    }
                }

                if (matchingMember != null) {
                    Payment payment = new Payment(invoiceId, matchingMember, amount, type, status);
                    payments.add(payment);
                }
            }
        }
    }

    // File Write Operation (Add item / CREATE)
    public void savePayment(Payment payment) throws IOException, PaymentException {
        // Business logic validation matching lecture rubrics
        if (payment.getBaseAmount() <= 0) {
            throw new PaymentException("Transaction denied: Base amount must be positive.");
        }

        payments.add(payment);
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename, true))) {
            writer.write(payment.toFileRowString());
            writer.newLine();
        }
    }

    // DELETE transaction from flat database
    public boolean deletePayment(String invoiceId) throws IOException {
        boolean removed = false;
        ArrayList<String> fileLines = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length > 0 && parts[0].equals(invoiceId)) {
                    removed = true;
                    continue; // Skip this line (deleting it)
                }
                fileLines.add(line);
            }
        }

        // Rewrite entire file minus the deleted record
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (String line : fileLines) {
                writer.write(line);
                writer.newLine();
            }
        }

        return removed;
    }

    public ArrayList<Payment> getPayments() {
        return payments;
    }
}
