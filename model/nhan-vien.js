class NhanVien {
    constructor(id, name, email, password, startDay, salary, jobTitle, workHours) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.startDay = startDay;
        this.salary = salary;
        this.jobTitle = jobTitle;
        this.workHours = workHours;
        this.totalSalary = 0;

    };
}

export default NhanVien;