class NhanVien {
    constructor(id, name, email, password, startDay, baseSalary, jobTitle, workHours) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.startDay = startDay;
        this.baseSalary = baseSalary;
        this.jobTitle = jobTitle;
        this.workHours = workHours;
        this.totalSalary = 0;
        this.rank = "";

    };
    tinhTongLuong() {
        switch (this.jobTitle) {
            case "3":
                this.totalSalary = this.baseSalary * 3;
                break;
            case "2":
                this.totalSalary = this.baseSalary * 2;
                break;
            case "1":
                this.totalSalary = this.baseSalary * 1;
                break;
            default:
                this.totalSalary = this.baseSalary * 1; // Mặc định nếu chức vụ không khớp
        }

    };


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