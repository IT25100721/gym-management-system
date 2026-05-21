

// 1. Encapsulation: Use private fields and public getters/setters.
// 2. Abstraction: Abstract base class for all members./**

export abstract class Member {
  private id: string;
  private name: string;
  private joinDate: string;

  constructor(id: string, name: string, joinDate: string) {
    this.id = id;
    this.name = name;
    this.joinDate = joinDate;
  }

  // Getters and Setters (Encapsulation)
  public get id(): string { return this.id; }
  public get name(): string { return this.name; }
  public get joinDate(): string { return this.joinDate; }

  // 3. Polymorphism: Abstract method to get discount percentage.
  public abstract getDiscountPercentage(): number;
}

// 4. Inheritance: Specific member types.
export class PremiumMember extends Member {
  constructor(id: string, name: string, joinDate: string) {
    super(id, name, joinDate);
  }

  // Overriding parent's abstract method (Polymorphism)
  public getDiscountPercentage(): number {
    return 10; // 10% discount for premium members
  }
}

export class NewMember extends Member {
  constructor(id: string, name: string, joinDate: string) {
    super(id, name, joinDate);
  }

  public getDiscountPercentage(): number {
    return 0; // No discount for new members
  }
}

export class Trainer {
  private id: string;
  private name: string;
  private specialization: string;

  constructor(id: string, name: string, specialization: string) {
    this.id = id;
    this.name = name;
    this.specialization = specialization;
  }

  public get id(): string { return this.id; }
  public get name(): string { return this.name; }
  public get specialization(): string { return this.specialization; }
}

export class Payment {
  private invoiceId: string;
  private member: Member;
  private amount: number;
  private type: "Card" | "Cash";
  private date: string;
  private status: "Paid" | "Pending";

  constructor(invoiceId: string, member: Member, baseAmount: number, type: "Card" | "Cash", status: "Paid" | "Pending" = "Paid") {
    this.invoiceId = invoiceId;
    this.member = member;
    this.type = type;
    this.status = status;
    this.date = new Date().toISOString().split('T')[0];

    // Calculate dynamic discount based on member type (Polymorphism in action)
    const discountPercent = member.getDiscountPercentage();
    this.amount = baseAmount - (baseAmount * discountPercent / 100);
  }

  public get details() {
    return {
      invoice: this.invoiceId,
      member: this.member.name,
      amount: this.amount,
      type: this.type,
      discount: this.member.getDiscountPercentage(),
      status: this.status,
      date: this.date
    };
  }
}
