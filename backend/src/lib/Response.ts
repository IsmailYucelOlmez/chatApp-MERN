/* eslint-disable @typescript-eslint/no-require-imports */
import { CustomErrorType } from "./Error";

import { HTTP_CODES } from "../config/enum";
import { DEFAULT_LANG } from "../config/config";
import CustomError from "./Error";
import I18n from "./i18n";

const i18n = new I18n(DEFAULT_LANG);

class Response {
    constructor() { }

    static successResponse(data:unknown, code = 200) {
        return {
            code,
            data
        }
    }

    static errorResponse(error:CustomErrorType, lang:string) {
        console.error(error);
        if (error instanceof CustomError) {
            return {
                code: error.code,
                error: {
                    message: error.message,
                    description: error.description
                }
            }
        } else if (error.message.includes("E11000")) {
            return {
                code: HTTP_CODES.CONFLICT,
                error: {
                    message: i18n.translate("COMMON.ALREADY_EXIST", lang),               
                    description: i18n.translate("COMMON.ALREADY_EXIST", lang)
                }
            }
        }

        return {
            code: HTTP_CODES.INT_SERVER_ERROR,
            error: {
                message: i18n.translate("COMMON.UNKNOWN_ERROR", lang),
                description: error.message
            }
        }
    }

}

export default Response;