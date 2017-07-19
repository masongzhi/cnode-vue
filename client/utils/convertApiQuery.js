export default function (query) {
  const {
    l = 1,
    c = 10,
    url,
    startTime,
    endTime,
    platform_name,
    status,
    userName,
    password,
    noteId
  } = query

  return {
    limit: c,
    page: l,
    ...!!url && { url },
    ...!!startTime && { startTime },
    ...!!endTime && { endTime },
    ...!!platform_name && { platform_name },
    ...!!status && { status },
    ...!!userName && { userName },
    ...!!password && { password },
    ...!!noteId && { noteId },
  }
}
