package Java;

public class SilverMember extends Member implements MembershipBenifits {
    public SilverMember() {
        super();
        this.membershipType = "Silver";
    }

    public SilverMember(String memberId, String name, String email, String phone, String gender, String bmiCategory, String membershipType, String registrationDate, String workoutPlan, int age, double heightCm, double weightCm, double bmi) {
        super(memberId, name, email, phone, gender, bmiCategory, membershipType, registrationDate, workoutPlan, age, heightCm, weightCm, bmi);
    }

    @Override
    public int SupplementScoops() {
        return 2;
    }

    @Override
    public String AdditionalBenifits() {
        return "Basic Workout Plan , Locker Access";
    }

    @Override
    public double MonthlyFee() {
        return 2500;
    }

    @Override
    public String displayDetails() {
        return super.displayDetails() + "\n Fee : " + MonthlyFee() + " \n Scoops: " + SupplementScoops();
    }
}
