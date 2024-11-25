export interface User {
  _id: string;
  hostId: string;
  fName: string;
  lName: string;
  phoneNumber: string;
  address: string;
  accountStatus: string;
  activate: string;
  adminApproval: {
    status: string;
  };
  approvalEligible: string;
  approvalEligibleDate: string;
  dob: string;
  driversLicenseNumber: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  numberOfStrikes: number;
  driverRating: number;
  profilePicture: {
    fileName: string;
    folder: string;
    url: string;
  };
  driversLicenseImage: {
    fileName: string;
    folder: string;
    url: string;
  };
  token: string;
}

export interface AuthState {
  user: User | null;
//   token: string | null;
  isAuthenticated: boolean;
} 