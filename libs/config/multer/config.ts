import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";

export const fileFilter = function(req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
    // todo ok...
    cb(null, true);
};