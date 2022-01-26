import CaiWebchat from 'webchat';

export default class ReactWebchat extends Component {
  render() {
    return (
      <CaiWebchat
        onRef={ref => {
          this.webchat = ref;
        }}
        src="https://cdn.cai.tools.sap/webchat/webchat.js"
        channelId="86874686-60f9-4d46-b0da-9f33c40a4ef0"
        token="50d10e3c50606ac79f3898c9052c5286"
        id="cai-webchat"
        preferences={{
          accentColor: '#E05A47',
          complementaryColor: '#FFFFFF',
          botMessageColor: '#707070',
          botMessageBackgroundColor: '#F6F6F6',
          backgroundColor: '#FFFFFF',
          headerLogo: 'https://cdn.cai.tools.sap/webchat/webchat-logo.svg',
          headerTitle: 'My awesome chatbot',
          botPicture: 'https://cdn.cai.tools.sap/webchat/bot.png',
          userPicture: 'https://cdn.cai.tools.sap/webchat/user.png',
          onboardingMessage: 'Come speak to me!',
          expanderLogo: 'https://cdn.cai.tools.sap/webchat/webchat-logo.svg',
          expanderTitle: 'Click on me!',
          conversationTimeToLive: 24,
          openingType: 'never',
          welcomeMessage: 'Hello world !',
        }}
        getLastMessage={message => {
          console.log(message)
        }}
      />
    );
  }
}