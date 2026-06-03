// bot.js
const TelegramBot = require('node-telegram-bot-api');

// আপনার দেওয়া টেলিগ্রাম বট টোকেন
const token = '8268783028:AAFXLIZYIeWybrDZkcSQGBcdfj43yjWKDwM';

// এখানে আপনার আপলোড করা index.html ফাইলের সঠিক HTTPS ইউআরএলটি দিন
const webAppUrl = 'https://your-hosted-domain.com/index.html'; 

// বট ক্লায়েন্ট ইনিশিয়ালাইজ করা হচ্ছে
const bot = new TelegramBot(token, { polling: true });

console.log('বট সফলভাবে চালু হয়েছে...');

// চ্যাটের নিচের মেনু বাটনটি মিনি অ্যাপ হিসেবে সেট করা
bot.setChatMenuButton({
    menu_button: JSON.stringify({
        type: 'web_app',
        text: 'Open App 🎬',
        web_app: { url: webAppUrl }
    })
}).then(() => {
    console.log('মেনু বাটন সেট করা হয়েছে।');
}).catch(err => {
    console.error('মেনু বাটন সেট করতে সমস্যা হয়েছে:', err);
});

// /start কমান্ডের রেসপন্স
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || 'ব্যবহারকারী';
    
    // একটি সুন্দর থিম সংবলিত ওয়েলকাম ছবি (প্রয়োজনে আপনি আপনার পছন্দের ইমেজ লিংক দিতে পারেন)
    const welcomePhotoUrl = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop';

    const welcomeMessage = `স্বাগতম, ${firstName}! 👋\n\nPron Hub BD-তে আপনাকে ধন্যবাদ। আমাদের প্ল্যাটফর্মে যুক্ত হতে পেরে আমরা আনন্দিত।\n\nনিচের "Open App 🚀" বাটনে ক্লিক করে আমাদের মিনি অ্যাপে প্রবেশ করুন এবং আপনার প্রিয় কনটেন্টগুলো উপভোগ করুন।`;

    const options = {
        caption: welcomeMessage,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '🚀 Open App / প্রবেশ করুন',
                        web_app: { url: webAppUrl }
                    }
                ]
            ]
        }
    };

    bot.sendPhoto(chatId, welcomePhotoUrl, options)
        .catch(err => {
            console.error('মেসেজ পাঠাতে সমস্যা হয়েছে:', err);
        });
});
