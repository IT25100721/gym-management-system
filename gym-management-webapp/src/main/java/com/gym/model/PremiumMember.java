package com.gym.model;

public class PremiumMember extends Member {
    private String premiumBenefits = "Personal Trainer + Sauna + Protein Bar"; //Output premiumBenefits

    public String getPremiumBenefits() { return premiumBenefits; }
    public void setPremiumBenefits(String premiumBenefits) { this.premiumBenefits = premiumBenefits; }
}