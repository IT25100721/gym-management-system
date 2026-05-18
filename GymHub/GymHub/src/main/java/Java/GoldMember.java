package Java;

public class GoldMember extends Member implements MembershipBenifits {
    public GoldMember() {
        super();
        this.membershipType = "Gold";
    }

    public GoldMember(String memberId, String name, String email, String phone, String gender, String bmiCategory, String membershipType, String registrationDate, String workoutPlan, int age, double heightCm, double weightCm, double bmi) {
        super(memberId, name, email, phone, gender, bmiCategory, membershipType, registrationDate, workoutPlan, age, heightCm, weightCm, bmi);
    }

    @Override
    public int SupplementScoops() {
        return 5;
    }

    @Override
    public String AdditionalBenifits() {
        return "All Silver , Sauna , Monthly Diet plan ";
    }

    @Override
    public double MonthlyFee() {
        return 5000;
    }

    @Override
    public String displayDetails() {
        return super.displayDetails() + "\n Fee : " + MonthlyFee() + " \n Scoops: " + SupplementScoops();
    }
}
