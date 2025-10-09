import NhanVien from "./../model/nhanVien.js";
import NvManager from "./../model/nhanVienManage.js";
import Validation from "./../model/validation.js";


export const getEleID = (id) => document.getElementById(id);
const validate = new Validation();
const manager = new NvManager();
// clear form
const resetForm = () => {
    getEleID("form-id").reset();
}
// close form
const closeForm = () => {
    getEleID("btnDong").click();
}
/**
 * function getInfoNhanVien từ form nhập liệu
 */
const getInfoNhanVien = (isAdd) => {
    const id = getEleID("tknv").value;
    const name = getEleID("name").value;
    const email = getEleID("email").value;
    const password = getEleID("password").value;
    const startDay = getEleID("datepicker").value;
    const baseSalary = parseFloat(getEleID("luongCB").value);
    const jobTitle = getEleID("chucvu").value;
    const workHours = parseFloat(getEleID("gioLam").value);

    let isValid = true; // flag: boolean
    /**
     * kiểm tra tính hợp lệ -  validation
     */

    // id validation
    if (isAdd) {
        isValid &=
            validate.checkEmpty(id, "tbTKNV", "(*) Vui Lòng nhập ID") &&
            validate.checkExist(id, "tbTKNV", "(*) ID đã tồn tại vui lòng nhập mới", manager.arr) &&
            validate.checkLength(id, "tbTKNV", "(*) ID tối đa 4 - 6 ký số", 1, 6);

    }

    // name validation
    isValid &=
        validate.checkEmpty(name, "tbTen", "(*) Vui Lòng nhập Tên") &&
        validate.checkName(name, "tbTen", "(*) Tên nhân viên phải là chữ");
    // email validation
    isValid &=
        validate.checkEmpty(email, "tbEmail", "(*) Vui Lòng nhập Email") &&
        validate.checkEmail(email, "tbEmail", "(*) Vui Lòng nhập Email đúng cách");

    // password validation
    isValid &=
        validate.checkEmpty(password, "tbMatKhau", "(*) Vui Lòng nhập Mật Khẩu") &&
        validate.checkPassWord(password, "tbMatKhau", "(*) mật Khẩu từ 6-10 ký tự, chứa ký tự số, chữ thường, in hoa, đặc biệt");

    // date validation
    isValid &=
        validate.checkEmpty(startDay, "tbNgay", "(*) Vui Lòng chọn ngày làm");

    // salary validation
    isValid &=
        validate.checkEmpty(baseSalary, "tbLuongCB", "(*) Vui Lòng nhập lương cơ bản") &&
        validate.checkMinMax(baseSalary, "tbLuongCB", "Lương cơ bản 1 000 000 - 20 000 000", 1000000, 20000000);

    // jobTitile validation
    isValid &=
        validate.checkOption("chucvu", "tbChucVu", "(*) Vui Lòng chọn vị trí công việc");
    // work hours validation
    isValid &=
        validate.checkEmpty(workHours, "tbGiolam", "(*) Vui Lòng nhập giờ làm") &&
        validate.checkMinMax(workHours, "tbGiolam", "Số giờ làm trong tháng 80 - 200 giờ", 80, 200);

    if (!isValid) return null;

    const NV = new NhanVien(id, name, email, password, startDay, baseSalary, jobTitle, workHours);
    NV.tinhTongLuong();
    NV.xepLoaiRank();
    return NV;

};
/**
 * function deleteValidationTag
 */
const deleteValidationTag = () => {
    const tags = document.getElementsByClassName("sp-thongbao");
    for (let tag of tags) {
        tag.innerHTML = "";
        tag.style.display = "none";
    }
}
/**
 * function renderListNhanVien
 */
