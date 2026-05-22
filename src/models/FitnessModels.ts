/**
 * This structure reflects the OOP concepts from your course.
 * You can translate these classes to Java in IntelliJ IDEA.
 */

// 1. Encapsulation: Use private fields and public getters/setters.
// 2. Abstraction: Abstract base class for all members.
export abstract class Member {
  private _id: string;
  private _name: string;
  private _joinDate: string;

  constructor(id: string, name: string, joinDate: string) {
    this._id = id;
    this._name = name;
    this._joinDate = joinDate;
  }

  // Getters and Setters (Encapsulation)
  public get id(): string { return this._id; }
  public get name(): string { return this._name; }
  public get joinDate(): string { return this._joinDate; }

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
  private _id: string;
  private _name: string;
  private _specialization: string;

  constructor(id: string, name: string, specialization: string) {
    this._id = id;
    this._name = name;
    this._specialization = specialization;
  }

  public get id(): string { return this._id; }
  public get name(): string { return this._name; }
  public get specialization(): string { return this._specialization; }
}

export class Payment {
  private _invoiceId: string;
  private _member: Member;
  private _amount: number;
  private _type: "Card" | "Cash";
  private _date: string;
  private _status: "Paid" | "Pending";

  constructor(invoiceId: string, member: Member, baseAmount: number, type: "Card" | "Cash", status: "Paid" | "Pending" = "Paid") {
    this._invoiceId = invoiceId;
    this._member = member;
    this._type = type;
    this._status = status;
    this._date = new Date().toISOString().split('T')[0];

    // Calculate dynamic discount based on member type (Polymorphism in action)
    const discountPercent = member.getDiscountPercentage();
    this._amount = baseAmount - (baseAmount * discountPercent / 100);
  }

  public get details() {
    return {
      invoice: this._invoiceId,
      member: this._member.name,
      amount: this._amount,
      type: this._type,
      discount: this._member.getDiscountPercentage(),
      status: this._status,
      date: this._date
    };
  }
}
