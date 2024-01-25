import { validate } from 'validate.js'

const constraints = {
    firstName: {
        presence: {
            message: "^Bạn chưa nhập họ"
        },
    },
    lastName: {
        presence: {
            message: "^Bạn chưa nhập tên"
        },
    },
    email: {
        presence: {
            message: "^Bạn chưa nhập email"
        },
        email: {
            message: '^Địa chỉ email không đúng định dạng'
        }
    },
    password: {
        presence: {
            message: "^Bạn chưa nhập mật khẩu"
        },
        length: {
            minimum: 8,
            message: '^Mật khẩu phải có ít nhất 8 kí tự'
        }
    }
}

const validator = (field, value) => {
    let object = new Object()
    object[field] = value

    let constraint = new Object()
    constraint[field] = constraints[field]

    // Validate against the constraint and hold the error messages
    let result = validate({}, constraint)//
    if (value !== '' && value !== null) {//if null value it will return with the presence validation
        result = validate(object, constraint)
    }
    // If there is an error message, return it!
    if (result) {
        // Return only the field error message if there are multiple
        return result[field][0]
    }

    return null
}

export default validator