const renderListNhanVien = (listNhanVien) => {
    let contentHTML = "";
    for (let i = 0; i < listNhanVien.length; i++) {
        const NV = listNhanVien[i];
        const jobTitleConvert = (job) => {
            switch (job) {
                case "nhanvien": return "Nhân viên";
                case "truongphong": return "Trưởng phòng";
                case "sep": return "Sếp";
                default: return "";

            }
        }
        // Format thành tiền Việt Nam
        const formatCurrencyVND = (amount) => {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                maximumFractionDigits: 0 // Không hiển thị phần thập phân
            }).format(amount);
        };
        contentHTML += `
        <tr>
            <td>${NV.id} </td>
            <td>${NV.name} </td>
            <td>${NV.email} </td>
            <td>${NV.startDay} </td>
            <td>${jobTitleConvert(NV.jobTitle)} </td>
            <td>${formatCurrencyVND(NV.totalSalary)}</td>
            <td>${NV.rank} </td>
            <td class = "btn btn-info" data-toggle="modal" data-target="#myModal"  onclick ="handleEditNhanVien('${NV.id}')" >Edit </td>
            <td class = "btn btn-danger" onclick = "handleDeleteNhanVien('${NV.id}')">Delete </td>
        </tr>
        `;
    }
    getEleID("tableDanhSach").innerHTML = contentHTML;
}
/**
 * mở form add nhân viên
 */
getEleID("btnThem").onclick = function () {
    getEleID("tknv").disabled = false;
    deleteValidationTag();
    getEleID("header-title").innerHTML = "Thêm Nhân Viên";
    getEleID("btnCapNhat").style.display = "none";
    getEleID("btnThemNV").style.display = "block";
    resetForm();

}
// Add nhân viên vào vào trang wep và lưu dữ liệu vào localStorage
getEleID("btnThemNV").onclick = function () {

    const NV = getInfoNhanVien(true);
    if (!NV) return;
    manager.addNhanVien(NV);
    renderListNhanVien(manager.arr);
    setLocalStorage();
    closeForm();

}
/**
 * Edit Nhân viên
 */
const handleEditNhanVien = (id) => {
    getEleID("tknv").disabled = true;
    getEleID("header-title").innerHTML = "Sửa Thông Tin";
    getEleID("btnCapNhat").style.display = "block";
    getEleID("btnThemNV").style.display = "none";
    deleteValidationTag();
    const NV = manager.getNhanVienByID(id);
    if (NV) {
        getEleID("tknv").value = NV.id;
        getEleID("name").value = NV.name;
        getEleID("email").value = NV.email;
        getEleID("password").value = NV.password;
        getEleID("datepicker").value = NV.startDay;
        getEleID("luongCB").value = NV.baseSalary;
        getEleID("chucvu").value = NV.jobTitle;
        getEleID("gioLam").value = NV.workHours;
        NV.tinhTongLuong(id);
        NV.xepLoaiRank(id);

    }
}
window.handleEditNhanVien = handleEditNhanVien;
/**
 * Update Nhân viên
*/
getEleID("btnCapNhat").onclick = () => {
    const NV = getInfoNhanVien(false);
    manager.updateNhanVien(NV);
    renderListNhanVien(manager.arr)
    setLocalStorage();
    closeForm();

}
/**
 * Delete Nhân viên
 */
const handleDeleteNhanVien = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?");
    if (confirmDelete) {
        manager.deleteNhanVien(id);
        renderListNhanVien(manager.arr);
        setLocalStorage();
    }
}
window.handleDeleteNhanVien = handleDeleteNhanVien;

/**
 * sắp sếp danh sách tăng theo thứ tự ID
 */
getEleID("SapXepTang").onclick = () => {
    renderListNhanVien(manager.sortUpByID());
    getEleID("SapXepTang").style.display = "none";
    getEleID("SapXepGiam").style.display = "inline-block";
}
/**
 * sắp sếp danh sách giảm theo thứ tự ID
 */
getEleID("SapXepGiam").onclick = () => {
    renderListNhanVien(manager.sortDownByID());
    getEleID("SapXepTang").style.display = "inline-block";
    getEleID("SapXepGiam").style.display = "none";
}

/**
 * lọc danh sách theo xếp loại (Xuất sắc, giỏi, Khá, trung bình)
 */
document.getElementsByClassName("fa fa-cog").onclick = () => {

}

// Lọc theo rank của nhân viên
const filterIcon = document.getElementById("filterRankIcon");
const dropdown = document.getElementById("dropdownRank");

// Toggle dropdown khi click biểu tượng
filterIcon.addEventListener("click", (e) => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Ẩn dropdown khi click ra ngoài
document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== filterIcon) {
        dropdown.style.display = "none";
    }
});

// Lọc danh sách theo xếp loại
dropdown.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", () => {
        const selectedRank = item.getAttribute("data-rank");
        dropdown.style.display = "none";

        if (selectedRank === "all") {
            renderListNhanVien(manager.arr);
        } else {
            const filtered = manager.arr.filter(nv => nv.rank === selectedRank);
            renderListNhanVien(filtered);
        }
    });
});

