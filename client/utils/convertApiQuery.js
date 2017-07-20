export default function (query) {
  const {
    l = 1,
    c = 20,
  } = query

  return {
    limit: c,
    page: l
  }
}
