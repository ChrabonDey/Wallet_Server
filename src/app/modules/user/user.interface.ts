export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
  AGENT = "AGENT"
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED"
}

export enum IsAgent {
  Pending = 'pending',
  Approved = 'approved',
  Suspended = 'suspended'
}

export interface IAuthProvider {
  provider: "credentials" | "google";
  providerId: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: IsActive;
  isVerified?: string;
  auths: IAuthProvider[];
  role: ROLE;
  agentApprovalStatus?: IsAgent;
  commissionRate?: number;
}
