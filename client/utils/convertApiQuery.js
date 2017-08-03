export default function (query) {
  const {
    l = 1,
    c = 20,
    tab
  } = query

  return {
    limit: c,
    page: l,
    ...!!tab && { tab }
  }
}
