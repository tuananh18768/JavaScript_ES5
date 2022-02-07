class Validation {
    constructor() {
        this.KiemTraRong = function(id, value) {
            if (value.trim() === '') {
                document.getElementById(id).style.borderColor = 'red'
                return false
            }
            document.getElementById(id).style.borderColor = 'green'
            return true
        }
        this.KiemTraSo = function(id, value) {
            var regex = /^[0-9]+$/
            if (regex.test(value)) {
                document.getElementById(id).style.borderColor = 'green'
                return true
            } else {
                document.getElementById(id).style.borderColor = 'red'
                return false
            }
        }
        this.KiemTraSoDT = function(id, value) {
            // var number = this.KiemTraSo(id, value)
            var regex = /^[0-9]+$/
            if (regex.test(value) && value.length >= 10 && value.length <= 11) {
                document.getElementById(id).style.borderColor = 'green'
                return true
            } else {
                document.getElementById(id).style.borderColor = 'red'
                return false
            }

        }
        this.KiemTraEmail = function(id, value) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(value.toLowerCase())) {
                document.getElementById(id).style.borderColor = 'green'
                return true
            } else {
                document.getElementById(id).style.borderColor = 'red'
                return false
            }
        }
    }
}