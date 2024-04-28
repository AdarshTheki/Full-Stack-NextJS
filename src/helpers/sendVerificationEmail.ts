import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/VerificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const res = await resend.emails.send({
            from: 'adarshverma549@gmail.com',
            to: email,
            subject: 'Mystery Message Verification Code',
            react: `<p>verify code is ${verifyCode}, username is ${username}</p>`,
            // react: VerificationEmail({ username, otp: verifyCode }),
        });
        console.log('res: ', res);
        if (res) {
            return { success: true, message: 'Verification email sent successfully.' };
        } else {
            return { success: false, message: 'Failed to send verification email.' };
        }
    } catch (emailError) {
        console.error('Error sending verification email:', emailError);
        return { success: false, message: 'Failed to send verification email.' };
    }
}
