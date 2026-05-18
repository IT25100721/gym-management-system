package Java;

public class Member implements display, database {
    //encapsulation by using protected
    protected String memberId;
    protected String name;
    protected String email;
    protected String phone;
    protected String gender;
    protected String bmiCategory;
    protected String membershipType;
    protected String registrationDate;
    protected String workoutPlan;
    protected int age;
    protected double heightCm;
    protected double weightCm;
    protected double bmi;
    protected double weightKg;

    public Member() {
    }

    public Member(String memberId, String name, String email, String phone, String gender, String bmiCategory, String membershipType, String registrationDate, String workoutPlan, int age, double heightCm, double weightKg, double bmi) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.bmiCategory = bmiCategory;
        this.membershipType = membershipType;
        this.registrationDate = registrationDate;
        this.workoutPlan = workoutPlan;
        this.age = age;
        this.heightCm = heightCm;
        this.weightKg = weightKg;
        this.bmi = bmi;
    }

    public void setWeightKg(double weightKg) { this.weightKg = weightKg; }
    public double getWeightKg() { return weightKg; }

    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBmiCategory() { return bmiCategory; }
    public void setBmiCategory(String bmiCategory) { this.bmiCategory = bmiCategory; }

    public String getMembershipType() { return membershipType; }
    public void setMembershipType(String membershipType) { this.membershipType = membershipType; }

    public String getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(String registrationDate) { this.registrationDate = registrationDate; }

    public String getWorkoutPlan() { return workoutPlan; }
    public void setWorkoutPlan(String workoutPlan) { this.workoutPlan = workoutPlan; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public double getHeightCm() { return heightCm; }
    public void setHeightCm(double heightCm) { this.heightCm = heightCm; }

    public double getWeightCm() { return weightCm; }
    public void setWeightCm(double weightCm) { this.weightCm = weightCm; }

    public double getBmi() { return bmi; }
    public void setBmi(double bmi) { this.bmi = bmi; }

    @Override
    public String displayDetails() {
        return "ID: " + memberId + " \n Name: " + name + " \n " + " \n Type : " + membershipType;
    }

    @Override
    public String toFileString() {
        return memberId + "|" + name + "|" + email + "|" + phone + "|"
                + age + "|" + gender + "|" + heightCm + "|" + weightKg + "|"
                + bmi + "|" + bmiCategory + "|" + workoutPlan + "|"
                + membershipType + "|" + registrationDate;
    }
}
