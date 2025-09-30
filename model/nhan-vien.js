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
        this.rank = "";

    };
    tinhTongLuong() {
        switch (this.jobTitle.toLowerCase()) {
            case "giám đốc":
                this.totalSalary = this.salary * 3;
                break;
            case "trưởng phòng":
                this.totalSalary = this.salary * 2;
                break;
            case "nhân viên":
                this.totalSalary = this.salary;
                break;
            default:
                this.totalSalary = this.salary; // Mặc định nếu chức vụ không khớp
        }
    }


    xepLoaiRank() {
        if (this.workHours >= 192) {
            this.rank = "Nhân viên xuất sắc";
        }
        else if (this.workHours >= 176) {
            this.rank = "Nhân viên giỏi";
        }
        else if (this.workHours >= 160) {
            this.rank = "Nhân viên khá";
        }
        else {
            this.rank = "Nhân viên trung bình";
        }
    }



}

export default NhanVien;