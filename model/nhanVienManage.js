
class NvManager {
    constructor() {
        this.arr = [];

    }
    addNhanVien(NV) {
        this.arr.push(NV)

    }
    findIndexNV(id) {
        let index = -1;
        for (let i = 0; i < this.arr.length; i++) {
            const NV = this.arr[i];
            if (NV.id === id) {
                index = i;
                break;

            }
        }
        return index;

    }
    deleteNhanVien(id) {
        const index = this.findIndexNV(id);

        this.arr.splice(index, 1);


    }

    getNhanVienByID(id) {
        const index = this.findIndexNV(id);
        if (index !== -1) {
            return this.arr[index];
        }

        return null;

    }
    updateNhanVien(NV) {
        const index = this.findIndexNV(NV.id);
        if (index !== -1) {
            this.arr[index] = NV;
        }

    }
    searchNhanVien(keyword) {

        const searchNV = [];
        for (let i = 0; i < this.arr.length; i++) {

            const NV = this.arr[i];
            const keywordLowerCase = keyword.toLowerCase();
            const NVLowerCase = NV.name.toLowerCase();
            // kiem tra keywrord co nam trong Nhan vien hay khoong
            if (NVLowerCase.indexOf(keywordLowerCase) !== -1) {
                searchNV.push(NV);
            }
        }
        return searchNV;

    }
    // sortNhanVien() {
    //     const sort = [];
    //     let index = 0;
    //     for (let i = 0; i < this.arr.length; i++) {
    //         const min = this.arr[0];

    //         if (min > this.arr[i]) {
    //             min = this.arr[i];
    //             index++;
    //         }

    //     }
    //     return sort;

    // }

}
export default NvManager;