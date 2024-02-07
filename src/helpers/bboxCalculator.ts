export const bboxCulc = (lat: number, long: number, distance: number) => {
  const R = 6378.1;

  if (distance <= 0) {
    return "Can't solve";
  }

  const degToRad = function (num: number) {
    return num * (Math.PI / 180);
  };

  const radToDeg = function (num: number) {
    return (180 * num) / Math.PI;
  };

  const MIN_LAT = degToRad(-90);
  const MAX_LAT = degToRad(90);
  const MIN_LONG = degToRad(-180);
  const MAX_LONG = degToRad(180);

  const radDist = distance / R;

  const radLat = degToRad(lat);
  const radLong = degToRad(long);

  let minLat = radLat - radDist;
  let maxLat = radLat + radDist;

  let minLong: number;
  let maxLong: number;

  const deltaLong = Math.asin(Math.sin(radDist) / Math.cos(radLat));
  if (minLat > MIN_LAT && maxLat < MAX_LAT) {
    minLong = radLong - deltaLong;
    maxLong = radLong + deltaLong;
    if (minLong < MIN_LONG) {
      minLong = minLong + 2 * Math.PI;
    }
    if (maxLong > MAX_LONG) {
      maxLong = maxLong - 2 * Math.PI;
    } else {
      minLat = Math.max(minLat, MIN_LAT);
      maxLat = Math.min(maxLat, MAX_LAT);

      minLong = Math.max(minLong, MIN_LONG);
      maxLong = Math.min(maxLong, MAX_LONG);
    }

    return [
      radToDeg(minLat),
      radToDeg(minLong),
      radToDeg(maxLat),
      radToDeg(maxLong),
    ];
  }
};
