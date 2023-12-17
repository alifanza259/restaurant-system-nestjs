import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from 'aws-sdk'

@Injectable()
export class AWSService {
    private AWS_S3_BUCKET = 'restaurant-system-111';
    private s3: AWS.S3;
    constructor(private configService: ConfigService) {
        this.s3 = new AWS.S3(new AWS.Credentials({
            accessKeyId: this.configService.get("AWS_ACCESS_KEY"),
            secretAccessKey: this.configService.get("AWS_SECRET_KEY")
        }))
    }
    async uploadToS3(file: Express.Multer.File) {
        try {
            let s3Response = await this.s3.upload({
                Bucket: this.AWS_S3_BUCKET,
                Key: file.originalname,
                ACL: 'public-read',
                Body: file.buffer,
                ContentType: file.mimetype
            }).promise()
            return s3Response
        } catch (error) {
            console.log(error)
        }
    }
}