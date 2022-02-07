class DanhSachSinhVien {
    constructor() {
        this.DSSV = [];
        this.ThemSinhVien = function(addSV) {
            this.DSSV.push(addSV)
        };
        this.TaoTruongSinhVien = function(value) {
            var td = document.createElement('td')
            td.innerHTML = value
            return td
        }
        this.CapNhatSinhVien = function(update) {
            for (var i = 0; i < this.DSSV.length; i++) {
                var student = this.DSSV[i]
                if (update.maSV == student.maSV) {
                    student.hoTen = update.hoTen
                    student.cmnd = update.cmnd
                    student.email = update.email
                    student.sodt = update.sodt
                }
            }

        };
        this.XoaSinhVien = function(listStudentDelete) {
            for (var i = 0; i < listStudentDelete.length; i++) {
                for (var j = 0; j < this.DSSV.length; j++) {
                    var studentDelete = this.DSSV[j]
                    if (listStudentDelete[i] == studentDelete.maSV) {
                        this.DSSV.splice(j, 1)
                    }
                }
            }
        };
        this.TimKiemSinhVien = function(search) {
            // var searchStudent = new DanhSachSinhVien()
            // var student = this.DSSV.filter(p => {
            //     return p.hoTen.toLowerCase().trim().includes(search.toLowerCase().trim())
            // })
            // searchStudent.ThemSinhVien(student)
            // return searchStudent
            var searchStudent = new DanhSachSinhVien()
            for (var i = 0; i < this.DSSV.length; i++) {
                var student = this.DSSV[i]
                if (student.hoTen.toLowerCase().trim().search(search.toLowerCase().trim()) != -1) {
                    searchStudent.ThemSinhVien(student)
                    console.log(searchStudent);
                }
            }
            return searchStudent;
        };
        this.createSinhVien = function(maSV) {
            for (var i = 0; i < this.DSSV.length; i++) {
                var sinhVien = this.DSSV[i];
                if (sinhVien.maSV == maSV) {
                    return sinhVien;
                }
            }
            return null;
        }
    }
}