export type CollegeWithCourses = {
    id: number;
    name: string;
    location: string;
    state: string;
    fees_per_year: number;
    rating: number;
    placement_pct: number;
    overview: string;
    established: number;
    type: string;
    image_url: string | null;
    courses: Course[];
};

export type College = Omit<CollegeWithCourses, "courses">;

export type Course = {
    id: number;
    college_id: number;
    name: string;
    duration_yrs: number;
    fees: number;
};

export type CollegesResponse = {
    data: College[];
    total: number;
    page: number;
    totalPages: number;
};

export type CompareResponse = {
    colleges: CollegeWithCourses[];
};