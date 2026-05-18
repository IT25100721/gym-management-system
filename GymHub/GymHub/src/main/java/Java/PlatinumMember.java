package Java;

public class PlatinumMember extends Member implements MembershipBenifits {
    public PlatinumMember() {
        super();
        this.membershipType = "Platinum";
    }

    public PlatinumMember(String memberId, String name, String email, String phone, String gender, String bmiCategory, String membershipType, String registrationDate, String workoutPlan, int age, double heightCm, double weightCm, double bmi) {
        super(memberId, name, email, phone, gender, bmiCategory, membershipType, registrationDate, workoutPlan, age, heightCm, weightCm, bmi);
    }

    @Override
    public int SupplementScoops() {
        return 10;
    }

    @Override
    public String AdditionalBenifits() {
        return "All Gold , Personal Trainer  ";
    }

    @Override
    public double MonthlyFee() {
        return 10000;
    }

    @Override
    public String displayDetails() {
        return super.displayDetails() + "\n Fee : " + MonthlyFee() + " \n Scoops: " + SupplementScoops();
    }
}
