import multer from '@koa/multer';
import config from '../config/config';

/**
 * Use those pre-defined middleware in your router
 * router.post('/upload-multiple-files', lgUpload, (ctx) => { ctx.files; });
 * interface File {
 *  fieldname: string;
 *  originalname: string;
 *  size: number; // in bytes
 *  path: string;
 * }
 */

const lgUpload = multer({
  dest: config.upload.path,
  limits: {
    fileSize: 1024 * 1024 * 60,
    files: 1
  }
}).any();

const mdUpload = multer({
  dest: config.upload.path,
  limits: {
    fileSize: 1024 * 1024 * 30,
    files: 1
  }
}).any();

const smUpload = multer({
  dest: config.upload.path,
  limits: {
    fileSize: 1024 * 1024 * 5,
    files: 1
  }
}).any();

export {
  lgUpload,
  mdUpload,
  smUpload,
};