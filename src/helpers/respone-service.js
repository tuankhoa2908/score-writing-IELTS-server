module.exports = {
    returnSuccess: (code, data, msg) => {
        return {
            status: 1,
            code: code,
            data: data,
            message: msg,
        }
    },

    returnError: (code, data, msg) => {
        return {
            status: 0,
            code: code,
            data: data,
            message: msg,
        }
    }
}