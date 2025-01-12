export type Activity = {
  id: number;
  name: string;
};

export type Coverage = {
  medicine: number;
  accident: number;
  covid: number;
  evacuation: number;
  transportation: number;
  compensation: number;
};

export type Program = {
  id: number;
  name: string;
  liability: number | null;
  coverages: Coverage | null;
  description?: string;
};

export type Country = {
  id: number;
  name: string;
  isInSchengen: number;
  programs: Program[];
};

export type FormData = {
  countryId: Country['id'] | null;
  tripType: 'single' | 'multiple';
  startDate: {
    day: number;
    month: number;
    year: number;
  };
  endDate: {
    day: number;
    month: number;
    year: number;
  };
  activitieId: Activity['id'];
  phoneNumber: {
    countryCode: string | null;
    phoneNumber: string | null;
  };
  programId: Program['id'] | null;
};
