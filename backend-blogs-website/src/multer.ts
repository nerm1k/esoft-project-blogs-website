import { Request, Response, NextFunction } from "express";
import multer from 'multer';
import path from 'path';
import sharp from 'sharp'; 
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'frontend-blogs-website', 'public', 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage }).single('image');

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await upload(req, res, async (err) => {
        if (err) {
          return next(err);
        }

        if (req.file) {
            const originalFilePath = req.file.path;
            const tempFilePath = path.join(__dirname, '..', '..', 'frontend-blogs-website', 'public', 'images', 'temp-' + req.file.filename);
            const finalFilePath = req.file.path; 
    
            try {
              const imageBuffer = fs.readFileSync(originalFilePath);
    
              await sharp(imageBuffer)
                .resize(778, 450)
                .toFormat('jpeg')
                .jpeg({ quality: 80 })
                .toFile(tempFilePath);
    
              fs.renameSync(tempFilePath, finalFilePath);
    
              // fs.unlink(tempFilePath, (err) => {
              //   if (err) {
              //     console.error('Error deleting temporary file:', err);
              //   }
              // });
            } catch (err) {
              console.error("Error processing image:", err);
              return next(err);
            }
        }
        next();
      });
    } catch (error) {
      return next(error);
    }
  };

  export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await upload(req, res, async (err) => {
        if (err) {
          return next(err);
        }

        if (req.file) {
            const originalFilePath = req.file.path;
            const tempFilePath = path.join(__dirname, '..', '..', 'front-blog-website', 'public', 'images', 'temp-' + req.file.filename);
            const finalFilePath = req.file.path; 
    
            try {
              const imageBuffer = fs.readFileSync(originalFilePath);
    
              await sharp(imageBuffer)
                .resize(100)
                .toFormat('jpeg')
                .jpeg({ quality: 80 })
                .toFile(tempFilePath);
    
              fs.renameSync(tempFilePath, finalFilePath);
            } catch (err) {
              console.error("Error processing image:", err);
              return next(err);
            }
        }
        next();
      });
    } catch (error) {
      return next(error);
    }
  };