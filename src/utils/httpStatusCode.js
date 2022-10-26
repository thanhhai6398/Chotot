class HTTP_STATUS_CODE {
    static INTERNAL_SERVER_ERROR = 500;
    static OK = 200;
    static NO_CONTENT = 204;
    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static METHOD_NOT_ALLOWED = 405;
    static CONFLICT = 409;
    static UNSUPPORTED_MEDIA_TYPE = 415;
}
module.exports = HTTP_STATUS_CODE;