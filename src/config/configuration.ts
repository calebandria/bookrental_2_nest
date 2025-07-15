export default() =>({
    port: parseInt(process.env.PORT || '3000', 10),
    databaseurl: process.env.DATABASE_URL,

    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
})