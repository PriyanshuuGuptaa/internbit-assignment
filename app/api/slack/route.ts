import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    const { text } = await request.json();
    const slackToken = process.env.SLACK_BOT_TOKEN;
    const channel = 'C07HDLX6YNN';

    try {
        const response = await axios.post(
            'https://slack.com/api/chat.postMessage',
            {
                channel: channel,
                text: text || 'Hello from Next.js!',
            },
            {
                headers: {
                    'Authorization': `Bearer ${slackToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.ok) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: response.data.error });
        }
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
