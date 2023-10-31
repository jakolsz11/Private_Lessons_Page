const getTimeToNotification = () => {
  const now = new Date();
  const offsetInMinutes = 2 * 60;
  const customDate = new Date(now.getTime() + offsetInMinutes * 60000);

  const createTime = customDate.toLocaleString();

  return createTime;
};

module.exports = {getTimeToNotification};