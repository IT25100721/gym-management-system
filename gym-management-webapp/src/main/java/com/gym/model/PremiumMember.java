package com.gym.model;

public class PremiumMember extends Member {
//Output premiumBenefits
    private String premiumBenefits = "Personal Trainer + Sauna + Protein Bar"; 

    public String getPremiumBenefits() { return premiumBenefits; }
    public void setPremiumBenefits(String premiumBenefits) { this.premiumBenefits = premiumBenefits; }
}