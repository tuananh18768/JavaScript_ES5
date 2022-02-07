var dssv = new DanhSachSinhVien()
var validate = new Validation()
SinhVien.prototype.DiemToan = ''
SinhVien.prototype.DiemLy = ''
SinhVien.prototype.DiemHoa = ''
SinhVien.prototype.DTBs = ''
SinhVien.prototype.Loai = ''
SinhVien.prototype.caculateTB = function() {
    this.DTBs = (Number(this.DiemToan) + Number(this.DiemLy) + Number(this.DiemHoa)) / 3
}
SinhVien.prototype.XepLoaiTB = function() {
    if (this.DTBs <= 10 && this.DTBs > 8) {
        this.Loai = "Xếp loại giỏi"
    } else if (this.DTBs >= 7 && this.DTBs <= 8) {
        this.Loai = "Xếp loại khá"
    } else if (this.DTBs >= 6 && this.DTBs <= 5)
        this.Loai = "Xếp loại trung bình"
    else {
        this.Loai = "Xếp loại yếu"
    }
}
getStore()
var themSinhVien = function() {
    var maSV = getDom('maSV').value
    var hoTen = getDom('hoTen').value
    var cmnd = getDom('cmnd').value
    var email = getDom('email').value
    var dienThoai = getDom('dienThoai').value

    var error = 0
    if (validate.KiemTraSo('maSV', maSV) == false) {
        error++
    }
    if (validate.KiemTraRong('hoTen', hoTen) == false) {}
    if (validate.KiemTraRong('cmnd', cmnd) == false) {
        error++
    }
    if (validate.KiemTraEmail('email', email) == false) {
        error++
    }
    if (validate.KiemTraSoDT('dienThoai', dienThoai) == false) {
        error++
    }
    if (error != 0) {
        return false
    }
    var student = new SinhVien(maSV, hoTen, cmnd, email, dienThoai)
    student.DiemToan = getDom('diemToan').value
    student.DiemLy = getDom('diemLy').value
    student.DiemHoa = getDom('diemHoa').value
    student.caculateTB()
    student.XepLoaiTB()
    dssv.ThemSinhVien(student)
    hienThiSinhVien(dssv)
    console.log(dssv)
    return true

}

function hienThiSinhVien(DanhSachSinhVien) {
    var tableBody = getDom("tbdSinhVien")
    tableBody.innerHTML = ""
    for (var i = 0; i < DanhSachSinhVien.DSSV.length; i++) {
        var sinhVien = DanhSachSinhVien.DSSV[i]
        var tr = document.createElement('tr')
        tr.id = sinhVien.maSV
        tr.className = 'trSinhvien'
        tr.setAttribute("onclick", "updateStudent('" + sinhVien.maSV + "')")
            // tr.addEventListener('click', function() {
            //     for(var i = 0; i <dssv.DSSV.length; i++) {
            //         sinhVien = dssv.DSSV[i]
            //         if(maSV = sinhVien.maSV) {
            //             return sinhVien
            //         }
            //     }
            //     var getID = getDom("tbdSinhVien")
            //     alert(getID)
            //         var getID = getDom(maSV)
            //         var sinhVien = dssv.createSinhVien(getID)
            //         if (sinhVien != null) {
            //             getDom('maSV') = sinhVien.maSV
            //             getDom('hoTen') = sinhVien.hoTen
            //             getDom('cmnd') = sinhVien.cmnd
            //             getDom('email') = sinhVien.email
            //             getDom('dienThoai') = sinhVien.sodt

        //     }
        // })
        var checkBoxs = document.createElement('td')
        var checkBox = document.createElement('input')
        checkBox.setAttribute("type", "checkbox")
        checkBox.setAttribute("class", "checkSV")
        checkBox.setAttribute('value', sinhVien.maSV)
        checkBoxs.appendChild(checkBox)
        var tab = DanhSachSinhVien.TaoTruongSinhVien(sinhVien.DTBs)
        var LoaiSinhVien = DanhSachSinhVien.TaoTruongSinhVien(sinhVien.Loai)
        var maSV = DanhSachSinhVien.TaoTruongSinhVien(sinhVien.maSV)
        var hoTen = DanhSachSinhVien.TaoTruongSinhVien(sinhVien.hoTen)
        var cmnd = DanhSachSinhVien.TaoTruongSinhVien(sinhVien.cmnd)
        var email = DanhSachSinhVien.TaoTruongSinhVien(sinhVien.email)
        var sodt = DanhSachSinhVien.TaoTruongSinhVien(sinhVien.sodt)

        tr.appendChild(checkBoxs)
        tr.appendChild(maSV)
        tr.appendChild(hoTen)
        tr.appendChild(cmnd)
        tr.appendChild(email)
        tr.appendChild(sodt)
        tr.appendChild(tab)
        tr.appendChild(LoaiSinhVien)

        tableBody.appendChild(tr)
    }
}

