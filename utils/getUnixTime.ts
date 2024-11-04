async function getUnixTimeFromAPI() {
  try {
    const data = await fetch("https://worldtimeapi.org/api/ip").then((res) =>
      res.json(),
    );

    return new Date(data.utc_datetime).getTime();
  } catch (err) {
    console.log("failed at getting global timestamp", err);
    return new Date().getTime();
  }
}

function initUnixTimeGetter() {
  let gap = 0;

  return {
    async getGap() {
      const localTimeNow = new Date().getTime();
      const unixTimeNow = await getUnixTimeFromAPI();

      gap = unixTimeNow - localTimeNow;
    },
    getUnixTime() {
      return new Date().getTime() + gap;
    },
  };
}

export const UnixTime = initUnixTimeGetter();
