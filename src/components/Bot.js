import Script from 'next/script';

const BotpressChatWidget = () => {
    
    const initBotpress = ()=>{
        window.botpressWebChat.init({
            "composerPlaceholder": "Chat with FootBot",
            "botConversationDescription": "This is a soccer knowledge bot",
            "botId": "8285e07c-d424-43bf-8196-5dfa61976d8e",
            "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
            "messagingUrl": "https://messaging.botpress.cloud",
            "clientId": "8285e07c-d424-43bf-8196-5dfa61976d8e",
            "webhookId": "8bacba7f-8401-4536-82ba-0010e9f23e19",
            "lazySocket": true,
            "themeName": "prism",
            "botName": "FootBot",
            "avatarUrl": "https://img.freepik.com/free-vector/floating-robot_78370-3669.jpg?t=st=1708925822~exp=1708929422~hmac=9f9453c2f72ddd7474e3c84fc0a36ad8af5c3fbe3dd038db295b7f07b2f86e01&w=740",
            "stylesheet": "https://webchat-styler-css.botpress.app/prod/0c55cae6-e953-4006-a7cc-767396d3a74f/v30843/style.css",
            "frontendVersion": "v1",
            "enableConversationDeletion": true,
            "theme": "prism",
            "themeColor": "#2563eb"
        });
    }
   return(<>
   <Script src="https://cdn.botpress.cloud/webchat/v1/inject.js" onLoad={()=>{
    initBotpress();
   }}/>
   </>)

}
export default BotpressChatWidget;