function saveStore() {
    var jsonSinhVien = JSON.stringify(dssv.DSSV)
    localStorage.setItem('DanhSachSV', jsonSinhVien)
}

function updateStudent(maSV) {
    var sinhVien = dssv.createSinhVien(maSV)
    if (sinhVien != null) {
        console.log(sinhVien)
        getDom('maSV').value = sinhVien.maSV
        getDom('hoTen').value = sinhVien.hoTen
        getDom('cmnd').value = sinhVien.cmnd
        getDom('email').value = sinhVien.email
        getDom('dienThoai').value = sinhVien.sodt
        getDom('diemToan').value = sinhVien.DiemToan
        getDom('diemLy').value = sinhVien.DiemLy
        getDom('diemHoa').value = sinhVien.DiemHoa
    }
}

function getStore() {
    var getJson = localStorage.getItem('DanhSachSV')
    var arraySinhVien = JSON.parse(getJson)
    dssv.DSSV = arraySinhVien
    hienThiSinhVien(dssv)
}

function deleteStudent() {
    var checkStudent = document.getElementsByClassName("checkSV")

    var checkDelete = []
    for (var i = 0; i < checkStudent.length; i++) {
        if (checkStudent[i].checked) {
            console.log(checkStudent[i].checked)
            checkDelete.push(checkStudent[i].value)
        }
    }
    dssv.XoaSinhVien(checkDelete)
    hienThiSinhVien(dssv)
}

function updateNewStudent() {
    var maSV = getDom('maSV').value
    var hoTen = getDom('hoTen').value
    var cmnd = getDom('cmnd').value
    var email = getDom('email').value
    var dienThoai = getDom('dienThoai').value

    var error = 0
    if (validate.KiemTraSo('maSV', maSV) == false) {
        error++
    }
    if (validate.KiemTraRong('hoTen', hoTen) == false) {}
    if (validate.KiemTraRong('cmnd', cmnd) == false) {
        error++
    }
    if (validate.KiemTraEmail('email', email) == false) {
        error++
    }
    if (validate.KiemTraSoDT('dienThoai', dienThoai) == false) {
        error++
    }
    if (error != 0) {
        return false
    }
    var student = new SinhVien(maSV, hoTen, cmnd, email, dienThoai)
    student.DiemToan = getDom('diemToan').value
    student.DiemLy = getDom('diemLy').value
    student.DiemHoa = getDom('diemHoa').value
    student.caculateTB()
    student.XepLoaiTB()
    dssv.CapNhatSinhVien(student)
    hienThiSinhVien(dssv)
    return true

}

function searchStudent() {
    var search = getDom("search").value
    var listStudent = dssv.TimKiemSinhVien(search)
    hienThiSinhVien(listStudent)
}

function getDom(id) {
    var element = document.getElementById(id)
    return element
}
document.getElementById("themSinhVien").onclick = themSinhVien;
document.getElementById("saveStore").onclick = saveStore;
document.getElementById("getStore").onclick = getStore;
document.getElementById("deleteStore").onclick = deleteStudent;
document.getElementById("searchStudent").onclick = searchStudent;
document.getElementById("search").oninput = searchStudent;
document.getElementById("updateStudent").onclick = updateNewStudent;