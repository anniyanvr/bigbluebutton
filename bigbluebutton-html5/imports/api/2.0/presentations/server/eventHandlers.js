import RedisPubSub from '/imports/startup/server/redis2x';
// import handlePresentationRemove from './handlers/presentationRemove';
import handlePresentationChange from './handlers/presentationChange';
import handlePresentationInfoReply from './handlers/presentationInfoReply';

// RedisPubSub.on('presentation_removed_message', handlePresentationRemove);
RedisPubSub.on('NewPresentationEvtMsg', handlePresentationChange);
// RedisPubSub.on('get_presentation_info_reply', handlePresentationInfoReply);

RedisPubSub.on('SyncGetPresentationInfoRespMsg', handlePresentationInfoReply);
