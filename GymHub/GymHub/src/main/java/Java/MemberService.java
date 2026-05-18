package Java;

import java.time.LocalDate;

public class MemberService {

    private MemberFile fileHandler = new MemberFile();

    // CREATE
    public boolean registerMember(String name, String email, String phone,
                                  int age, String gender,
                                  double heightCm, double weightKg,
                                  String membershipType) {

        if (!isEmailUnique(email)) return false;

        double bmi = BMI.calBMI(weightKg, heightCm);
        bmi = Math.round(bmi * 100.0) / 100.0;
        String category = BMI.Category(bmi);
        String plan = recommendWorkout(category);
        String newId = generateId();
        String today = LocalDate.now().toString();

        Member member;
        if (membershipType.equals("Silver")) {
            member = new SilverMember(newId, name, email, phone, gender,
                    category, "Silver", today, plan,
                    age, heightCm, weightKg, bmi);
        } else if (membershipType.equals("Gold")) {
            member = new GoldMember(newId, name, email, phone, gender,
                    category, "Gold", today, plan,
                    age, heightCm, weightKg, bmi);
        } else if (membershipType.equals("Platinum")) {
            member = new PlatinumMember(newId, name, email, phone, gender,
                    category, "Platinum", today, plan,
                    age, heightCm, weightKg, bmi);
        } else {
            return false;
        }

        fileHandler.appendMember(member);
        return true;
    }

    // READ all
    public Member[] getAllMembers() {
        return fileHandler.readAllMembers();
    }

    // READ one
    public Member getMemberById(String id) {
        Member[] members = fileHandler.readAllMembers();
        for (int i = 0; i < members.length; i++) {
            if (members[i].getMemberId().equals(id)) return members[i];
        }
        return null;
    }

    // UPDATE
    public boolean updateMember(String id, String name, String email, String phone,
                                int age, String gender, double heightCm, double weightKg,
                                String membershipType) {

        Member[] members = fileHandler.readAllMembers();
        int foundIndex = -1;

        for (int i = 0; i < members.length; i++) {
            if (members[i].getMemberId().equals(id)) {
                foundIndex = i;
                break;
            }
        }

        if (foundIndex == -1) return false;

        // Recalculate BMI
        double bmi = BMI.calBMI(weightKg, heightCm);
        bmi = Math.round(bmi * 100.0) / 100.0;
        String category = BMI.Category(bmi);
        String plan = recommendWorkout(category);
        String regDate = members[foundIndex].getRegistrationDate();

        // Create new member (in case tier changed)
        Member updated;
        if (membershipType.equals("Silver")) {
            updated = new SilverMember(id, name, email, phone, gender,
                    category, "Silver", regDate, plan,
                    age, heightCm, weightKg, bmi);
        } else if (membershipType.equals("Gold")) {
            updated = new GoldMember(id, name, email, phone, gender,
                    category, "Gold", regDate, plan,
                    age, heightCm, weightKg, bmi);
        } else if (membershipType.equals("Platinum")) {
            updated = new PlatinumMember(id, name, email, phone, gender,
                    category, "Platinum", regDate, plan,
                    age, heightCm, weightKg, bmi);
        } else {
            return false;
        }

        members[foundIndex] = updated;
        fileHandler.writeAllMembers(members);
        return true;
    }

    // DELETE
    public boolean deleteMember(String id) {
        Member[] members = fileHandler.readAllMembers();

        int deleteIndex = -1;
        for (int i = 0; i < members.length; i++) {
            if (members[i].getMemberId().equals(id)) {
                deleteIndex = i;
                break;
            }
        }

        if (deleteIndex == -1) return false;

        Member[] newMembers = new Member[members.length - 1];
        int j = 0;
        for (int i = 0; i < members.length; i++) {
            if (i != deleteIndex) {
                newMembers[j] = members[i];
                j++;
            }
        }

        fileHandler.writeAllMembers(newMembers);
        return true;
    }

    // Helpers
    private boolean isEmailUnique(String email) {
        Member[] members = fileHandler.readAllMembers();
        for (int i = 0; i < members.length; i++) {
            if (members[i].getEmail().equalsIgnoreCase(email)) return false;
        }
        return true;
    }

    private String generateId() {
        Member[] members = fileHandler.readAllMembers();
        int max = 0;
        for (int i = 0; i < members.length; i++) {
            String idStr = members[i].getMemberId();
            if (idStr != null && idStr.startsWith("MEM")) {
                try {
                    int num = Integer.parseInt(idStr.substring(3));
                    if (num > max) max = num;
                } catch (NumberFormatException ignored) {}
            }
        }
        return String.format("MEM%03d", max + 1);
    }

    private String recommendWorkout(String category) {
        switch (category) {
            case "Underweight":
                return "Weight Gain Plan: Strength training 4x/week, high-protein diet";
            case "Normal":
                return "Maintenance Plan: Cardio 3x/week + strength training 2x/week";
            case "Overweight":
                return "Fat Burn Plan: Cardio 5x/week, calorie deficit diet";
            case "Obese":
                return "Intensive Cardio Plan: Low-impact cardio daily, consult trainer";
            default:
                return "General Fitness Plan";
        }
    }
}
