import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from 'aws-sdk'

@Injectable()
export class AWSService {
    private AWS_S3_BUCKET = 'restaurant-system-111';
    private s3: AWS.S3;
    private sqs: AWS.SQS;
    constructor(private configService: ConfigService) {
        const awsCredentials = new AWS.Credentials({
            accessKeyId: this.configService.get("AWS_ACCESS_KEY"),
            secretAccessKey: this.configService.get("AWS_SECRET_KEY")
        })
        this.s3 = new AWS.S3(awsCredentials)
        this.sqs = new AWS.SQS({
            credentials: awsCredentials,
            region: "ap-southeast-1"
        })
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

    async createSQSQueue(payload) {
        try {
            const resp = await this.sqs.sendMessage({
                MessageBody: payload,
                QueueUrl: this.configService.get("SQS_QUEUE_ENDPOINT")
            }).promise();
            console.log(resp.MessageId)

            return resp
        } catch (error) {
            console.log(error)
        }
    }
}