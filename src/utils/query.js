const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 12;

function getPagination(page, size) {
  const offSet = Math.abs(page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(size) || DEFAULT_PAGE_LIMIT;
  const skip = (offSet - 1) * limit;
  return { skip, limit };
}

module.exports = {
  getPagination,
};
