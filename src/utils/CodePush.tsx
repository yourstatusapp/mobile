console.log('[WARNING] Codepush is running');
Alert.alert('test');

// import { state } from '@pulsejs/core';
import { Alert } from 'react-native';
// import codePush, { CodePushOptions, DownloadProgress } from 'react-native-code-push';

// const options: CodePushOptions = {
// 	checkFrequency: codePush.CheckFrequency.MANUAL,
// };

// export const CodePushState = {
// 	CodePushStatusMessage: state<string>(''),
// 	DownloadProgress: state<null | DownloadProgress>(null),
// 	VersionLabel: state<string>(''),
// 	UpdateReadyToInstall: state(false),
// };

// export const CodePushWrapper = (app: React.ReactNode): React.ReactNode => codePush(options)(app);

// export const sync = () => {
// 	codePush.sync(
// 		{},
// 		(status) => {
// 			console.log(status);
// 			parseStatusMessage(status);
// 		},
// 		(progress) => {
// 			console.log(progress);
// 			CodePushState.DownloadProgress.set(progress);
// 		}
// 	);
// };

// export const parseStatusMessage = (s: codePush.SyncStatus) => {
// 	switch (s) {
// 		case codePush.SyncStatus.CHECKING_FOR_UPDATE:
// 			CodePushState.CodePushStatusMessage.set('Checking for update...');
// 			break;
// 		case codePush.SyncStatus.INSTALLING_UPDATE:
// 			CodePushState.CodePushStatusMessage.set('Installing');
// 			break;
// 		case codePush.SyncStatus.DOWNLOADING_PACKAGE:
// 			CodePushState.CodePushStatusMessage.set('Downloading new update');
// 			break;
// 		case codePush.SyncStatus.UPDATE_INSTALLED:
// 			CodePushState.CodePushStatusMessage.set('Update installed');
// 			CodePushState.UpdateReadyToInstall.set(true);
// 			break;
// 		case codePush.SyncStatus.UP_TO_DATE:
// 			CodePushState.CodePushStatusMessage.set('Up To Date');
// 			break;
// 	}
// };

// export const syncMetaData = async () => {
// 	const update = await codePush.getUpdateMetadata();
// 	console.log(update);

// 	if (update) {
// 		CodePushState.VersionLabel.set(update?.appVersion + ' | ' + update?.label);
// 	}
// };