/**
 * set localStorage
 */
const setLocalStorage = () => {
    const dataString = JSON.stringify(manager.arr);
    localStorage.setItem("LIST_NV", dataString);
}


/**
 * get localStorage
 */
const getLocalStorage = () => {

    const dataString = localStorage.getItem("LIST_NV");
    if (!dataString) return true;
    const dataJson = JSON.parse(dataString);
    manager.restoreFromLocal(dataJson);
    renderListNhanVien(manager.arr);

};
getLocalStorage();

/**
 * search Nhân viên
 */
getEleID("searchName").addEventListener("keyup", () => {
    const keyword = getEleID("searchName").value;
    const searchNV = manager.searchNhanVien(keyword);
    renderListNhanVien(searchNV);

});


/**
 * Nhân viên mẫu
 */


const danhSachNhanVienMau = [
    {
        id: "001",
        name: "Nguyễn Văn A",
        email: "a.nguyen@example.com",
        password: "Abc@123",
        startDay: "2023-01-15",
        baseSalary: 12000000,
        jobTitle: "nhanvien",
        workHours: 160
    },
    {
        id: "002",
        name: "Trần Thị B",
        email: "b.tran@example.com",
        password: "Bcd@456",
        startDay: "2023-02-20",
        baseSalary: 15000000,
        jobTitle: "truongphong",
        workHours: 180
    },
    {
        id: "003",
        name: "Lê Văn C",
        email: "c.le@example.com",
        password: "Cde@789",
        startDay: "2023-03-10",
        baseSalary: 20000000,
        jobTitle: "sep",
        workHours: 190
    },
    {
        id: "004",
        name: "Phạm Thị D",
        email: "d.pham@example.com",
        password: "Def@321",
        startDay: "2023-04-05",
        baseSalary: 11000000,
        jobTitle: "nhanvien",
        workHours: 150
    },
    {
        id: "005",
        name: "Hoàng Văn E",
        email: "e.hoang@example.com",
        password: "Efg@654",
        startDay: "2023-05-12",
        baseSalary: 13000000,
        jobTitle: "truongphong",
        workHours: 170
    },
    {
        id: "006",
        name: "Đặng Thị F",
        email: "f.dang@example.com",
        password: "Fgh@987",
        startDay: "2023-06-18",
        baseSalary: 18000000,
        jobTitle: "sep",
        workHours: 200
    },
    {
        id: "007",
        name: "Vũ Văn G",
        email: "g.vu@example.com",
        password: "Ghi@159",
        startDay: "2023-07-22",
        baseSalary: 10000000,
        jobTitle: "nhanvien",
        workHours: 140
    },
    {
        id: "008",
        name: "Ngô Thị H",
        email: "h.ngo@example.com",
        password: "Hij@753",
        startDay: "2023-08-30",
        baseSalary: 16000000,
        jobTitle: "truongphong",
        workHours: 175
    },
    {
        id: "009",
        name: "Bùi Văn I",
        email: "i.bui@example.com",
        password: "Ijk@852",
        startDay: "2023-09-25",
        baseSalary: 19000000,
        jobTitle: "sep",
        workHours: 195
    },
    {
        id: "010",
        name: "Đỗ Thị J",
        email: "j.do@example.com",
        password: "Jkl@456",
        startDay: "2023-10-10",
        baseSalary: 12500000,
        jobTitle: "nhanvien",
        workHours: 160
    }
];

getEleID("btnChonNhanVienMau").onclick = () => {
    let NvMau = [];

    for (let i = 0; i < danhSachNhanVienMau.length; i++) {
        const nvData = danhSachNhanVienMau[i];
        const NV = new NhanVien(nvData.id, nvData.name, nvData.email, nvData.password, nvData.startDay, nvData.baseSalary, nvData.jobTitle, nvData.workHours);
        NV.tinhTongLuong();
        NV.xepLoaiRank();
        NvMau.push(NV);

    }
    console.log(NvMau);
    manager.arr = NvMau;
    setLocalStorage();
    getLocalStorage();
}

// xóa tất cả
getEleID("deleteAll").onclick = () => {
    manager.arr = [];
    setLocalStorage();
    getLocalStorage();
}





