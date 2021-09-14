import codePush, { CodePushOptions } from 'react-native-code-push';

const options: CodePushOptions = {
	checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

export const CodePushWrapper = (app: React.ReactNode): React.ReactNode => codePush(options)(app);
