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
        const salaryMultiplier = {
            "sep": 3,
            "truongphong": 2,
            "nhanvien": 1
        };
        this.totalSalary = this.baseSalary * (salaryMultiplier[this.jobTitle] || 1);
    }


    xepLoaiRank() {
        if (this.workHours >= 192) {
            this.rank = "Xuất sắc";
        }
        else if (this.workHours >= 176) {
            this.rank = "Giỏi";
        }
        else if (this.workHours >= 160) {
            this.rank = "Khá";
        }
        else {
            this.rank = "Trung bình";
        }
    }

}

export default NhanVien;