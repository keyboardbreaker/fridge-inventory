import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new SESClient({
    region: process.env.AWS_REGION,
});

const sendEmail = async (
    to: string,
    subject: string,
    body: string
) => {
    const command = new SendEmailCommand({
        Source: process.env.FROM_EMAIL!,
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: {
                Data: subject,
            },
            Body: {
                Text: {
                    Data: body,
                }
            }
        }
    });

    await client.send(command);
}

export default sendEmail;