import Logger from '/imports/startup/server/logger';
import Users from '/imports/api/users';
import { extractCredentials } from '/imports/api/common/server/helpers';
import ClientConnections from '/imports/startup/server/ClientConnections';

export default function userLeftMeeting() { // TODO-- spread the code to method/modifier/handler
  // so we don't update the db in a method
  const { meetingId, requesterUserId } = extractCredentials(this.userId);

  const selector = {
    meetingId,
    userId: requesterUserId,
  };

  try {
    const numberAffected = Users.update(selector, { $set: { loggedOut: true } });

    if (numberAffected) {
      Logger.info(`user left id=${requesterUserId} meeting=${meetingId}`);
      ClientConnections.removeClientConnection(this.userId, this.connection.id);
    }
  } catch (err) {
    Logger.error(`Error on user left: ${err}`);
  }
}
