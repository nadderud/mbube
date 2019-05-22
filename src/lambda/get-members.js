import { getMembers } from "./helpers/nsf"
import { error, success, unauthorized } from "./helpers/lambda"

export async function handler(event, context) {
  const { user } = context.clientContext

  if (
    user &&
    user.app_metadata &&
    Array.isArray(user.app_metadata.roles) &&
    user.app_metadata.roles.includes("members")
  ) {
    return getMembers()
      .then(success)
      .catch(error)
  }
  return unauthorized
}
