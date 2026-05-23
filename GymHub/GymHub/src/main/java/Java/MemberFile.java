package Java;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class MemberFile {

    private static final String FILE_PATH = "C:\\Users\\user\\Desktop\\Java final\\GymHub\\data\\members.txt";

    public Member[] readAllMembers() {
        int n = countLines();
        if (n == 0) return new Member[0];

        Member[] members = new Member[n];
        int index = 0;

        try {
            BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH));
            String line;
            while ((line = reader.readLine()) != null) {
                if (!line.trim().isEmpty()) {
                    members[index] = parseFromLine(line);
                    index++;
                }
            }
            reader.close();
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
        return members;
    }

    public void writeAllMembers(Member[] members) {
        try {
            new File("data").mkdirs();
            BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH, false));
            for (int i = 0; i < members.length; i++) {
                if (members[i] != null) {
                    writer.write(members[i].toFileString());
                    writer.newLine();
                }
            }
            writer.close();
        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
    }

    public void appendMember(Member m) {
        try {
            new File("data").mkdirs();
            BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH, true));
            writer.write(m.toFileString());
            writer.newLine();
            writer.close();
        } catch (IOException e) {
            System.out.println("Error appending: " + e.getMessage());
        }
    }

    private int countLines() {
        int count = 0;
        try {
            BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH));
            String line;
            while ((line = reader.readLine()) != null) {
                if (!line.trim().isEmpty()) count++;
            }
            reader.close();
        } catch (FileNotFoundException e) {
            return 0;
        } catch (IOException e) {
            System.out.println("Error counting lines");
        }
        return count;
    }

    private Member parseFromLine(String line) {
        String[] parts = line.split("\\|");
        String membershipType = parts[11];

        Member member;
        if (membershipType.equals("Silver")) {
            member = new SilverMember();
        } else if (membershipType.equals("Gold")) {
            member = new GoldMember();
        } else if (membershipType.equals("Platinum")) {
            member = new PlatinumMember();
        } else {
            member = new SilverMember();
        }

        member.setMemberId(parts[0]);
        member.setName(parts[1]);
        member.setEmail(parts[2]);
        member.setPhone(parts[3]);
        member.setAge(Integer.parseInt(parts[4]));
        member.setGender(parts[5]);
        member.setHeightCm(Double.parseDouble(parts[6]));
        member.setWeightKg(Double.parseDouble(parts[7]));
        member.setBmi(Double.parseDouble(parts[8]));
        member.setBmiCategory(parts[9]);
        member.setWorkoutPlan(parts[10]);
        member.setMembershipType(parts[11]);
        member.setRegistrationDate(parts[12]);

        return member;
    }
}
